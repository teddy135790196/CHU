// src/connection/alwaysdataConfig.js
const mysql = require('mysql2'); // ✅ 用 callback 版本
require('dotenv').config();      // 載入 .env 環境變數

// 建立連線池（callback 版本）
const pool = mysql.createPool({
  host: process.env.ALWAYSDATA_DB_HOST,
  user: process.env.ALWAYSDATA_DB_USER,
  password: process.env.ALWAYSDATA_DB_PASSWORD,
  database: process.env.ALWAYSDATA_DB_DATABASE
});

// 測試連線（用 callback）
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Alwaysdata資料庫連線失敗:', err);
    process.exit(1);
  } else {
    console.log('已連接到 Alwaysdata 的 MySQL 資料庫');
    conn.release();
  }
});

// 匯出連線池
module.exports = pool;