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

// GET：取得最近3天 visits_last_3_days (前天、昨天、今天)，日期以台北時區計算
router.get('/visits_last_3_days', (req, res) => {
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
			console.error('讀取 visits_last_3_days 錯誤:', err);
			return res.status(500).json({ message: '伺服器錯誤', error: err.message });
		}
		res.json(results);
	});
});


// GET：取得近30天每日瀏覽量總和
router.get('/visits_last_30_days', (req, res) => {
	const sql = `
    WITH RECURSIVE dates AS (
      SELECT CURDATE() - INTERVAL 29 DAY AS visit_date
      UNION ALL
      SELECT visit_date + INTERVAL 1 DAY FROM dates WHERE visit_date + INTERVAL 1 DAY <= CURDATE()
    )
    SELECT
      dates.visit_date,
      COALESCE(SUM(v.visit_count), 0) AS daily_visit_count
    FROM dates
    LEFT JOIN visit_summary v
      ON DATE(CONVERT_TZ(v.visit_date, '+00:00', '+08:00')) = dates.visit_date
    GROUP BY dates.visit_date
    ORDER BY dates.visit_date ASC;
  `;

	db.query(sql, (err, results) => {
		if (err) {
			console.error('讀取近30天瀏覽量錯誤:', err);
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


router.get('/active_users_recent', (req, res) => {
	const sql = `
    SELECT visit_date, hour, active_user_count
    FROM visit_summary
    ORDER BY visit_date DESC, hour DESC
    LIMIT 24
  `;

	db.query(sql, (err, results) => {
		if (err) {
			console.error('讀取活躍用戶資料錯誤:', err);
			return res.status(500).json({ message: '伺服器錯誤', error: err.message });
		}
		// 反轉陣列，讓資料從最早到最新（畫折線圖順序）
		res.json(results.reverse());
	});
});



module.exports = router;
