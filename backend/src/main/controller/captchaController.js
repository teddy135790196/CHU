const { generateCaptcha } = require("../service/captchaService")

exports.getCaptcha = (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha.text;
  res.type('svg');
  res.send(captcha.data);
};


exports.verifyCaptcha = (req, res) => {
  const userCaptcha = req.body.captcha;
  const sessionCaptcha = req.session.captcha;

  const isValid = userCaptcha &&
    sessionCaptcha &&
    userCaptcha.trim().toLowerCase() === sessionCaptcha.toLowerCase();

  res.json({
    success: isValid,
    message: isValid ? '驗證成功' : '驗證碼錯誤'
  });
};