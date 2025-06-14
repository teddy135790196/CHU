const express = require("express");
const app = express();
const db = require("./db");
const PORT = process.env.PORT || 3000;

// 解析 JSON 請求
app.use(express.json());

// ✅ 處理 CORS 問題（部署時很重要）
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 若有前端網址請改成特定網域
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // 處理預檢請求
  }
  next();
});

// ✅ 根路由測試用
app.get("/", (req, res) => {
  res.send("✅ Node.js API 正常運行中");
});

// ✅ 書籍 API
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
