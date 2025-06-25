// backend/src/routes/_index.js

const express = require('express');
const router = express.Router();

// 根路由(/api)
router.get('/', (req, res) => res.send('Hello from backend with MySQL!'));

// 統計訪問數據(/api)
router.use('/trackVisit', require('./trackVisitRoute'));

// 資料庫路由(/api)
router.use('/railwayDB', require('./railwayRoute'));
router.use('/azureDB', require('./azureRoute'));

// 各功能路由(/api)
router.use('/captcha', require('../main/route/captchaRoute'));
router.use('/login', require('../main/route/loginRoute'));
router.use('/forgot-password', require('../main/route/forgotPasswordRoute'));
router.use('/email-verification', require('../main/route/emailVerificationRoute'));
router.use('/memberSetting', require('../main/route/memberSettingRoute'));
router.use('/memberPurchase', require('../main/route/memberPurchaseRoute'));
router.use('/orders', require('../main/route/orderRoute'));
router.use('/register/check', require('../main/route/registerCheckRoute'));
router.use('/register', require('../main/route/registerRoute'));
router.use('/products', require('../main/node2'));
router.use('/admin', require('../main/admin'));
router.use('/adminMember', require('../main/adminMember'));


module.exports = router;
