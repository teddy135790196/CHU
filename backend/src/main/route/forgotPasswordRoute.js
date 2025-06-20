const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../controller/forgotPasswordController');

// 處理忘記密碼請求 (/api/forgot-password)
router.post('/', forgotPasswordController.sendResetEmail);

module.exports = router; 