// backend/src/main/service/registerService.js

const registerModel = require('../model/registerModel');
const registerDTO = require('../dto/registerDTO');
// HASH插件
const bcrypt = require('bcrypt');

async function insertRegisterData(registerForm) {		// registerForm => 前端傳來的表單
	// 1. 簡單驗證
	if(registerForm.password !== registerForm.repassword) {
		throw new Error('兩次密碼輸入不一致');
	}

	// 2. 密碼加密
	const hashedPassword = await bcrypt.hash(registerForm.password, 10);

	// 3. 建立 DTO，密碼用加密後的
	// const dto = new registerDTO({
	// 	...registerForm,
	// 	password: hashedPassword,
	// });
	const dto = new registerDTO({
		username: registerForm.username,
		password: hashedPassword,	// 用加密後的密碼
		repassword: registerForm.repassword,
		nickname: registerForm.nickname,
		gender: registerForm.gender,
		birth: registerForm.birth,
		email: registerForm.email,
		phone: registerForm.phone,
		summary: registerForm.summary,
	});

	// 4. 呼叫 model 層建立帳號（model 內呼叫 dao）
	return new Promise((resolve, reject) => {
		registerModel.insertRegisterData(dto, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		})
	})
};

module.exports = {
	insertRegisterData,
};