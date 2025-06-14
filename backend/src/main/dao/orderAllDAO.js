// backend/src/main/dao/orderAllDAO.js

const db = require('../../connection/_index');

function selectAllOrders(callback) {
  const sql = `
    SELECT 
  o.order_id AS id,
  o.created_at,
  o.status,
  o.total_amount AS total,
  d.ISBN_id,
  p.name AS title,  -- 替代原本 b.title
  d.price_at_order_time AS price,
  d.quantity AS qty,
  d.subtotal
FROM orders o
JOIN orders_query d ON o.order_id = d.order_id
JOIN products p ON d.ISBN_id = p.ISBN_id
ORDER BY o.created_at DESC, o.order_id ASC;
  `;

  db.query(sql, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
}

module.exports = {
  selectAllOrders
};
