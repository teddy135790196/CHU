const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// 建立資料庫連線
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 取得全部商品資料
// app.get('/t_book', (req, res) => {
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
  // db.query('SELECT * FROM T_book', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
