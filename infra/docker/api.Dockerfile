FROM node:20-alpine

WORKDIR /app

# Backend package.json dosyalarını kopyala
COPY server/package*.json ./

RUN npm install --production

# Backend kodlarını kopyala
COPY server ./server

WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "start"]
