// backend/src/main/controller/orderController.js

const orderService = require('../service/orderService');

exports.selectOrderById = async (req, res) => {
	try {
		const orderId = req.params.id;
		const result = await orderService.selectOrderById(orderId);
		res.status(200).json({ success: true, data: result });
	} catch (err) {
		console.error('查詢訂單錯誤：', err.message);
		res.status(400).json({ success: false, message: err.message });
	}
};
