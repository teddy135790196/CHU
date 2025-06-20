// backend/routes/memberSetting.js
router.put('/:id/info', async (req, res) => {
	const userId = req.params.id;
	const { nickname, gender, birth, summary } = req.body;
	try {
		// 使用你自己的 DB 操作語法
		await db.query('UPDATE users SET nickname=?, gender=?, birth=?, summary=? WHERE id=?', 
			[nickname, gender, birth, summary, userId]);
		res.json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: '更新失敗' });
	}
});

router.put('/:id/contact', async (req, res) => {
	const userId = req.params.id;
	const { email, phone, address } = req.body;
	try {
		await db.query('UPDATE users SET email=?, phone=?, address=? WHERE id=?', 
			[email, phone, address, userId]);
		res.json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: '更新失敗' });
	}
});
