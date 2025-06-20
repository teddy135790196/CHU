// backend/src/main/dao/registerDAO.js

const db = require('../../connection/_index');

function insertRegisterData(registerForm, callback) {	// registerForm => 前端傳來的表單

	// 執行SQL語法(資料表名稱：users 擷取欄位)
	const sql = `
		INSERT INTO users (username, password, nickname, gender, birth, email, phone, summary, registration_time)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, CONVERT_TZ(NOW(), @@session.time_zone, '+08:00'))
	`;

	// 一個資料 對 一個 ?
	// user.名稱 為前端form表單參數名稱(待驗證)
	const params = [
		registerForm.username,
		registerForm.password,
		registerForm.nickname,
		registerForm.gender,
		registerForm.birth,
		registerForm.email,
		registerForm.phone,
		registerForm.summary,
	];

	// 固定寫法(裡面的兩個callback功能未搞清)
	db.query(sql, params, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, { id: result.insertID });
	});
}

module.exports = {
	insertRegisterData,
};