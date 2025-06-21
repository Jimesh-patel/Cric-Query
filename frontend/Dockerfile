FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Correct ENV block
ENV VITE_BACKEND_URL=http://localhost:8080 \
    VITE_FLASK_API_BASE=http://localhost:5000 \
    VITE_LLM_API_BASE=http://localhost:5001

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
