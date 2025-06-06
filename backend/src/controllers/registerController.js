// src/controllers/registerController.js

const registerModel = require('../models/registerModel');

exports.registerUser = (req, res) => {
  const registerDto = req.body;

  registerModel.createRegister(registerDto, (err, result) => {
    if (err) {
      console.error('註冊失敗錯誤:', err);
      return res.status(500).json({ error: '註冊失敗', detail: err.message });
    }

    res.status(201).json({ message: '註冊成功', userId: result.id });
  });
};
