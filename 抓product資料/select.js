const express = require("express");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// 建立資料庫連線
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const str_create0 = `insert into authors(name) select author  from products group by author`;
db.query(str_create0, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log(results);
});
/*
const str_create1 = `alter table authors drop column author `;
db.query(str_create1, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log(results);
});
*/ 
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
