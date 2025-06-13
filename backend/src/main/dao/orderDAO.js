// backend/src/main/dao/orderDAO.js

const db = require('../../connection/_index');
const { OrderDTO, OrderDetailDTO } = require('../dto/orderDTO');

// 狀態碼轉中文（可以放到 util 或 enum）
const statusMap = {
	0: '已下單',
	1: '處理中',
	2: '已完成',
	3: '已取消',
};

function selectFullOrderData(orderId, callback) {
	const sqlOrder = `
		SELECT id, date, ship_date AS shipDate, settle_date AS settleDate, status, discount, total
		FROM orders
		WHERE id = ?;
	`;

	const sqlDetails = `
		SELECT title, price, qty
		FROM order_query
		WHERE order_id = ?;
	`;

	db.query(sqlOrder, [orderId], (err, orderRows) => {
		if (err) return callback(err);
		if (orderRows.length === 0) return callback(null, null); // 查無資料

		const orderData = orderRows[0];

		db.query(sqlDetails, [orderId], (err2, detailRows) => {
			if (err2) return callback(err2);

			// 組裝明細 DTO 陣列
			const details = detailRows.map(row => new OrderDetailDTO(row));

			// 組裝主 DTO
			const orderDTO = new OrderDTO({
				...orderData,
				statusText: statusMap[orderData.status],
				details,
			});

			return callback(null, orderDTO);
		});
	});
}


module.exports = {
	selectFullOrderData,
};