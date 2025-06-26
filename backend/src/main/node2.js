// 路徑前面全部都要加api(後端通用)和products(_index.js設定)


const express = require("express");
// const mysql = require("mysql2");
// require("dotenv").config();

// const app = express();
const app = express.Router();


// 允許cors，放最上面才會允許成功
// const cors = require("cors");
// app.use(cors());

// const port = process.env.PORT || 3000;

// 建立資料庫連線
// const db = mysql.createPool({
//   host: process.env.RAILWAY_DB_HOST,
//   port: process.env.RAILWAY_DB_PORT,
//   user: process.env.RAILWAY_DB_USER,
//   password: process.env.RAILWAY_DB_PASSWORD,
//   database: process.env.RAILWAY_DB_DATABASE,
// });

const db = require('../connection/_index');

// 取得搜尋欄位商品資料
// 網址: http://localhost:3000/api/products/search/con=:author&kw=:心
app.get("/search/con=:con&kw=:keyWord", (req, res) => {
  const Bcon = req.params.con; //針對條件:我要作者:autohr、書名:name、系列:series、isbn:ISBN_id
  const BkeyWord = req.params.keyWord; //針對關鍵字
  const str_spans = "CALL 搜尋書(?,?)";

  db.query(str_spans, [BkeyWord, Bcon], (err, results) => {
    if (err) return res.status(500).json({ error: "查詢失敗", details: err });
    res.json({
      books: results[0]
      // books: results[0],total: results[1][0].totalBook
    });
  });
});
// 取得首頁12本人氣書資料
// 網址: http://localhost:3000/api/products/books
app.get("/books", (req, res) => {
  const Blimit = 12; //每頁12本書
  const str_spans = "CALL 綜合人氣排名(?)";
  // CALL 綜合人氣排名(2)
  db.query(str_spans, [Blimit], (err, results) => {
    if (err) return res.status(500).json({ error: "查詢失敗", details: err });
    res.json({
      books: results[0] // 不要回傳 total
    });
  });
});
// 分類 取得哪類就放到網址/books/分類 下
// 網址: http://localhost:3000/api/products/books/小說
app.get("/books/:sub", (req, res) => {
  const Bsub = req.params.sub; //針對:sub
  const Bpage = parseInt(req.query.page) || 1; //&page=1
  const Blimit = 10; //每頁10本書
  const Boffset = (Bpage - 1) * Blimit; //從第幾本開始
  const str_spans = "CALL 預存_小分類_分頁(?,?,?)";

  db.query(str_spans, [Bsub, Blimit, Boffset], (err, results) => {
    if (err) return res.status(500).json({ error: "查詢失敗", details: err });
    res.json({
      books: results[0],
      total: results[1][0].totalBook
    });
  });

});
// 拿到isbn後就可以取得該書的所有資料
// 網址: http://localhost:3000/api/products/book/999-000-984157-7
app.get("/book/:id", (req, res) => {
  const Bid = req.params.id;
  const str_spans = "CALL 該isbn的所有資料(?)";

  db.query(str_spans, [Bid], (err, results) => {
    if (err) {
      console.error("❌ 資料庫查詢錯誤：", err); // ← 加這行來看詳細錯誤
      return res.status(500).json({ error: "查詢失敗", details: err });
    }
    res.json({
      book: results[0]
    });
  });
});
//精確找作者

/* call 預存_作者_精確(作者名)
SELECT ISBN_id,name,description,price,award,author,imgUrl,series FROM products WHERE author = str;
*/
app.get("/author/:name", (req, res) => {
  const Bname = req.params.name;
  const str_spans = "CALL 預存_作者_精確(?)";

  db.query(str_spans, [Bname], (err, results) => {
    if (err) {
      console.error("❌ 資料庫查詢錯誤：", err); // ← 加這行來看詳細錯誤
      return res.status(500).json({ error: "查詢失敗", details: err });
    }
    res.json({
      books: results[0]
    });
  });
});


// 亘：加入收藏
app.post('/favorites', (req, res) => {
  const { user_id, ISBN_id } = req.body;

  // 先確認使用者是否存在
  db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, users) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: '伺服器錯誤' });
    }

    if (users.length === 0) {
      return res.status(404).json({ error: '找不到使用者' });
    }

    // 再插入收藏
    db.query(
      'INSERT INTO user_favorites (user_id, ISBN_id) VALUES (?, ?)',
      [user_id, ISBN_id],
      (err2, result) => {
        if (err2) {
          if (err2.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: '已收藏過' });
          } else {
            console.error(err2);
            return res.status(500).json({ error: '伺服器錯誤' });
          }
        }
        res.status(201).json({ message: '已收藏' });
      }
    );
  });
});

// ✅ 匯出 router
module.exports = app;
// app.listen(port, () => {
//   console.log(`✅ Server running on port ${port}`);
// });
