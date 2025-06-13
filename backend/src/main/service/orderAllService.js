// backend/src/main/service/orderAllService.js

const orderModel = require('../model/orderAllModel');
const { OrderDTO, OrderDetailDTO } = require('../dto/orderAllDTO');

function getAllOrders() {
  return new Promise((resolve, reject) => {
    orderModel.selectAllOrders(async (err, rows) => {
      if (err) return reject(err);

      // 建立 Map 群組化訂單（因為明細會多筆）
      const orderMap = new Map();

      rows.forEach(row => {
        if (!orderMap.has(row.id)) {
          orderMap.set(row.id, {
            id: row.id,
            date: row.date,
            shipDate: row.shipDate,
            settleDate: row.settleDate,
            status: row.status,
            statusText: row.statusText,
            discount: row.discount,
            total: row.total,
            details: []
          });
        }

        const detail = new OrderDetailDTO({
          id: row.book_id,
          name: row.title,
          price: row.price,
          qty: row.qty
        });

        orderMap.get(row.id).details.push(detail);
      });

      // 回傳 DTO 陣列
      const orderList = Array.from(orderMap.values()).map(order => new OrderDTO(order));
      resolve(orderList);
    });
  });
}

module.exports = {
  getAllOrders
};
