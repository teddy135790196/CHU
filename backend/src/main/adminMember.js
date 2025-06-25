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

module.exports = router;
