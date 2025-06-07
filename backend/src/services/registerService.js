// src/services/registerService.js

const RegisterDTO = require('../models/dto/registerDTO');
const RegisterModel = require('../models/registerModel');
// HASH插件
const bcrypt = require('bcrypt');

async function registerUser(registerData) {
	// 1. 簡單驗證
	if (registerData.password !== registerData.repassword) {
		throw new Error('兩次密碼輸入不一致');
	}

	// 2. 密碼加密
	const hashedPassword = await bcrypt.hash(registerData.password, 10);

	// 3. 建立 DTO，密碼用加密後的
	//   const dto = new RegisterDTO({
	//     ...registerData,
	//     password: hashedPassword,
	//   });
	const dto = new RegisterDTO({
		username: registerData.username,
		password: hashedPassword,  // 用加密後的密碼
		repassword: registerData.repassword,
		nickname: registerData.nickname,
		gender: registerData.gender,
		birth: registerData.birth,
		email: registerData.email,
		phone: registerData.phone,
	});

	// 4. 呼叫 model 層建立帳號（model 內呼叫 dao）
	return new Promise((resolve, reject) => {
		RegisterModel.createRegister(dto, (err, result) => {
			if (err) return reject(err);
			resolve(result);
		});
	});
}

module.exports = {
	registerUser,
};
