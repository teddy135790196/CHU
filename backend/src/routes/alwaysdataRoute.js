// backend/src/routes/alwaysdataRoute.js
const express = require('express');
const router = express.Router();
const database = require('../connection/alwaysdataConnection');

// http://localhost:3000/api/alwaysdataDB/test
router.get('/test', (req, res) => {
  database.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// http://localhost:3000/api/alwaysdataDB/users
router.get('/users', (req, res) => {
  database.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

module.exports = router;
