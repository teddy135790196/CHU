// sre/routes/_index.js

const express = require('express');
const router = express.Router();

// 根路由
router.get('/', (req, res) => res.send('Hello from backend with MySQL!'));

// 資料庫路由
router.use('/azureDB', require('./azureRoute'));
router.use('/railwayDB', require('./railwayRoute'));

// 各功能路由
router.use('/captcha', require('../main/route/captchaRoute'));
router.use('/login', require('../main/route/loginRoute'));
router.use('/register', require('../main/route/registerRoute'));

// 錯誤處理中間件
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 處理
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = router;
