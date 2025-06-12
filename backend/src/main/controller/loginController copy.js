// backend/src/main/controller/loginController.js

const loginService = require('../service/loginService');

exports.loginUser = async (req, res) => {
  try {
    const result = await loginService.loginUser(req.body);  // req.body => 前端傳來的表單
    // 200 請求成功。常用於查詢、登入、更新資料
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    // 400 用戶端的請求格式錯誤，伺服器拒絕處理
    res.status(400).json({ success: false, message: err.message });
  }
};


