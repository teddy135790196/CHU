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

// 添加 selectOrderById 方法，基於 orderAllDAO.js 的表格結構
function selectOrderById(orderId, callback) {
	const sql = `
		SELECT 
			o.order_id AS id,
			o.created_at,
			o.status,
			o.total_amount AS total,
			d.ISBN_id,
			p.name AS title,
			d.price_at_order_time AS price,
			d.quantity AS qty,
			d.subtotal
		FROM orders o
		JOIN orders_query d ON o.order_id = d.order_id
		JOIN products p ON d.ISBN_id = p.ISBN_id
		WHERE o.order_id = ?
		ORDER BY d.ISBN_id ASC;
	`;

	db.query(sql, [orderId], (err, rows) => {
		if (err) return callback(err);
		if (rows.length === 0) return callback(null, null);

		// 組裝訂單數據
		const orderData = {
			id: rows[0].id,
			created_at: rows[0].created_at,
			status: rows[0].status,
			total: rows[0].total,
			details: rows.map(row => new OrderDetailDTO({
				id: row.ISBN_id,
				name: row.title,
				price: row.price,
				qty: row.qty
			}))
		};

		const orderDTO = new OrderDTO({
			id: orderData.id,
			date: orderData.created_at,
			status: orderData.status,
			total: orderData.total,
			statusText: statusMap[orderData.status] || '未知狀態',
			details: orderData.details
		});

		callback(null, orderDTO);
	});
}

// 修改插入訂單的方法以適配實際的表結構
function insertOrder(orderData, callback) {
	// 生成訂單ID（使用時間戳 + 隨機數）
	const orderId = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
	
	// 使用連接池獲取連接
	db.getConnection((err, connection) => {
		if (err) {
			console.error('獲取資料庫連接失敗:', err);
			return callback(err);
		}

		// 開始事務
		connection.beginTransaction((err) => {
			if (err) {
				connection.release();
				console.error('開始事務失敗:', err);
				return callback(err);
			}

			// 插入主訂單到 orders 表
			const insertOrderSql = `
				INSERT INTO orders (
					order_id, user_id, ISBN_id, delivery_id, user_name, user_tel, 
					user_email, user_address, payment_method, message, 
					delivery_method, carrier, estimated_weight, shipping_fee, 
					total_amount, status, created_at
				) VALUES (?, 1, ?, 'DEL001', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
			`;

			// 使用第一個商品的 ISBN_id 作為主要商品
			const firstItem = orderData.items[0];
			const delivery = orderData.delivery || {};
			const user = orderData.user || {};

			const orderValues = [
				orderId,
				firstItem.id, // ISBN_id
				user.name || '訪客',
				user.tel || '',
				user.email || '',
				user.address || '',
				orderData.payment || 'online',
				orderData.message || '',
				delivery.delivery_method || 'standard',
				delivery.carrier || '',
				delivery.estimated_weight || 0,
				delivery.shipping_fee || 0,
				orderData.totalAmount
			];

			connection.query(insertOrderSql, orderValues, (err, orderResult) => {
				if (err) {
					console.error('插入訂單錯誤:', err);
					return connection.rollback(() => {
						connection.release();
						callback(err);
					});
				}

				// 插入訂單明細到 orders_query 表
				if (orderData.items.length > 0) {
					const insertDetailsSql = `
						INSERT INTO orders_query (order_id, ISBN_id, price_at_order_time, quantity, subtotal)
						VALUES ?
					`;

					const detailsValues = orderData.items.map(item => [
						orderId,
						item.id,
						item.price,
						item.quantity,
						item.subtotal
					]);

					connection.query(insertDetailsSql, [detailsValues], (err) => {
						if (err) {
							console.error('插入訂單明細錯誤:', err);
							return connection.rollback(() => {
								connection.release();
								callback(err);
							});
						}
						
						// 提交事務
						connection.commit((err) => {
							if (err) {
								console.error('提交事務失敗:', err);
								return connection.rollback(() => {
									connection.release();
									callback(err);
								});
							}
							
							connection.release();
							console.log('訂單創建成功，訂單ID:', orderId);
							callback(null, { orderId: orderId });
						});
					});
				} else {
					// 提交事務
					connection.commit((err) => {
						if (err) {
							console.error('提交事務失敗:', err);
							return connection.rollback(() => {
								connection.release();
								callback(err);
							});
						}
						
						connection.release();
						console.log('訂單創建成功，訂單ID:', orderId);
						callback(null, { orderId: orderId });
					});
				}
			});
		});
	});
}

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

// 刪除訂單及其相關明細
function deleteOrderById(orderId, callback) {
	// 使用連接池獲取連接
	db.getConnection((err, connection) => {
		if (err) {
			console.error('獲取資料庫連接失敗:', err);
			return callback(err);
		}

		// 開始事務
		connection.beginTransaction((err) => {
			if (err) {
				connection.release();
				console.error('開始刪除事務失敗:', err);
				return callback(err);
			}

			// 先刪除訂單明細 (orders_query 表)
			const deleteDetailsSql = 'DELETE FROM orders_query WHERE order_id = ?';
			
			connection.query(deleteDetailsSql, [orderId], (err, detailResult) => {
				if (err) {
					console.error('刪除訂單明細錯誤:', err);
					return connection.rollback(() => {
						connection.release();
						callback(err);
					});
				}

				// 再刪除主訂單 (orders 表)
				const deleteOrderSql = 'DELETE FROM orders WHERE order_id = ?';
				
				connection.query(deleteOrderSql, [orderId], (err, orderResult) => {
					if (err) {
						console.error('刪除主訂單錯誤:', err);
						return connection.rollback(() => {
							connection.release();
							callback(err);
						});
					}

					// 檢查是否真的刪除了訂單
					if (orderResult.affectedRows === 0) {
						return connection.rollback(() => {
							connection.release();
							callback(new Error('訂單不存在或已被刪除'));
						});
					}

					// 提交事務
					connection.commit((err) => {
						if (err) {
							console.error('提交刪除事務失敗:', err);
							return connection.rollback(() => {
								connection.release();
								callback(err);
							});
						}
						
						connection.release();
						console.log('訂單刪除成功，訂單ID:', orderId);
						callback(null, { 
							success: true, 
							orderId: orderId,
							deletedDetails: detailResult.affectedRows,
							message: '訂單已成功刪除'
						});
					});
				});
			});
		});
	});
}

// 取得所有訂單（管理員用）
function selectAllOrders(callback) {
	const sql = 'SELECT * FROM orders';
	db.query(sql, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

// 取得所有訂單明細（管理員用）
function selectAllOrderDetails(callback) {
	const sql = 'SELECT * FROM orders_query';
	db.query(sql, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

// 取得所有商品（管理員用）
function selectAllProducts(callback) {
	const sql = 'SELECT * FROM products';
	db.query(sql, (err, results) => {
		if (err) return callback(err);
		callback(null, results);
	});
}

module.exports = {
	selectOrderById,
	insertOrder,
	selectFullOrderData,
	deleteOrderById,
	selectAllOrders,
	selectAllOrderDetails,
	selectAllProducts,
};
