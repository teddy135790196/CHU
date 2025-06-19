// backend/src/main/model/orderAllModel.js

const orderDAO = require('../dao/memberPurchaseDAO');

function selectOrdersByUserId(userId, callback) {
  orderDAO.selectOrdersByUserId(userId, callback);
}

module.exports = {
  selectOrdersByUserId
};
