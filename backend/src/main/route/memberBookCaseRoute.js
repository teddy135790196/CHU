const express = require('express');
const router = express.Router();
const db = require('../../connection/_index'); // 假設這裡是 mysql2 連線物件 con

// 取得指定 user_id 收藏清單
router.get('/favorites/:user_id', (req, res) => {
	const user_id = req.params.user_id;

	db.query(
		`SELECT f.ISBN_id, p.name, p.author, p.price, p.imgUrl
     FROM user_favorites f
     JOIN products p ON f.ISBN_id = p.ISBN_id
     WHERE f.user_id = ?`,
		[user_id],
		(err, rows) => {
			if (err) {
				console.error('取得收藏失敗:', err);
				return res.status(500).json({ message: '伺服器錯誤' });
			}

			if (rows.length === 0) {
				return res.status(200).json({ favorites: [] });
			}

			res.json({ favorites: rows });
		}
	);
});


// 刪除用戶收藏的書籍
router.delete('/favorites/:userId/:ISBN_id', (req, res) => {
	const userId = req.params.userId;
	const ISBN_id = req.params.ISBN_id;

	if (!userId || !ISBN_id) {
		return res.status(400).json({ message: '缺少 userId 或 ISBN_id' });
	}

	// 這裡用你 GET 用的資料表 user_favorites
	const sql = 'DELETE FROM user_favorites WHERE user_id = ? AND ISBN_id = ?';
	db.query(sql, [userId, ISBN_id], (err, result) => {
		if (err) {
			console.error('刪除失敗:', err);
			return res.status(500).json({ message: '刪除收藏失敗' });
		}
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: '找不到該收藏項目' });
		}
		res.json({ message: '刪除成功' });
	});
});



module.exports = router;
