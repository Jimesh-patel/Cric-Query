FROM python:3.11-slim

ENV GOOGLE_API_KEY=AIzaSyCdZQFAXZjgq2JVDZnqX3I4MNOWyH-sUQ4 \
    DB_USER=postgres \
    DB_PASS=root123 \
    DB_HOST=localhost \
    DB_PORT=5432 \
    DB_NAME=IPL_DATA

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 5001

CMD ["python", "./src/app.py"]
