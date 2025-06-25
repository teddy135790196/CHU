// backend/src/main/model/orderModel.js

const orderDAO = require('../dao/orderDAO');

function selectOrderById(orderId, callback) {
	orderDAO.selectOrderById(orderId, callback);
}

function createOrder(orderData, callback) {
	orderDAO.insertOrder(orderData, callback);
}

function deleteOrder(orderId, callback) {
	orderDAO.deleteOrderById(orderId, callback);
}

function selectAllOrders(callback) {
	orderDAO.selectAllOrders(callback);
}

function selectAllOrderDetails(callback) {
	orderDAO.selectAllOrderDetails(callback);
}

function selectAllProducts(callback) {
	orderDAO.selectAllProducts(callback);
}

module.exports = {
	selectOrderById,
	createOrder,
	deleteOrder,
	selectAllOrders,
	selectAllOrderDetails,
	selectAllProducts,
};

