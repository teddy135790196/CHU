const fs = require("fs");
const csv = require("csv-parser");
const mysql = require("mysql2");

// 建立 Railway MySQL 連線
const db = mysql.createConnection({
  host: "ballast.proxy.rlwy.net",
  port: 37573,
  user: "root",
  password: "HpPRTGCLtmPMYusPpwCILNkiysXwXACE",
  database: "railway",
});

// 使用 headers 明確指定欄位順序，避免無標題列問題
fs.createReadStream("./book_butUTF8.csv", { encoding: "utf8" })
  .pipe(
    csv({
      separator: "^",
      headers: [
        "ISBN",
        "publish",
        "cat",
        "sub",
        "series",
        "bookName",
        "author",
        "bookDescribe",
        "pub_com",
        "lan",
        "page",
        "price",
        "stock",
        "imgUrl",
      ],
    })
  )
  .on("data", (row) => {
    const sql = `INSERT INTO T_book (
      ISBN, publish, cat, sub, series, bookName, author,
      bookDescribe, pub_com, lan, page, price, stock, imgUrl
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      row.ISBN,
      row.publish,
      row.cat,
      row.sub,
      row.series,
      row.bookName,
      row.author,
      row.bookDescribe,
      row.pub_com,
      row.lan,
      Number.isNaN(parseInt(row.page)) ? 0 : parseInt(row.page),
      Number.isNaN(parseInt(row.price)) ? 0 : parseInt(row.price),
      Number.isNaN(parseInt(row.stock)) ? 0 : parseInt(row.stock),
      row.imgUrl,
    ];

    db.query(sql, values, (err) => {
      if (err) console.error("❌ 插入失敗:", err.sqlMessage);
    });
  })
  .on("end", () => {
    console.log("✅ 匯入完成");
    db.end();
  });
