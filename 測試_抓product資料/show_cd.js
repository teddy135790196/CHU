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
str_create="SHOW VARIABLES LIKE 'secure_file_priv';"
db.query(str_create, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log(results); // ✅ 會印出 secure_file_priv 的資料夾路徑
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
