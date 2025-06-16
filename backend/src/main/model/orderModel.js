// backend/src/main/model/orderModel.js

const orderDAO = require('../dao/orderDAO');

function selectOrderById(orderId, callback) {
	orderDAO.selectOrderById(orderId, callback);
}

function createOrder(orderData, callback) {
	orderDAO.insertOrder(orderData, callback);
}

module.exports = {
	selectOrderById,
	createOrder,
};
