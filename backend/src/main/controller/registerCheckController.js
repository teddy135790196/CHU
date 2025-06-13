// backend/src/main/controller/registerCheckController.js

const registerCheckService = require('../service/registerCheckService');

exports.checkUsername = async (req, res) => {
	try {
		const { username } = req.query;

		if (!username || username.trim() === '') {
			return res.status(400).json({ error: '缺少 username 參數' });
		}

		const exists = await registerCheckService.checkUsername(username);
		res.json({ exists });	// true || false
	} catch (err) {
		console.error('檢查帳號錯誤:', err);
		res.status(500).json({ error: '伺服器錯誤' });
	}
};

exports.checkEmail = async (req, res) => {
	try {
		const { email } = req.query;

		if (!email || email.trim() === '') {
			return res.status(400).json({ error: '缺少 email 參數' });
		}
		const exists = await registerCheckService.checkEmail(email);
		res.json({ exists });	// true || false
	} catch (err) {
		console.error('檢查郵箱錯誤:', err);
		res.status(500).json({ error: '伺服器錯誤' });
	}
};