// src/main/route/captcha.js

const express = require('express');
const router = express.Router();
const { generateCaptcha } = require('../service/captchaService');


// 產生驗證碼(/api/captcha)
router.get('/', (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha.text;
  res.type('svg');
  res.send(captcha.data);
});

// 驗證驗證碼(/api/captcha/verify)
router.post('/verify', (req, res) => {
  const userCaptcha = req.body.captcha;
  const sessionCaptcha = req.session.captcha;

  const isValid = userCaptcha &&
    sessionCaptcha &&
    userCaptcha.trim().toLowerCase() === sessionCaptcha.toLowerCase();

  res.json({
    success: isValid,
    message: isValid ? '驗證成功' : '驗證碼錯誤'
  });
});

module.exports = router;
