// backend/src/main/route/registerCheckRoute.js

const express = require('express');
const router = express.Router();
const registerCheckController = require('../controller/registerCheckController');

// 檢查帳號是否存在 (/api/register/check/username)
router.get('/username', registerCheckController.checkUsername);

// 檢查郵箱是否存在 (/api/register/check/email)
router.get('/email', registerCheckController.checkEmail);

module.exports = router;
