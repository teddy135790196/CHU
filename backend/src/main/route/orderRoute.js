// backend/src/main/route/orderRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// 查詢單筆訂單（GET /api/orders/:id）
router.get('/:id', orderController.selectOrderById);

module.exports = router;
