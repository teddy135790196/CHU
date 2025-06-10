// backend/src/main/service/loginService.js

const LoginDTO = require('../dto/loginDTO');
const loginModel = require('../model/loginModel');
// HASH插件
const bcrypt = require('bcrypt');

async function loginUser(loginData) {
	return new Promise((resolve, reject) => {
		// const dto = new LoginDTO(loginData);
		const dto = new LoginDTO({
			username: loginData.username,
			password: loginData.password,
		});

		loginModel.findUserByUsername(dto, async (err, user) => {
			if (err) return reject(err);
			if (!user) return reject(new Error('帳號不存在'));



			// 密碼比對（bcrypt）
			const match = await bcrypt.compare(dto.password, user.password);
			if (!match) return reject(new Error('密碼錯誤'));

			// 登入成功回傳部分資料
			resolve({
				id: user.id,
				username: user.username,
				message: '登入成功',
			});
		});
	});
}

module.exports = {
	loginUser,
};
