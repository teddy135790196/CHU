// backend/src/main/controller/memberSettingController.js

const memberSettingService = require('../service/memberSettingService');

exports.selectUserSettingData = async (req, res) => {
  try {
    const result = await memberSettingService.selectUserSettingData(req.params);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('查詢使用者設定錯誤:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};