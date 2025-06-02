// backend/db.js
// 安裝 mysql2 與 dotenv 套件
// npm install mysql2
// npm install dotenv
const mysql = require('mysql2');
require('dotenv').config();  // 載入 .env 環境變數

// 建立連線
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  // 可選，如果 .env 有設定 PORT
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// 連線驗證
connection.connect(err => {
  if (err) {
    console.error('資料庫連線失敗:', err);
    return;
  }
  console.log('已連接到 MySQL 資料庫');
});

// 匯出連線物件
module.exports = connection;
