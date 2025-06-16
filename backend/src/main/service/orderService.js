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

module.exports = {
	selectOrderById,
	createOrder,
};
