// backend/src/main/service/orderService.js

const orderModel = require('../model/orderModel');

function selectOrderById(orderId) {
	return new Promise((resolve, reject) => {
		orderModel.selectOrderById(orderId, (err, result) => {
			if (err) return reject(err);
			if (!result) return reject(new Error('查無此訂單'));
			resolve(result);
		});
	});
}

function createOrder(orderData) {
	return new Promise((resolve, reject) => {
		orderModel.createOrder(orderData, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function deleteOrder(orderId) {
	return new Promise((resolve, reject) => {
		// 驗證訂單ID格式
		if (!orderId || typeof orderId !== 'string') {
			return reject(new Error('無效的訂單ID'));
		}

		orderModel.deleteOrder(orderId, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function getAllOrders() {
	return new Promise((resolve, reject) => {
		orderModel.selectAllOrders((err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function getAllOrderDetails() {
	return new Promise((resolve, reject) => {
		orderModel.selectAllOrderDetails((err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

function getAllProducts() {
	return new Promise((resolve, reject) => {
		orderModel.selectAllProducts((err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	selectOrderById,
	createOrder,
	deleteOrder,
	getAllOrders,
	getAllOrderDetails,
	getAllProducts,
};
