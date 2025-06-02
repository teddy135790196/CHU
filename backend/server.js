// backend/server.js

// npm install cors
const express = require('express');
const cors = require('cors');  // 加入 cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:8080'
}));

// 引入 db.js
const database = require('./db');

// 路由
app.get('/', (req, res) => {
  res.send('Hello from backend with MySQL!');
});

// 取得全部商品資料
app.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
