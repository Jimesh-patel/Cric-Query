# train_model.py
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, LSTM, Dense, Concatenate, Dropout, BatchNormalization, Bidirectional
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
from tensorflow.keras.optimizers import Adam
import matplotlib.pyplot as plt
import joblib

# Load dataset
df = pd.read_csv('./ML/data/ipl_2024_deliveries.csv')

# Preprocess base features
df[['wide', 'legbyes', 'byes', 'noballs']] = df[['wide', 'legbyes', 'byes', 'noballs']].fillna(0)
df['true_over'] = df['over'].astype(int) + 1
df['batsman_runs'] = df['runs_of_bat']
df['extra_runs'] = df['legbyes'] + df['byes']
df['wide_runs'] = df['wide']
df['noball_runs'] = df['noballs']
df['total_runs'] = df['batsman_runs'] + df['extra_runs'] + df['wide_runs'] + df['noball_runs']

# Partnership logic
def calculate_partnership_runs(df):
    df = df.sort_values(['match_id', 'innings', 'over']).copy()
    partnership_data = []
    all_batsmen = df.groupby(['match_id', 'innings'])['striker'].unique().to_dict()

    for (match_id, innings), group in df.groupby(['match_id', 'innings']):
        current_pair = [group.iloc[0]['striker'], None]
        batsman_index = 1
        partnership_runs = 0
        current_over = 1
        batsmen_list = all_batsmen.get((match_id, innings), [])

        for _, row in group.iterrows():
            over = row['true_over']
            striker = row['striker']
            runs = row['runs_of_bat'] + row['legbyes'] + row['byes']
            if row['noballs'] > 0 and row['runs_of_bat'] > 0:
                runs += row['runs_of_bat']

            if current_pair[1] is None and batsman_index < len(batsmen_list):
                current_pair[1] = batsmen_list[batsman_index]
                batsman_index += 1

            if over != current_over:
                partnership_data.append({
                    'match_id': match_id,
                    'innings': innings,
                    'true_over': current_over,
                    'partnership_runs': partnership_runs,
                    'batsman1': current_pair[0],
                    'batsman2': current_pair[1]
                })
                current_over = over

            if pd.notna(row['wicket_type']):
                dismissed = row['player_dismissed']
                if dismissed in current_pair:
                    partnership_runs = 0
                    if batsman_index < len(batsmen_list):
                        current_pair[current_pair.index(dismissed)] = batsmen_list[batsman_index]
                        batsman_index += 1

            partnership_runs += runs

            if row['runs_of_bat'] % 2 == 1 or row.name == group[group['true_over'] == over].index[-1]:
                current_pair = current_pair[::-1]

        partnership_data.append({
            'match_id': match_id,
            'innings': innings,
            'true_over': current_over,
            'partnership_runs': partnership_runs,
            'batsman1': current_pair[0],
            'batsman2': current_pair[1]
        })

    partnership_df = pd.DataFrame(partnership_data)
    partnership_df['partnership_runs'] = partnership_df.groupby(['match_id', 'innings'])['partnership_runs'].shift(1).fillna(0).astype(int)
    return partnership_df

partnership_df = calculate_partnership_runs(df)
grouped = df.groupby(['match_id', 'innings', 'true_over'])

summary = grouped.agg({
    'match_no': 'first',
    'date': 'first',
    'venue': 'first',
    'batting_team': 'first',
    'bowling_team': 'first',
    'striker': lambda x: x.iloc[0],
    'bowler': lambda x: x.iloc[0],
    'runs_of_bat': 'sum',
    'wide': 'sum',
    'noballs': 'sum',
    'legbyes': 'sum',
    'byes': 'sum',
    'wicket_type': lambda x: x.notnull().sum(),
    'total_runs': 'sum'
}).reset_index()

def get_second_batsman(over_df):
    unique_batsmen = over_df['striker'].unique()
    return unique_batsmen[1] if len(unique_batsmen) > 1 else unique_batsmen[0]

batsman2 = grouped.apply(get_second_batsman).reset_index(name='batsman2')
summary = pd.merge(summary, batsman2, on=['match_id', 'innings', 'true_over'])

summary.rename(columns={
    'true_over': 'over',
    'striker': 'batsman1',
    'runs_of_bat': 'runs_of_bats',
    'wide': 'runs_of_wides',
    'noballs': 'runs_of_no_balls',
    'wicket_type': 'wickets'
}, inplace=True)

summary['extra_runs'] = summary['legbyes'] + summary['byes']
summary = pd.merge(summary, partnership_df[['match_id', 'innings', 'true_over', 'partnership_runs']],
                   left_on=['match_id', 'innings', 'over'], right_on=['match_id', 'innings', 'true_over'], how='left')
summary['partnership_runs'] = summary['partnership_runs'].fillna(0).astype(int)
summary = summary.drop(columns=['true_over'])
summary = summary.sort_values(['match_id', 'innings', 'over']).reset_index(drop=True)
summary['cum_total_runs'] = summary.groupby(['match_id', 'innings'])['total_runs'].cumsum() - summary['total_runs']
summary['cum_total_wickets'] = summary.groupby(['match_id', 'innings'])['wickets'].cumsum() - summary['wickets']
summary['current_over'] = summary['over']
summary['cum_run_rate'] = summary['cum_total_runs'] / (summary['over'] - 1)
summary['cum_run_rate'] = summary['cum_run_rate'].fillna(0)

# phase mapping
def assign_phase(over):
    if 1 <= over <= 6:
        return 'Powerplay'
    elif 7 <= over <= 15:
        return 'Middle'
    else:
        return 'Death'

summary['phase'] = summary['over'].apply(assign_phase)

# fours and sixes
fours_sixes = df.groupby(['match_id', 'innings', 'true_over']).agg({
    'runs_of_bat': lambda x: ((x == 4).sum(), (x == 6).sum())
}).reset_index()
fours_sixes['num_of_fours'] = fours_sixes['runs_of_bat'].apply(lambda x: x[0])
fours_sixes['num_of_sixes'] = fours_sixes['runs_of_bat'].apply(lambda x: x[1])
fours_sixes = fours_sixes[['match_id', 'innings', 'true_over', 'num_of_fours', 'num_of_sixes']]

summary = pd.merge(summary, fours_sixes, left_on=['match_id', 'innings', 'over'],
                  right_on=['match_id', 'innings', 'true_over'], how='left')
summary['num_of_fours'] = summary['num_of_fours'].fillna(0).astype(int)
summary['num_of_sixes'] = summary['num_of_sixes'].fillna(0).astype(int)
summary = summary.drop(columns=['true_over'])

def calculate_bowler_economy(df, bowler_name):
    df_bowler = df[df['bowler'] == bowler_name].copy()
    df_bowler['total_runs'] = df_bowler['runs_of_bat'] + df_bowler['extras']
    df_bowler['is_legal_delivery'] = (df_bowler['wide'] == 0) & (df_bowler['noballs'] == 0)
    legal_deliveries = df_bowler['is_legal_delivery'].sum()
    overs_decimal = (legal_deliveries // 6) + (legal_deliveries % 6) / 10
    return df_bowler['total_runs'].sum() / overs_decimal if overs_decimal > 0 else 0

summary['bowler_economy'] = summary['bowler'].apply(lambda x: calculate_bowler_economy(df, x))

# Build features
final_cols = ['match_id', 'match_no', 'date', 'venue', 'batting_team', 'bowling_team', 'innings', 'over',
    'batsman1', 'batsman2', 'bowler', 'runs_of_bats', 'runs_of_wides', 'runs_of_no_balls', 'extra_runs',
    'wickets', 'cum_total_runs', 'cum_total_wickets', 'cum_run_rate', 'bowler_economy', 'total_runs',
    'phase', 'num_of_fours', 'num_of_sixes', 'partnership_runs']

final_df = summary[final_cols].copy()

# Sequence and meta features
def create_features(df):
    X_seq, X_meta, y = [], [], []
    sequence_length = 5
    for _, group in df.groupby(['match_id', 'innings']):
        group = group.sort_values('over').reset_index(drop=True)
        for idx in range(len(group)):
            if idx < 2:
                continue
            start_idx = max(0, idx - sequence_length)
            seq_data = group.iloc[start_idx:idx][['total_runs', 'wickets']].to_numpy()
            padded = np.zeros((sequence_length, 2))
            padded[-seq_data.shape[0]:] = seq_data
            X_seq.append(padded)
            curr = group.iloc[idx]
            prev = group.iloc[idx - 1]
            meta = [curr['venue'], curr['batting_team'], curr['bowling_team'], curr['batsman1'],
                    curr['batsman2'], curr['bowler'], prev['cum_total_runs'], prev['cum_total_wickets'],
                    curr['bowler_economy'], curr['over'], prev['cum_run_rate'], prev['partnership_runs'],
                    prev['num_of_fours'], prev['num_of_sixes']]
            X_meta.append(meta)
            y.append(curr['total_runs'])
    return np.array(X_seq), X_meta, np.array(y)

X_seq, X_meta_raw, y = create_features(final_df)
X_meta = pd.DataFrame(X_meta_raw, columns=[
    'venue', 'batting_team', 'bowling_team', 'batsman1', 'batsman2', 'bowler', 'cum_runs',
    'cum_wickets', 'bowler_economy', 'over_number', 'cum_run_rate', 'partnership', 'num_of_fours', 'num_of_sixes'])

# Encode and scale
seq_scaler = StandardScaler()
X_seq_scaled = seq_scaler.fit_transform(X_seq.reshape(-1, 2)).reshape(X_seq.shape)

meta_transformer = ColumnTransformer([
    ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False),
     ['venue', 'batting_team', 'bowling_team', 'batsman1', 'batsman2', 'bowler']),
    ('num', StandardScaler(),
     ['cum_runs', 'cum_wickets', 'bowler_economy', 'over_number', 'cum_run_rate', 'partnership'])
])
X_meta_encoded = meta_transformer.fit_transform(X_meta)

X_seq_train, X_seq_test, X_meta_train, X_meta_test, y_train, y_test = train_test_split(
    X_seq_scaled, X_meta_encoded, y, test_size=0.2, random_state=42)

# Model
seq_input = Input(shape=X_seq_train.shape[1:], name='seq_input')
x = Bidirectional(LSTM(128, return_sequences=True, dropout=0.2))(seq_input)
x = Bidirectional(LSTM(64, return_sequences=False, dropout=0.2))(x)
x = Dense(64, activation='relu')(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)

meta_input = Input(shape=(X_meta_train.shape[1],), name='meta_input')
m = Dense(128, activation='relu')(meta_input)
m = BatchNormalization()(m)
m = Dropout(0.3)(m)
m = Dense(64, activation='relu')(m)
m = BatchNormalization()(m)
m = Dropout(0.3)(m)

combined = Concatenate()([x, m])
c = Dense(128, activation='relu')(combined)
c = BatchNormalization()(c)
c = Dropout(0.3)(c)
c = Dense(64, activation='relu')(c)
c = BatchNormalization()(c)
c = Dropout(0.2)(c)

output = Dense(1, activation='linear', name='runs_output')(c)
model = Model(inputs=[seq_input, meta_input], outputs=output)

model.compile(optimizer=Adam(learning_rate=0.001), loss='mse', metrics=['mae'])

callbacks = [
    EarlyStopping(monitor='val_loss', patience=15, restore_best_weights=True, verbose=1),
    ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=5, min_lr=1e-6, verbose=1)
]

history = model.fit([X_seq_train, X_meta_train], y_train, epochs=100, batch_size=64,
                    validation_split=0.2, callbacks=callbacks, verbose=1)

# Save model and transformers
model.save('./ML/model/lstm_model.keras')
joblib.dump(seq_scaler, './ML/model/seq_scaler.joblib')
joblib.dump(meta_transformer, './ML/model/meta_transformer.joblib')

print("\n✅ Model and preprocessors saved in ./ML/model/")
