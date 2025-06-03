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
  INSERT INTO products 
(ISBN_id,page,name,description,author,price,stock,publisher,original_language,major_category,minor_category,imgUrl,series,pub_type)
SELECT ISBN,page,bookName,bookDescribe,author,price,stock,pub_com,lan,cat,sub,imgUrl,series,publish
FROM T_book;
`;

const str_drop="delete from products where page is null"

// SET 
    

db.query(str_create1, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("更新成功"); 
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
