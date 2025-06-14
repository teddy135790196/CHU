// backend/sre/routes/_index.js

const express = require('express');
const router = express.Router();

// 根路由(/api)
router.get('/', (req, res) => res.send('Hello from backend with MySQL!'));

// 資料庫路由(/api)
router.use('/railwayDB', require('./railwayRoute'));

// 各功能路由(/api)
router.use('/captcha', require('../main/route/captchaRoute'));
router.use('/login', require('../main/route/loginRoute'));
router.use('/memberSetting', require('../main/route/memberSettingRoute'));
router.use('/orders', require('../main/route/orderRoute'));
router.use('/orders-all', require('../main/route/orderAllRoute'));
router.use('/register/check', require('../main/route/registerCheckRoute'));
router.use('/register', require('../main/route/registerRoute'));


module.exports = router;
