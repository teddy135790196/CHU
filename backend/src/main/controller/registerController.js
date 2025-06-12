// backend/src/main/controller/registerController.js

const registerService = require('../service/registerService');

exports.insertRegisterData = async (req, res) => {
  try {
    const result = await registerService.insertRegisterData(req.body);  // req.body => 前端傳來的表單
    // 201 伺服器有建立新資源
    res.status(201).json({ message: '註冊成功', userId: result.id });
  } catch (err) {
    console.error('註冊失敗錯誤:', err);
    // 400 用戶端的請求格式錯誤，伺服器拒絕處理
    res.status(400).json({ error: err.message });
  }
};