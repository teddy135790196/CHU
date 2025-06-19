// backend/src/main/route/orderAllRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/memberPurchaseController');

// 取得特定使用者的訂單
router.get('/user/:userId', orderController.getOrdersByUserId);

// 若要保留原本的全部訂單，路由也可以繼續保留
// router.get('/', orderController.getAllOrders);

module.exports = router;
