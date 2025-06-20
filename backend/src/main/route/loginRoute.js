// backend/src/main/route/loginRoute.js

const express = require('express');
const router = express.Router();
const loginController = require('../controller/loginController');

// 處理 POST 請求 (/api/login)
router.post('/', loginController.selectLoginUsername);

module.exports = router;