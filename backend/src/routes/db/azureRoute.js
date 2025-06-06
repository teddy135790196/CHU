// src/routes/db/azureRoute.js
const express = require('express');
const router = express.Router();
const database = require('../../connection/azureConfig');

// http://localhost:3000/azureDB/test-db
router.get('/test-db', (req, res) => {
  database.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// http://localhost:3000/azureDB/products
router.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// http://localhost:3000/azureDB/users
router.get('/users', (req, res) => {
  database.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});
module.exports = router;
