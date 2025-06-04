// routes/test.js
const express = require('express');
const router = express.Router();
const database = require('../db');

router.get('/books', (req, res) => {
  database.query('SELECT * FROM T_book', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

router.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

module.exports = router;
