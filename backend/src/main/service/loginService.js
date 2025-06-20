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

      resolve({
        id: result.user_id,
        username: result.username,
        message: '登入成功',
      });
    });
  });
}

module.exports = {
  selectLoginUsername,
};
