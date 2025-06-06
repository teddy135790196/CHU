// sre/routes/_index.js

const express = require('express');
const router = express.Router();

// 根路由
router.get('/', (req, res) => res.send('Hello from backend with MySQL!'));

// 資料庫路由
router.use('/azureDB', require('./db/azureRoute'));
router.use('/railwayDB', require('./db/railwayRoute'));

// 各功能路由
router.use('/api/captcha', require('./captchaRoute'));
router.use('/api/login', require('./loginRoute'));
router.use('/api/register', require('./registerRoute'));


module.exports = router;
