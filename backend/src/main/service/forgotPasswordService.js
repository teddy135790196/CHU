const forgotPasswordModel = require('../model/forgotPasswordModel');

async function sendResetEmail(email) {
  return new Promise((resolve, reject) => {
    // 檢查用戶是否存在
    forgotPasswordModel.checkUserExists(email, (err, userExists) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!userExists) {
        reject(new Error('該電子郵件地址未註冊'));
        return;
      }
      
      // 這裡可以實現實際的郵件發送邏輯
      // 例如使用 nodemailer 或其他郵件服務
      
      // 模擬郵件發送成功
      console.log(`模擬發送重設密碼郵件到: ${email}`);
      resolve({ success: true });
    });
  });
}

module.exports = {
  sendResetEmail
}; 