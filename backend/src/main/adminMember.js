const express = require('express');
const router = express.Router();
const pool = require('../connection/_index'); // 這是 mysql2 callback 版本連線池

router.get('/', (req, res) => {
	pool.query(
		`
    SELECT
      user_id, username, nickname, gender, birth, email, phone,
      country, city, district, street, alley, house_number, postal_code,
      registration_time, isEmailVerified, surname, given_name, summary
    FROM users
    ORDER BY registration_time DESC
    `,
		(err, rows) => {
			if (err) {
				console.error('取得會員資料錯誤', err);
				return res.status(500).json({ error: '伺服器錯誤' });
			}
			res.json({ users: rows });
		}
	);
});

// DELETE /api/adminMember/:id
router.delete('/:id', (req, res) => {
	const userId = req.params.id;

	pool.query('DELETE FROM users WHERE user_id = ?', [userId], (err, result) => {
		if (err) {
			console.error('刪除會員錯誤', err);
			return res.status(500).json({ message: '伺服器錯誤' });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: '會員不存在' });
		}
		res.json({ message: '刪除成功' });
	});
});

// 連訂單一起刪除版
// router.delete('/:id', (req, res) => {
// 	const userId = req.params.id;

// 	pool.getConnection((err, connection) => {
// 		if (err) return res.status(500).json({ message: '伺服器錯誤' });

// 		connection.beginTransaction(err => {
// 			if (err) {
// 				connection.release();
// 				return res.status(500).json({ message: '伺服器錯誤' });
// 			}

// 			// 先刪除該會員訂單
// 			connection.query('DELETE FROM orders WHERE user_id = ?', [userId], (err, result) => {
// 				if (err) {
// 					return connection.rollback(() => {
// 						connection.release();
// 						res.status(500).json({ message: '刪除訂單錯誤' });
// 					});
// 				}

// 				// 再刪除會員
// 				connection.query('DELETE FROM users WHERE user_id = ?', [userId], (err, result) => {
// 					if (err) {
// 						return connection.rollback(() => {
// 							connection.release();
// 							res.status(500).json({ message: '刪除會員錯誤' });
// 						});
// 					}

// 					if (result.affectedRows === 0) {
// 						return connection.rollback(() => {
// 							connection.release();
// 							res.status(404).json({ message: '會員不存在' });
// 						});
// 					}

// 					connection.commit(err => {
// 						if (err) {
// 							return connection.rollback(() => {
// 								connection.release();
// 								res.status(500).json({ message: '提交失敗' });
// 							});
// 						}

// 						connection.release();
// 						res.json({ message: '刪除成功' });
// 					});
// 				});
// 			});
// 		});
// 	});
// });



module.exports = router;
