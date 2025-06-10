// src/main/controller/registerController.js

const registerService = require('../service/registerService');

exports.registerUser = async (req, res) => {
  try {
    const result = await registerService.registerUser(req.body);
    res.status(201).json({ message: '註冊成功', userId: result.id });
  } catch (err) {
    console.error('註冊失敗錯誤:', err);
    res.status(400).json({ error: err.message });
  }
};
