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

exports.createOrder = async (req, res) => {
	try {
		console.log('收到訂單數據：', req.body);
		const result = await orderService.createOrder(req.body);
		console.log('訂單創建成功：', result);
		res.status(201).json({ 
			success: true, 
			message: '訂單創建成功',
			data: result 
		});
	} catch (err) {
		console.error('創建訂單錯誤：', err.message);
		res.status(500).json({ 
			success: false, 
			message: '訂單創建失敗',
			error: err.message 
		});
	}
};
