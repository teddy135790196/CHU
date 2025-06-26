const express = require('express');
const router = express.Router();
const pool = require('../connection/_index');
const util = require('util');

// 把 callback 版 query 包成 Promise 版
const query = util.promisify(pool.query).bind(pool);

console.log('✅ bookHandle 路由已載入');

router.post('/', async (req, res) => {
  const Book = req.body;

  if (!Book.ISBN || !Book.name) {
    return res.status(400).json({ error: '請填寫書號&書名' });
  } else if (!Book.price || !Book.stock) {
    return res.status(400).json({ error: '庫存&價格' });
  } else if (!Book.pub_type || !Book.author) {
    return res.status(400).json({ error: '請填寫作者&出版類型' });
  }

  try {
    await query(
      `INSERT INTO products(ISBN_id, name, description, price,
      stock, publisher, award, original_language,
      major_category, minor_category, page, author, imgUrl, series, pub_type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Book.ISBN,
        Book.name,
        Book.desc || '',
        Book.price,
        Book.stock,
        Book.publisher || '',
        Book.award || '',
        Book.original_language || '',
        Book.major_category || '',
        Book.minor_category || '',
        Book.page || 0,
        Book.author,
        Book.img || '',
        Book.series || '',
        Book.pub_type,
      ]
    );
    res.json({ success: true });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: '更新失敗' });
  }
});

module.exports = router;
