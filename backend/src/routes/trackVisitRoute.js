const express = require('express');
const router = express.Router();
const db = require('../connection/_index');

router.post('/', async (req, res) => {
	console.log('有人呼叫 /api/trackVisit 了');

	// 取得 IP 與使用者代理
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const ua = req.headers['user-agent'];

	try {
		await db.execute(
			`INSERT INTO visits (visit_date, ip_address, user_agent) 
			 VALUES (CURDATE(), ?, ?)`,
			[ip, ua]
		);

		res.json({ success: true });
	} catch (err) {
		console.error('訪問紀錄寫入失敗', err);
		res.status(500).json({ success: false, message: '寫入失敗' });
	}
});

module.exports = router;
