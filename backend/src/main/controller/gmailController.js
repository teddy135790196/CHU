// backend/src/main/controller/gmailController.js

const gmailService = require('../service/gmailService');

exports.sendVerificationEmail = async (req, res) => {
	const { toEmail } = req.body;

	if (!toEmail) {
		return res.status(400).json({ success: false, message: '缺少 email 參數' });
	}

	try {
		await gmailService.sendVerificationEmail(toEmail);
		res.status(200).json({ success: true, message: '驗證信已寄出' });
	} catch (err) {
		console.error('寄送驗證信錯誤:', err);
		res.status(500).json({ success: false, message: '寄送驗證信失敗' });
	}
};
