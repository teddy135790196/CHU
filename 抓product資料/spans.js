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
// LIMIT p_limit OFFSET p_offset; 從p_offset個開始偏移，取p_limit個
const str_create2 = `
create PROCEDURE 
預存_小分類_分頁(IN str VARCHAR(15),IN p_limit INT,IN p_offset INT)
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE minor_category = str
LIMIT p_limit OFFSET p_offset;
select count(*) as totalBook from products WHERE minor_category = str;
END 
`;
// 抓isbn_id
// LIMIT p_limit OFFSET p_offset; 從p_offset個開始偏移，取p_limit個
const str_create25 = `
create PROCEDURE 該isbn的所有資料(IN str VARCHAR(31))
BEGIN
SELECT * FROM products WHERE ISBN_id = str;
END 
`;
//作者 精確地找
const str_create3 = `
CREATE PROCEDURE 預存_作者_精確(IN str VARCHAR(100))
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE author = str;
END 
`;
//搜尋欄限定只能找書名、作者、系列、大分類、小分類、出版類型
const str_create35 = `
CREATE PROCEDURE 搜尋書(IN str VARCHAR(255),IN con VARCHAR(64)
)
BEGIN
 IF con NOT IN ('name', 'author', 'series','ISBN_id') THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = '不支援的欄位';
    END IF;
SET @sql = CONCAT('SELECT ISBN_id,name,description,price,author,imgUrl,series FROM products WHERE ', con, ' LIKE ?');
SET @search = CONCAT('%', str, '%');
    PREPARE stmt FROM @sql;
    EXECUTE stmt USING @search;
    DEALLOCATE PREPARE stmt;
END
`;

// 人氣排名最高的12個
const str_create4 = `
create PROCEDURE 
綜合人氣排名(IN p_limit INT,IN p_offset INT)
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series,hit FROM products 
order by hit
LIMIT p_limit OFFSET p_offset;
select count(*) as totalBook from products;
END 
`;
const str_create5 = `
create PROCEDURE 
綜合人氣排名(IN p_limit INT)
BEGIN
SELECT ISBN_id,name,description,price,award,author,imgUrl,series,hit FROM products 
order by hit
LIMIT p_limit ;
END 
`;
const str_call1 = "CALL 預存_出版類型('書籍')";
const str_call2 = "CALL 預存_小分類('小說')";
const str_spans = "CALL 預存_小分類_分頁('小說',10,1)";
const str_call3 = "CALL 預存_作者_精確('石心寺')";
const str_call4 = "CALL 綜合人氣排名(2)";
const str_call5 = "CALL 該isbn的所有資料('999-000-984157-7')";

const str_drop = "DROP PROCEDURE IF EXISTS 搜尋書;";
// SET

let sql_rand = "UPDATE products SET hit = FLOOR(RAND() * 11);";
//
/*
db.query(str_drop, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功2");
  // console.log(results);
});
*/
db.query(str_create35, (err, results) => {
  if (err) return console.error("SQL 錯誤:", err);
  console.log("新增成功3");
  // console.log(results);
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
