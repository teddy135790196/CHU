// src/routes/loginRoute.js

const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// 處理 POST 請求
router.post('/', loginController.loginUser);

module.exports = router;
