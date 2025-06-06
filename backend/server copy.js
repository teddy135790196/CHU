// test-db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'bookstore-mysql.mysql.database.azure.com',
  user: 'teddy135790196@bookstore-mysql',
  password: 'Subtron955603',
  database: 'bookstore',
  ssl: false  // 關掉 SSL 測試用
});

connection.connect(err => {
  if (err) {
    console.error('連線失敗:', err.message);
  } else {
    console.log('連線成功！');
    connection.end();
  }
});
