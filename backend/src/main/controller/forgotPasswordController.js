const forgotPasswordService = require('../service/forgotPasswordService');

exports.sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || email.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: '請提供電子郵件地址' 
      });
    }

    const result = await forgotPasswordService.sendResetEmail(email);
    
    res.status(200).json({ 
      success: true, 
      message: '重設密碼連結已發送到您的電子郵件' 
    });
    
  } catch (err) {
    console.error('忘記密碼錯誤:', err);
    res.status(500).json({ 
      success: false, 
      message: '發送失敗，請稍後再試' 
    });
  }
}; 