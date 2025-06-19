// backend/src/main/route/memberSettingRoute.js

const express = require('express');
const router = express.Router();
const memberSettingController = require('../controller/memberSettingController');

router.get('/:id', memberSettingController.selectUserSettingData);

// 修改資料
router.put('/:id/info', memberSettingController.updateUserSettingInfo);
router.put('/:id/contact', memberSettingController.updateUserSettingContact);

module.exports = router;
