const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));
app.use(express.json());

// Route utama
app.get("/", (req, res) => {
  res.json({
    message: "Backend API berhasil berjalan!",
  });
});

// API Routes
app.use("/api/skills", require("./routers/skillRoute"));
app.use("/api/certificates", require("./routers/certificateRoute"));
app.use("/api/testimonials", require("./routers/testimonialRoute"));
app.use("/api/messages", require("./routers/messageRoute"));
app.use("/api/projects", require("./routers/projectRoute"));
app.use("/api/dashboard", require("./routers/dashboardRoute"));

// Route tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan",
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});