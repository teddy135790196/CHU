// backend/src/connection/railwayConnection.js

const mysql = require('mysql2'); // ✅ 用 callback 版本
// require('dotenv').config();      // 在 Railway 環境中，變數由平台直接注入，不再需要此行

// 建立連線池（callback 版本）
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE
});

// 測試連線（用 callback）
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Railway資料庫連線失敗:', err);
    process.exit(1);  // ⛔ 有錯誤就結束程式
  } else {
    console.log('✅已連接到 Railway 的 MySQL 資料庫');
    conn.release();   // ⚠️ 釋放連線
  }
});

// 匯出連線池
module.exports = pool;
