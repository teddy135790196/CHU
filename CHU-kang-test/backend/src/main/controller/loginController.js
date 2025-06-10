// backend/src/main/controller/loginController.js

const loginService = require('../service/loginService');

exports.loginUser = async (req, res) => {
  try {
    const result = await loginService.loginUser(req.body);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


