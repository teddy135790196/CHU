const express = require('express');
const router = express.Router();
const db = require('../connection/_index');

// POST：記錄訪問資料
router.post('/', (req, res) => {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	const ua = req.headers['user-agent'];

	const sql = `
    INSERT INTO visits (visit_date, ip_address, user_agent) 
    VALUES (CURDATE(), ?, ?)
  `;

	db.query(sql, [ip, ua], (err, results) => {
		if (err) {
			console.error('訪問紀錄寫入失敗', err);
			return res.status(500).json({ success: false, message: '寫入失敗' });
		}
		res.json({ success: true });
	});
});

// GET：取得最近3天 visits_summary (前天、昨天、今天)，日期以台北時區計算
router.get('/visits_summary', (req, res) => {
	const sql = `
    SELECT 
      CONVERT_TZ(visit_date, '+00:00', '+08:00') AS visit_date, 
      hour, 
      visit_count
    FROM visit_summary
    WHERE DATE(CONVERT_TZ(visit_date, '+00:00', '+08:00')) IN (
      CURDATE(), 
      CURDATE() - INTERVAL 1 DAY, 
      CURDATE() - INTERVAL 2 DAY
    )
    ORDER BY visit_date ASC, hour ASC
  `;

	db.query(sql, (err, results) => {
		if (err) {
			console.error('讀取 visits_summary 錯誤:', err);
			return res.status(500).json({ message: '伺服器錯誤', error: err.message });
		}
		res.json(results);
	});
});


// GET：取得訪問總瀏覽量
router.get('/visits_total', (req, res) => {
	const sql = `SELECT SUM(visit_count) AS total FROM visit_summary`;

	db.query(sql, (err, results) => {
		if (err) {
			console.error('讀取訪問總數錯誤:', err);
			return res.status(500).json({ message: '伺服器錯誤', error: err.message });
		}
		res.json({ total: results[0].total || 0 });
	});
});




module.exports = router;
