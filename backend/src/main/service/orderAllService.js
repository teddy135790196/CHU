// backend/src/main/service/orderAllService.js

const orderModel = require('../model/orderAllModel');
const { OrderDTO, OrderDetailDTO } = require('../dto/orderAllDTO');

function getAllOrders() {
  return new Promise((resolve, reject) => {
    orderModel.selectAllOrders((err, rows) => {
      if (err) return reject(err);

      const orderMap = new Map();

      rows.forEach(row => {
        if (!orderMap.has(row.id)) {
          orderMap.set(row.id, {
            id: row.id,
            created_at: row.created_at,
            statusText: getStatusText(row.status),
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

      const orderList = Array.from(orderMap.values()).map(order => new OrderDTO(order));
      resolve(orderList);
    });
  });
}

// 狀態轉文字
function getStatusText(status) {
  switch (status) {
    case 0: return '已下單';
    case 1: return '處理中';
    case 2: return '已完成';
    case 3: return '已取消';
    default: return '未知狀態';
  }
}

module.exports = {
  getAllOrders
};
