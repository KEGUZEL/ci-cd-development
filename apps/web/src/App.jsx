import { Button, Container, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [health, setHealth] = useState("Durum kontrol ediliyor...");

  const checkHealth = async () => {
    try {
      // .env dosyasındaki API adresini alıyoruz
      const API_URL = import.meta.env.VITE_API_URL;

      // API’ye isteği gönder
      const res = await fetch(`${API_URL}/api/health`);
      const data = await res.json();

      setHealth(data.ok ? "✅ Sunucu aktif" : "❌ Cevap yok");
    } catch (err) {
      console.error("API bağlantı hatası:", err);
      setHealth("❌ Hata: Sunucuya ulaşılamıyor");
    }
  };

  return (
    <Container sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        MyWeb Dashboard 🚀
      </Typography>

      <Typography variant="body1" gutterBottom>
        {health}
      </Typography>

      <Button variant="contained" color="primary" onClick={checkHealth}>
        Sağlık Kontrolü
      </Button>
    </Container>
  );
}

export default App;
