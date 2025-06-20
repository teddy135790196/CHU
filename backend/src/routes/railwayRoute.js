// backend/src/routes/railwayRoute.js
const express = require('express');
const router = express.Router();
const database = require('../connection/railwayConnection');

// http://localhost:3000/api/railwayDB/test
router.get('/test', (req, res) => {
  database.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// http://localhost:3000/api/railwayDB/orders
router.get('/orders', (req, res) => {
  database.query('SELECT * FROM orders', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/api/railwayDB/orders_query
router.get('/orders_query', (req, res) => {
  database.query('SELECT * FROM orders_query', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/api/railwayDB/products
router.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/api/railwayDB/users
router.get('/users', (req, res) => {
  database.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

module.exports = router;
