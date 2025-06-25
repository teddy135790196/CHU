// backend/src/main/service/loginService.js

const LoginDTO = require('../dto/loginDTO');
const loginModel = require('../model/loginModel');
const bcrypt = require('bcrypt');	// HASH 插件

function selectLoginUsername(loginForm) {
  return new Promise((resolve, reject) => {
    const dto = new LoginDTO(loginForm);

    loginModel.selectLoginUsername(dto, async (err, result) => {
      if (err) return reject(err);
      if (!result) return reject(new Error('帳號不存在'));

      const isMatch = await bcrypt.compare(dto.password, result.password);
      if (!isMatch) return reject(new Error('密碼錯誤'));

      // 登入成功後，更新登入時間
      loginModel.updateLastLoginTime(result.user_id, (updateErr) => {
        if (updateErr) {
          console.error('更新登入時間失敗:', updateErr);
          // 不影響登入流程，只記錄錯誤
        }

        resolve({
          id: result.user_id,
          username: result.username,
          message: '登入成功',
        });
      });
    });
  });
}


module.exports = {
  selectLoginUsername,
};
