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


// PUT /api/orders/user/:id
router.put('/user/:id', (req, res) => {
	const { id } = req.params;
	const { realName, phone, email, address } = req.body;

	db.query(
		`UPDATE users SET realName = ?, phone = ?, email = ?, address = ? WHERE user_id = ?`,
		[realName, phone, email, address, id],
		(err, result) => {
			if (err) return res.status(500).json({ error: '更新失敗' });
			res.json({ message: '更新成功' });
		}
	);
});


const db = require('../../connection/_index'); // 根據你專案的實際路徑調整
// GET /api/orders/user/:id
router.get('/user/:id', (req, res) => {
	const { id } = req.params;
	console.log('收到請求：使用者 ID =', id);

	db.query(
		`SELECT realName, phone, email, address FROM users WHERE user_id = ?`,
		[id],
		(err, result) => {
			if (err) {
				console.error('資料庫查詢錯誤：', err);
				console.error('SQL 錯誤內容：', err.sqlMessage); // 印出實際 MySQL 錯誤訊息
				return res.status(500).json({ error: '資料庫查詢失敗' });
			}

			if (result.length === 0) {
				console.warn('找不到使用者');
				return res.status(404).json({ error: '找不到該使用者' });
			}

			res.json(result[0]); // 回傳使用者資料
		}
	);
});


module.exports = router;

