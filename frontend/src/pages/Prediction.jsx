import React, { useState } from 'react';

const API_BASE = import.meta.env.VITE_FLASK_API_BASE || "http://localhost:5000";

const players = ['Abdul Samad', 'Abhinav Manohar', 'Abhishek Sharma', 'Abishek Porel', 'Akash Deep', 'Akash Madhwal', 'Alzarri Joseph', 'Angkrish Raghuvanshi', 'Anmolpreet Singh', 'Anshul Kamboj', 'Anuj Rawat', 'Anukul Roy', 'Arjun Tendulkar', 'Arshad Khan', 'Arshdeep Singh', 'Arshin Kulkarni', 'Ashutosh Sharma', 'Ashwin', 'Atharva Taide', 'Avesh Khan', 'Axar', 'Ayush Badoni', 'Azmatullah', 'Bairstow', 'Bhui', 'Bhuvneshwar', 'Boult', 'Brevis', 'Bumrah', 'Buttler', 'Chahal', 'Chahar', 'Chakaravarthy', 'Chameera', 'Chawla', 'Cummins', 'Darshan Nalkande', 'Dhawan', 'Dhoni', 'Dhruv Jurel', 'Ferguson', 'Ferreira', 'Fraser-McGurk', 'Gaikwad', 'Gerald Coetzee', 'Gowtham', 'Green', 'Gulbadin', 'Gurbaz', 'Hardik Pandya', 'Harpreet Brar', 'Harpreet Singh', 'Harshal Patel', 'Harshit Rana', 'Head', 'Hetmyer', 'Himanshu Sharma', 'Hooda', 'Ishan Kishan', 'Ishant', 'J Richardson', 'Jadeja', 'Jaiswal', 'Jitesh Sharma', 'Joshua Little', 'Karn Sharma', 'Karthik', 'Kartik Tyagi', 'Kaverappa', 'Khaleel Ahmed', 'Klaasen', 'Kohler-Cadmore', 'Kohli', 'Krunal Pandya', 'Kuldeep Sen', 'Kuldeep Yadav', 'Kushagra', 'Kwena Maphaka', 'Lalit Yadav', 'Livingstone', 'Lomror', 'M Siddharth', 'Maharaj', 'Manav Suthar', 'Manish Pandey', 'Marco Jansen', 'Markande', 'Markram', 'Matt Henry', 'Maxwell', 'Mayank', 'Mayank Dagar', 'Mayank Yadav', 'Miller', 'Mishra', 'Mitchell', 'Mitchell Marsh', 'Moeen Ali', 'Mohit Sharma', 'Mohsin Khan', 'Mukesh Choudhary', 'Mukesh Kumar', 'Mustafizur', 'N Thushara', 'Nabi', 'Naman Dhir', 'Nandre Burger', 'Narine', 'Nathan Ellis', 'Naveen-ul-Haq', 'Nehal Wadhera', 'Nitish Rana', 'Nitish Reddy', 'Noor Ahmad', 'Nortje', 'Padikkal', 'Pant', 'Pathirana', 'Philip Salt', 'Pooran', 'Powell', 'Prabhsimran', 'Prabhudessai', 'Prithvi Shaw', 'Rabada', 'Rahane', 'Rahul', 'Rahul Chahar', 'Rahul Tewatia', 'Rajat Patidar', 'Ramandeep Singh', 'Rashid Khan', 'Rasikh Salam', 'Ravi Bishnoi', 'Ravindra', 'Raza', 'Richard Gleeson', 'Rinku Singh', 'Rishi Dhawan', 'Riyan Parag', 'Rohit', 'Rossouw', 'Russell', 'Saha', 'Sai Kishore', 'Sai Sudharsan', 'Sam Curran', 'Sameer Rizvi', 'Samson', 'Sandeep Sharma', 'Santner', 'Sanvir Singh', 'Saurav Chauhan', 'Shahbaz Ahmed', 'Shahrukh Khan', 'Shai Hope', 'Shamar Joseph', 'Shams Mulani', 'Shankar', 'Sharath BR', 'Shashank Singh', 'Shepherd', 'Shivam Dube', 'Shivam Singh', 'Shreyas Gopal', 'Shreyas Iyer', 'Shubham Dubey', 'Shubman Gill', 'Simarjeet Singh', 'Siraj', 'Spencer Johnson', 'Starc', 'Stoinis', 'Sumit Kumar', 'Suryakumar Yadav', 'Suyash Sharma', 'Swapnil Singh', 'T Natarajan', 'Tanush Kotian', 'Thakur', 'Theekshana', 'Tilak Varma', 'Tim David', 'Topley', 'Tripathi', 'Tristan Stubbs', 'Turner', 'Tushar Deshpande', 'Umesh Yadav', 'Umran Malik', 'Unadkat', 'V Viyaskanth', 'Vaibhav Arora', 'Venkatesh Iyer', 'Vijaykumar Vyshak', 'Wade', 'Warner', 'Warrier', 'Washington Sundar', 'Will Jacks', 'Williams', 'Williamson', 'Wood', 'Yash Dayal', 'Yash Thakur', 'Yudhvir Singh', 'de Kock', 'du Plessis'];

const venues = [
  'MA Chidambaram Stadium, Chennai',
  'Maharaja Yadavindra Singh International Cricket Stadium, Mullanpur, Chandigarh',
  'Eden Gardens, Kolkata',
  'Sawai Mansingh Stadium, Jaipur',
  'Narendra Modi Stadium, Ahmedabad',
  'M.Chinnaswamy Stadium, Bengaluru',
  'Rajiv Gandhi International Stadium, Hyderabad',
  'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow',
  'Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium, Visakhapatnam',
  'Wankhede Stadium, Mumbai',
  'Arun Jaitley Stadium, Delhi',
  'Himachal Pradesh Cricket Association Stadium, Dharamsala',
  'Barsapara Cricket Stadium, Guwahati'
];

const teams = [
  'KKR', 'RCB', 'MI', 'CSK', 'SRH', 'DC', 'RR', 'PBKS', 'LSG', 'GT'
];

const Prediction = () => {
  const [savedOvers, setSavedOvers] = useState([]);
  const [currentOver, setCurrentOver] = useState({ total_runs: '', wickets: '' });
  const [metadata, setMetadata] = useState({
    venue: '',
    batting_team: '',
    bowling_team: '',
    batsman1: '',
    batsman2: '',
    bowler: '',
    cum_runs: '',
    cum_wickets: '',
    bowler_economy: '',
    over_number: '',
    cum_run_rate: '',
    partnership: '',
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Search states
  const [searchStates, setSearchStates] = useState({
    venue: { showSuggestions: false, filteredItems: [] },
    batsman1: { showSuggestions: false, filteredItems: [] },
    batsman2: { showSuggestions: false, filteredItems: [] },
    bowler: { showSuggestions: false, filteredItems: [] }
  });

  const handleCurrentOverChange = (field, value) => {
    setCurrentOver({ ...currentOver, [field]: value });
  };

  const handleMetadataChange = (e) => {
    setMetadata({ ...metadata, [e.target.name]: e.target.value });
  };

  // Search functionality
  const handleSearchChange = (field, value) => {
    setMetadata({ ...metadata, [field]: value });

    if (value.length > 0) {
      let items = [];
      if (field === 'venue') {
        items = venues.filter(venue =>
          venue.toLowerCase().includes(value.toLowerCase())
        );
      } else if (['batsman1', 'batsman2', 'bowler'].includes(field)) {
        items = players.filter(player =>
          player.toLowerCase().includes(value.toLowerCase())
        );
      }

      setSearchStates(prev => ({
        ...prev,
        [field]: { showSuggestions: true, filteredItems: items.slice(0, 5) }
      }));
    } else {
      setSearchStates(prev => ({
        ...prev,
        [field]: { showSuggestions: false, filteredItems: [] }
      }));
    }
  };

  const handleSuggestionClick = (field, value) => {
    setMetadata({ ...metadata, [field]: value });
    setSearchStates(prev => ({
      ...prev,
      [field]: { showSuggestions: false, filteredItems: [] }
    }));
  };

  const hideSuggestions = (field) => {
    setTimeout(() => {
      setSearchStates(prev => ({
        ...prev,
        [field]: { ...prev[field], showSuggestions: false }
      }));
    }, 200);
  };

  const handleSubmit = async () => {

    if (!currentOver.total_runs || !currentOver.wickets) {
      setError('Please fill in runs and wickets for current over');
      return;
    }

    metadata.cum_runs = currentOver.total_runs;
    metadata.cum_wickets = currentOver.wickets;

    const requiredFields = ['venue', 'batting_team', 'bowling_team', 'batsman1', 'batsman2', 'bowler', 'cum_runs', 'cum_wickets', 'bowler_economy', 'over_number', 'cum_run_rate', 'partnership'];
    for (let field of requiredFields) {
      if (!metadata[field]) {
        setError(`Please fill in ${field.replace('_', ' ')}`);
        return;
      }
    }
    setLoading(true);
    setError('');
    setPrediction(null);

    const newSavedOvers = [...savedOvers, currentOver];
    if (newSavedOvers.length > 5) {
      newSavedOvers.shift();
    }
    setSavedOvers(newSavedOvers);

    const lastOvers = [];
    for (let i = 0; i < 5; i++) {
      if (newSavedOvers[i]) {
        lastOvers.push(newSavedOvers[i]);
      } else {
        lastOvers.push({ total_runs: 0, wickets: 0 });
      }
    }

    try {
      const body = {
        last_overs: lastOvers.map(over => ({
          total_runs: Number(over.total_runs) || 0,
          wickets: Number(over.wickets) || 0,
        })),
        metadata: {
          ...metadata,
          cum_runs: Number(metadata.cum_runs),
          cum_wickets: Number(metadata.cum_wickets),
          bowler_economy: Number(metadata.bowler_economy),
          over_number: Number(metadata.over_number),
          cum_run_rate: Number(metadata.cum_run_rate),
          partnership: Number(metadata.partnership),
        }
      };

      const res = await fetch(`${API_BASE}/predict-runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('Prediction failed');
      const data = await res.json();
      const runs = data.predicted_runs;
      setPrediction(runs);
      setCurrentOver({ total_runs: '', wickets: '' });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              IPL Next Over Run Prediction
            </h2>
          </div>

          {/* Display Saved Overs */}
          {savedOvers.length > 0 && (
            <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-6">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-semibold text-white">Saved Overs ({savedOvers.length}/5)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {savedOvers.map((over, idx) => (
                    <div key={idx} className="group p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-orange-400/50 transition-all duration-300 hover:transform hover:scale-105">
                      <div className="text-sm text-gray-400 mb-2">Over {idx + 1}</div>
                      <div className="text-lg font-bold text-white mb-1">{over.total_runs} runs</div>
                      <div className="text-lg font-bold text-white">{over.wickets} wickets</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Current Over Section */}
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-6">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-semibold text-white">Current Over</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Runs</label>
                  <input
                    type="number"
                    min="0"
                    max="36"
                    placeholder="0"
                    value={currentOver.total_runs}
                    onChange={e => handleCurrentOverChange('total_runs', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Wickets</label>
                  <input
                    type="number"
                    min="0"
                    max="6"
                    placeholder="0"
                    value={currentOver.wickets}
                    onChange={e => handleCurrentOverChange('wickets', e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Match Details Section */}
          <div className="backdrop-blur-sm bg-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl mb-6">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                
                <h3 className="text-xl font-semibold text-white">Match Details</h3>
              </div>

              <div className="space-y-6">
                {/* Venue Search */}
                <div className="relative">
                  
                  <input
                    name="venue"
                    placeholder="Search Venue..."
                    value={metadata.venue}
                    onChange={e => handleSearchChange('venue', e.target.value)}
                    onBlur={() => hideSuggestions('venue')}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  />
                  {searchStates.venue.showSuggestions && searchStates.venue.filteredItems.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg mt-1 max-h-48 overflow-y-auto z-1000 shadow-2xl">
                      {searchStates.venue.filteredItems.map((venue, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-3 cursor-pointer border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 text-white"
                          onMouseDown={() => handleSuggestionClick('venue', venue)}
                        >
                          {venue}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Teams */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Batting Team</label>
                    <select
                      name="batting_team"
                      value={metadata.batting_team}
                      onChange={handleMetadataChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Batting Team</option>
                      {teams.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Bowling Team</label>
                    <select
                      name="bowling_team"
                      value={metadata.bowling_team}
                      onChange={handleMetadataChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select Bowling Team</option>
                      {teams.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Players */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Batsman 1 Search */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      
                      Batsman 1
                    </label>
                    <input
                      name="batsman1"
                      placeholder="Search Batsman 1..."
                      value={metadata.batsman1}
                      onChange={e => handleSearchChange('batsman1', e.target.value)}
                      onBlur={() => hideSuggestions('batsman1')}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                    {searchStates.batsman1.showSuggestions && searchStates.batsman1.filteredItems.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg mt-1 max-h-36 overflow-y-auto z-1000 shadow-2xl">
                        {searchStates.batsman1.filteredItems.map((player, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 cursor-pointer border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 text-white text-sm"
                            onMouseDown={() => handleSuggestionClick('batsman1', player)}
                          >
                            {player}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Batsman 2 Search */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                    
                      Batsman 2
                    </label>
                    <input
                      name="batsman2"
                      placeholder="Search Batsman 2..."
                      value={metadata.batsman2}
                      onChange={e => handleSearchChange('batsman2', e.target.value)}
                      onBlur={() => hideSuggestions('batsman2')}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                    {searchStates.batsman2.showSuggestions && searchStates.batsman2.filteredItems.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg mt-1 max-h-36 overflow-y-auto z-1000 shadow-2xl">
                        {searchStates.batsman2.filteredItems.map((player, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 cursor-pointer border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 text-white text-sm"
                            onMouseDown={() => handleSuggestionClick('batsman2', player)}
                          >
                            {player}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bowler Search */}
                  <div className="relative">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Bowler
                    </label>
                    <input
                      name="bowler"
                      placeholder="Search Bowler..."
                      value={metadata.bowler}
                      onChange={e => handleSearchChange('bowler', e.target.value)}
                      onBlur={() => hideSuggestions('bowler')}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                    {searchStates.bowler.showSuggestions && searchStates.bowler.filteredItems.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-sm border border-gray-600 rounded-lg mt-1 max-h-36 overflow-y-auto z-1000 shadow-2xl">
                        {searchStates.bowler.filteredItems.map((player, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-2 cursor-pointer border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50 transition-colors duration-200 text-white text-sm"
                            onMouseDown={() => handleSuggestionClick('bowler', player)}
                          >
                            {player}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Bowler Economy</label>
                    <input
                      name="bowler_economy"
                      type="number"
                      step="0.01"
                      placeholder="Economy Rate"
                      value={metadata.bowler_economy}
                      onChange={handleMetadataChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Over Number</label>
                    <input
                      name="over_number"
                      type="number"
                      placeholder="Over Number"
                      value={metadata.over_number}
                      onChange={handleMetadataChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Run Rate</label>
                    <input
                      name="cum_run_rate"
                      type="number"
                      step="0.01"
                      placeholder="Current Run Rate"
                      value={metadata.cum_run_rate}
                      onChange={handleMetadataChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Partnership */}
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Partnership Runs</label>
                  <input
                    name="partnership"
                    type="number"
                    placeholder="Partnership Runs"
                    value={metadata.partnership}
                    onChange={handleMetadataChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="group w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Predicting...</span>
              </>
            ) : (
              <>
               <span>Submit Over & Predict</span>
              </>
            )}
          </button>

          {/* Error State */}
          {error && (
            <div className="backdrop-blur-sm bg-red-900/50 border border-red-700 rounded-2xl p-6 shadow-2xl mt-6">
              <div className="flex items-center gap-3">
                
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-1">Error</h3>
                  <p className="text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success State - Prediction Result */}
          {prediction !== null && (
            <div className="backdrop-blur-sm bg-green-900/50 border border-green-700 rounded-2xl p-6 shadow-2xl mt-6">
              <div className="flex items-center gap-3">
                
                <div>
                  <h3 className="text-xl font-semibold text-green-400 mb-1">Prediction Result</h3>
                  <p className="text-2xl font-bold text-green-300">
                    Predicted Runs for Next Over: {prediction}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;