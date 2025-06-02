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
// str_create="ALTER TABLE products DROP COLUMN author;"// 刪掉該欄位
// str1="ALTER TABLE products CHANGE author_name author VARCHAR(100)"; //改欄位名字
str1="ALTER TABLE products CHANGE imgUrl imgUrl MEDIUMTEXT"; //改欄位型態

db.query(str1, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("成功"); 
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
