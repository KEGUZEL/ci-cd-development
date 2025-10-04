const express = require("express");
const mongoose = require("mongoose");
const app = express();
//const seed = require("./seed");
const PORT = 3000;

// JSON body okumak için middleware
app.use(express.json());

// MongoDB bağlantısı (Docker servis adı: mymongo)
mongoose.connect("mongodb://mymongo:27017/testdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Bağlantı başarılı olduğunda tetiklenir
mongoose.connection.on("connected", async () => {
  console.log("✅ MongoDB bağlantısı kuruldu, seed başlatılıyor...");
  await seed(); // sadece bağlantı kurulduğunda çalışır
});

// Bağlantı hatası durumunda logla
mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB bağlantı hatası:", err);
});

const UserSchema = new mongoose.Schema({
  name: String,
  role: String,
});

const User = mongoose.model("User", UserSchema);

// Basit endpoint
app.get("/", (req, res) => {
  res.send("Backend API çalışıyor 🚀");
});

// Kullanıcıları listele
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Yeni kullanıcı ekle
app.post("/users", async (req, res) => {
  try {
    const { name, role } = req.body;
    const newUser = new User({ name, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed verisi (otomatik ekleme)
async function seed() {
  console.log("Seed fonksiyonu çalıştırılıyor...");
  try {
    await User.deleteMany({}); // mevcutları temizle
    await User.insertMany([
      { name: "Efe", role: "DevOps" },
      { name: "Nursena", role: "Frontend Developer" },     
      { name: "Ali", role: "Backend Developer" },
      { name: "Mehmet", role: "Data Scientist" }
    ]);
    console.log("Seed verileri MongoDB'ye yeniden eklendi ✅");
  } catch (err) {
    console.error("Seed hatası:", err);
  }
}

app.listen(PORT, () => {
  console.log(`Backend http://localhost:${PORT} üzerinde çalışıyor`);
});

