const express = require("express");
const cors = require("cors"); // ✅ 引入 cors 模組
const app = express();
const db = require("./db");
const PORT = process.env.PORT || 3000;

// ✅ 使用 CORS 中介層（正式做法）
app.use(cors({
  origin: "*", // 部署時建議替換為：'https://chu-frontend-production.up.railway.app'
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ 處理 JSON 請求
app.use(express.json());

// ✅ 根路由測試
app.get("/", (req, res) => {
  res.send("✅ Node.js API 正常運行中");
});

// ✅ 書籍 API 測試
app.get("/books", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.error("❌ 查詢錯誤：", err);
      return res.status(500).send("資料庫錯誤");
    }
    res.json(results);
  });
});

// ✅ 啟動伺服器
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

