// backend/src/connection/azureConnection.js

const mysql = require('mysql2');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// 建立連線
const pool = mysql.createPool({
  host: process.env.AZURE_DB_HOST,
  user: process.env.AZURE_DB_USER,
  password: process.env.AZURE_DB_PASSWORD,
  database: process.env.AZURE_DB_DATABASE,
  port: process.env.AZURE_DB_PORT || 3306,
  timezone: '+08:00', // 設定為台灣時區 (GMT+8)
  ssl: {
    // ca: fs.readFileSync(path.resolve(__dirname, '../../BaltimoreCyberTrustRoot.crt.pem')),
  //   minVersion: 'TLSv1.2',
    // rejectUnauthorized: false, // ⚠️ 改成 false 接受自簽名憑證
  }
});

// ✅ 用 getConnection() 測試連線
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Azure資料庫連線失敗:', err);
    process.exit(1);  // ⛔ 有錯誤就結束程式
  } else {
    console.log('✅已連接到 Azure 的 MySQL 資料庫');
    conn.release();   // ⚠️ 釋放連線
  }
});

module.exports = pool;

