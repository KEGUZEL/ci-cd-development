FROM node:20-alpine

WORKDIR /app

COPY apps/web/package*.json ./
RUN npm install

# .env ve kaynak dosyaları kopyala
COPY apps/web/.env .env
COPY apps/web .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
