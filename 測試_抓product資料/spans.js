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
// UPDATE table_name SET column1 = value1, column2 = value2, ...WHERE condition;
const str_create1 = `
CREATE PROCEDURE 預存_出版類型(
    IN str VARCHAR(100)
)
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE pub_type = str;
END 
`;
// 小分類 小說、詩詞
const str_create2 = `
create PROCEDURE 預存_小分類(IN str VARCHAR(100))
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE minor_category = str;
select count(*) from products WHERE minor_category = str;
END 
`;
//作者 精確地找
const str_create3 = `
CREATE PROCEDURE 預存_作者_精確(IN str VARCHAR(100))
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE author = str;
END 
`;
// ;
const str_call1="CALL 預存_出版類型('書籍')"
const str_call2="CALL 預存_小分類('小說')"
const str_call3="CALL 預存_作者_精確('石心寺')"

const str_drop="DROP PROCEDURE IF EXISTS 預存_小分類;"
// SET 
    

db.query(str_call2, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
//   console.log("新增成功2"); 
  console.log(results); 

});
/*
db.query(str_call2, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
//   console.log("新增成功3"); 
  console.log(results); 

});
*/ 
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
