const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.RAILWAY_DB_HOST,
  port: process.env.RAILWAY_DB_PORT || 3306,
  user: process.env.RAILWAY_DB_USER,
  password: process.env.RAILWAY_DB_PASSWORD,
  database: process.env.RAILWAY_DB_DATABASE
});

// ✅ 僅在開發環境測試連線（避免部署中斷）
if (process.env.NODE_ENV !== 'production') {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error('❌ Railway 資料庫連線失敗:', err);
    } else {
      console.log('✅ 成功連接到 Railway 的 MySQL 資料庫（開發環境）');
      conn.release();
    }
  });
}

module.exports = pool;

