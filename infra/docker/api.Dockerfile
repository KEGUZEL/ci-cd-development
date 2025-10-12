FROM node:20-alpine

WORKDIR /app

# Backend package.json dosyalarını kopyala
COPY package*.json ./

RUN npm install --production

# Backend kodlarını kopyala
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
