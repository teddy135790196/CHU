// backend/src/main/model/orderModel.js

const orderDAO = require('../dao/orderDAO');

function selectOrderById(orderId, callback) {
	orderDAO.selectOrderById(orderId, callback);
}

module.exports = {
	selectOrderById,
};
