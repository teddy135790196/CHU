// connection/railwayDBConfig.js
const mysql = require('mysql2'); // ✅ 用 callback 版本
require('dotenv').config();      // 載入 .env 環境變數

// 建立連線池（callback 版本）
const pool = mysql.createPool({
  host: process.env.RAILWAY_DB_HOST,
  port: process.env.RAILWAY_DB_PORT,
  user: process.env.RAILWAY_DB_USER,
  password: process.env.RAILWAY_DB_PASSWORD,
  database: process.env.RAILWAY_DB_NAME
});

// 測試連線（用 callback）
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Railway資料庫連線失敗:', err);
    process.exit(1);
  } else {
    console.log('已連接到 Railway 的 MySQL 資料庫');
    conn.release();
  }
});

// 匯出連線池
module.exports = pool;
