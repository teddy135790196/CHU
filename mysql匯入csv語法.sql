use booksDB;
CREATE TABLE T_書本表(
ISBN varchar(25),
出版類型 varchar(25),
分類 varchar(25),
類型 varchar(25),
系列名稱 varchar(51),
書名 varchar(51),
作者 varchar(51),
簡介 MEDIUMTEXT ,
出版社 varchar(25),
語言 varchar(10),
頁數 int,
售價 int,
庫存 int,
圖片連結 MEDIUMTEXT 
)
select * from T_書本表
-- 請將要匯入的csv放入下行指令會出現的資料夾裡
SHOW VARIABLES LIKE 'secure_file_priv';
-- 注意檔名要英文(mysql只支援英文檔名)且編碼需搭配資料庫utf8
LOAD DATA INFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/book_butUTF8.csv'
INTO TABLE T_書本表
FIELDS TERMINATED BY '^'
ENCLOSED BY '"'
LINES TERMINATED BY '\n';