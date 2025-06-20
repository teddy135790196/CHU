// backend/src/main/controller/emailVerificationController.js.js

const crypto = require('crypto');
const emailVerificationService = require('../service/emailVerificationService');

exports.sendVerificationEmail = async (req, res) => {
  const { toEmail } = req.body;

  if (!toEmail) {
    return res.status(400).json({ success: false, message: '缺少 email 參數' });
  }

  try {
    const message = await emailVerificationService.sendVerificationEmail(toEmail);
    res.status(200).json({ success: true, message });
  } catch (err) {
    console.error('寄送驗證信錯誤:', err);
    res.status(500).json({ success: false, message: '寄送驗證信失敗' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('缺少驗證 token');
  }

  try {
    const message = await emailVerificationService.verifyEmail(token);
    res.status(200).send(message);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
