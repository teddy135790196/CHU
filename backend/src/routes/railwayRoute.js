// src/routes/railwayRoute.js
const express = require('express');
const router = express.Router();
const database = require('../connection/railwayConfig');

// http://localhost:3000/railwayDB/books
router.get('/books', (req, res) => {
  database.query('SELECT * FROM T_book', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/railwayDB/products
router.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/railwayDB/users
router.get('/users', (req, res) => {
  database.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

module.exports = router;
