const mysql = require("mysql2");

// ✅ 環境變數驗證
const {
  MYSQLHOST,
  MYSQLUSER,
  MYSQLPASSWORD,
  MYSQLDATABASE,
  MYSQLPORT,
} = process.env;

if (!MYSQLHOST || !MYSQLUSER || !MYSQLPASSWORD || !MYSQLDATABASE) {
  console.error("❌ 缺少必要的資料庫環境變數");
  process.exit(1); // 強制退出應用，避免繼續執行錯誤程式
}

// ✅ 建立資料庫連線
const db = mysql.createConnection({
  host: MYSQLHOST,
  user: MYSQLUSER,
  password: MYSQLPASSWORD,
  database: MYSQLDATABASE,
  port: MYSQLPORT || 3306, // 預設 3306，避免環境沒設 PORT 時錯誤
  ssl: {
    // Azure Database for MySQL 預設需要加密連線
    rejectUnauthorized: true,
  },
});

// ✅ 啟動連線
db.connect((err) => {
  if (err) {
    console.error("❌ 資料庫連線失敗：", err.message);
    process.exit(1);
  } else {
    console.log("✅ 資料庫連線成功");
  }
});

module.exports = db;
