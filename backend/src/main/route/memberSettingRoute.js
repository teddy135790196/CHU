// backend/src/main/route/memberSettingRoute.js

const express = require('express');
const router = express.Router();
const memberSettingController = require('../controller/memberSettingController');

router.get('/:id', memberSettingController.selectUserSettingData);

module.exports = router;