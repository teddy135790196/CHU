// backend/src/main/route/orderRoute.js

const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

// 取得所有訂單（GET /api/orders）
router.get('/', orderController.getAllOrders);

// 取得所有訂單明細（GET /api/orders/details）
router.get('/details', orderController.getAllOrderDetails);

// 取得所有商品（GET /api/orders/products）
router.get('/products', orderController.getAllProducts);

// 創建新訂單（POST /api/orders）
router.post('/', orderController.createOrder);

// 查詢單筆訂單（GET /api/orders/:id）
router.get('/:id', orderController.selectOrderById);

// 刪除訂單（DELETE /api/orders/:id）
router.delete('/:id', orderController.deleteOrder);

module.exports = router;

