// sre/routes/_index.js

const express = require('express');
const router = express.Router();

// 根路由
router.get('/', (req, res) => res.send('Hello from backend with MySQL!'));

// 資料庫路由
router.use('/azureDB', require('./azureRoute'));
router.use('/DB', require('./alwaysdataRoute'));
router.use('/railwayDB', require('./railwayRoute'));

// 各功能路由
router.use('/api/captcha', require('../main/route/captchaRoute'));
router.use('/api/login', require('../main/route/loginRoute'));
router.use('/api/register', require('../main/route/registerRoute'));


module.exports = router;
