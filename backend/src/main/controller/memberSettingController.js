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

exports.updateUserSettingInfo = async (req, res) => {
  try {
    const formData = {
      ...req.body,
      id: req.params.id,
    };

    // 轉換 birth 格式，只取年月日
    if (formData.birth) {
      formData.birth = formData.birth.slice(0, 10);
    }

    const result = await memberSettingService.updateUserSettingInfo(formData);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('更新個人資料錯誤:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateUserSettingContact = async (req, res) => {
  try {
    const formData = {
      ...req.body,
      id: req.params.id,
    };

    const result = await memberSettingService.updateUserSettingContact(formData);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error('更新聯絡資料錯誤:', err);
    res.status(400).json({ success: false, message: err.message });
  }
};