// backend/src/main/model/orderAllModel.js

const orderDAO = require('../dao/orderAllDAO');

function selectAllOrders(callback) {
  orderDAO.selectAllOrders(callback);
}

module.exports = {
  selectAllOrders
};
