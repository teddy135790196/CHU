// backend/src/main/dao/orderAllDAO.js

const db = require('../../connection/_index');

function selectAllOrders(callback) {
  const sql = `
    SELECT 
      o.id,
      o.date,
      o.ship_date AS shipDate,
      o.settle_date AS settleDate,
      o.status,
      CASE 
        WHEN o.status = 0 THEN '已下單'
        WHEN o.status = 1 THEN '處理中'
        WHEN o.status = 2 THEN '已完成'
        WHEN o.status = 3 THEN '已取消'
        ELSE '未知狀態'
      END AS statusText,
      o.discount,
      o.total,
      d.book_id,
      d.title,
      d.price,
      d.qty
    FROM orders o
    JOIN order_query d ON o.id = d.order_id
    ORDER BY o.date DESC, o.id ASC;
  `;

  db.query(sql, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  selectAllOrders
};
