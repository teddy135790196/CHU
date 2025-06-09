// src/routes/alwaysdataRoute.js
const express = require('express');
const router = express.Router();
const database = require('../connection/alwaysdataConfig');

// http://localhost:3000/alwaysdataDB/test-db
router.get('/test', (req, res) => {
  database.query('SELECT NOW() AS now', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

module.exports = router;
