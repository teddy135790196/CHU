const express = require('express');
const router = express.Router();
const pool = require('../connection/_index'); // 這是 mysql2 callback 版本連線池

console.log('✅ bookHandle 路由已載入');
// 本來是 router.post('/bookinsert', async (req, res) => { 但會變成路徑/bookinsert/bookinsert
router.post('/', async (req, res) => {
	// const bookInsert = req.params.book;
	const Book = req.body; // 不需要再包一層 Book
	//驗證該填都有沒有填好。沒有則回去重填
	if (!Book.ISBN || !Book.name) {
		return res.status(400).json({ error: '請填寫書號&書名' });
	} else if (!Book.price || !Book.stock) {
		return res.status(400).json({ error: '庫存&價格' });
	} else if (!Book.pub_type || !Book.author) { return res.status(400).json({ error: '請填寫作者&出版類型' }); }

	try {
		// 使用你自己的 DB 操作語法
		await pool.query(`insert products(ISBN_id,name,description,price,
			stock,publisher,award,original_language,
			major_category,minor_category,page,author,imgUrl,series,pub_type) 
			values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
			[Book.ISBN, Book.name, Book.desc, Book.price, Book.stock,
			Book.publisher, Book.award, Book.original_language,
			Book.major_category, Book.minor_category, Book.page, Book.author,
			Book.img, Book.series, Book.pub_type
			]);
		res.json({ success: true });
	} catch (err) {
		console.error('DB Error:', err);
		res.status(500).json({ error: '更新失敗' });
	}
});

module.exports = router;
// router.put('/:id/contact', async (req, res) => {
// 	const userId = req.params.id;
// 	const { email, phone, address } = req.body;
// 	try {
// 		await db.query('UPDATE users SET email=?, phone=?, address=? WHERE id=?',
// 			[email, phone, address, userId]);
// 		res.json({ success: true });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: '更新失敗' });
// 	}
// });