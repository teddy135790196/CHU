// backend/src/main/service/loginService.js

const LoginDTO = require('../dto/loginDTO');
const loginModel = require('../model/loginModel');
// HASH插件
const bcrypt = require('bcrypt');

function selectLoginUsername(loginForm) {
	return new Promise((resolve, reject) => {
		// 宣告 DTO
		const dto = new LoginDTO({
			username: loginForm.username,
			password: loginForm.password,
		});

		loginModel.selectLoginUsername(dto, async (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			if (!result) {
				reject(new Error('帳號不存在'));
				return;
			}

			// 密碼比對（bcrypt）
			const ismatch = await bcrypt.compare(dto.password, result.password);
			if (!ismatch) {
				reject(new Error('密碼錯誤'));
				return;
			}

			// 登入成功回傳部分資料
			resolve({
				id: result.id,
				username: result.username,
				message: '登入成功',
			})
		});
	});
};

module.exports = {
	selectLoginUsername,
};