

// router.post('/bookinsert', async (req, res) => {
// 	// const bookInsert = req.params.book;
// 	const { nickname, gender, birth, summary } = req.body;
// 	try {
// 		// 使用你自己的 DB 操作語法
// 		await db.query(`insert products(ISBN_id,name,description,price,
// 			stock,publisher,award,original_language,
// 			major_category,minor_category,page,author,imgUrl,series,pub_type) 
// 			values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
// 			[Book.ISBN,  Book.name, Book.desc,  Book.price,Book.stock,
// 				Book.publisher,Book.award,Book.original_language,
// 				Book.major_category,Book.minor_category,
// 			]);
// 		res.json({ success: true });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: '更新失敗' });
// 	}
// });

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
