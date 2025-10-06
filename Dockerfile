# === STAGE 1: Frontend Build ===
FROM node:20-alpine AS build
WORKDIR /app

# Frontend bağımlılıklarını yükle ve build et
COPY client ./client
WORKDIR /app/client
RUN npm ci && npm run build

# === STAGE 2: Backend + Serve ===
FROM node:20-alpine
WORKDIR /app

# Backend dosyalarını kopyala
COPY server ./server
WORKDIR /app/server
COPY --from=build /app/client/dist ../client/dist

# Production bağımlılıklarını yükle
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "server.js"]
