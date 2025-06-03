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
// str_create="CREATE table test_1(id varchar(10),num int)"
str_create="CREATE table test_2(id text,num int)"

// str_create="CREATE TABLE T_book(ISBN varchar(25),publish varchar(25),cat varchar(25),sub varchar(25),series varchar(51),bookName varchar(51),author varchar(51),bookDescribe MEDIUMTEXT ,pub_com varchar(25),lan varchar(10),page int,price int,stock int,imgUrl MEDIUMTEXT)"
// 
db.query(str_create, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("該表建立或已經存在"); 
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
