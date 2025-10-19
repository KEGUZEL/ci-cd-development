FROM node:20-alpine

# Çalışma dizini
WORKDIR /app

# Gerekli araçlar (curl vs)
RUN apk add --no-cache curl

# package.json dosyalarını kopyala
COPY services/api/package*.json ./

# Bağımlılıkları yükle (sadece prod)
RUN npm install --production

# Kaynak kodlarını kopyala
COPY services/api/ ./

# Sağlık kontrolü (backend /health endpoint)
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD curl -fs http://localhost:3000/health || exit 1

# Port aç
EXPOSE 3000

# Çalıştırma komutu (server.js artık doğru path'te)
CMD ["node", "server.js"]
