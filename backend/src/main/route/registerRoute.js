// backend/src/main/route/registerRoute.js

const express = require('express');
const router = express.Router();
const registerController = require('../controller/registerController');

// 處理 POST 請求 (/api/register)
router.post('/', registerController.insertRegisterData);

module.exports = router;