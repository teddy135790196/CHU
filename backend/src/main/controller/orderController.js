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

exports.deleteOrder = async (req, res) => {
	try {
		const orderId = req.params.id;
		console.log('準備刪除訂單：', orderId);
		
		const result = await orderService.deleteOrder(orderId);
		console.log('訂單刪除成功：', result);
		
		res.status(200).json({ 
			success: true, 
			message: '訂單刪除成功',
			data: result 
		});
	} catch (err) {
		console.error('刪除訂單錯誤：', err.message);
		res.status(500).json({ 
			success: false, 
			message: '訂單刪除失敗',
			error: err.message 
		});
	}
};

exports.getAllOrders = async (req, res) => {
	try {
		const result = await orderService.getAllOrders();
		res.status(200).json(result);
	} catch (err) {
		console.error('取得所有訂單錯誤：', err.message);
		res.status(500).json({ 
			success: false, 
			message: '取得訂單失敗',
			error: err.message 
		});
	}
};

exports.getAllOrderDetails = async (req, res) => {
	try {
		const result = await orderService.getAllOrderDetails();
		res.status(200).json(result);
	} catch (err) {
		console.error('取得所有訂單明細錯誤：', err.message);
		res.status(500).json({ 
			success: false, 
			message: '取得訂單明細失敗',
			error: err.message 
		});
	}
};

exports.getAllProducts = async (req, res) => {
	try {
		const result = await orderService.getAllProducts();
		res.status(200).json(result);
	} catch (err) {
		console.error('取得所有商品錯誤：', err.message);
		res.status(500).json({ 
			success: false, 
			message: '取得商品失敗',
			error: err.message 
		});
	}
};
