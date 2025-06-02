use booksDB;
select * from T_書本表
CREATE TABLE 表2(
分類 varchar(25),
ISBN varchar(25),
類型 varchar(25),
price int)

select * from T_書本表

SHOW VARIABLES LIKE 'secure_file_priv';

INSERT INTO products ( ISBN_id,name,description,author,price,stock,
publisher,original_language,major_category,minor_category,imgUrl,series,pub_type)
SELECT ISBN,書名,簡介,作者,售價,庫存,出版社,語言,分類,類型,圖片連結,系列名稱,出版類型
FROM T_書本表;