// backend/src/main/route/orderAllRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderAllController');

// ✅ 取得所有訂單（含明細）
router.get('/', orderController.getAllOrders);

// （之後可加）router.get('/:userId', orderController.getOrdersByUserId);

module.exports = router;
