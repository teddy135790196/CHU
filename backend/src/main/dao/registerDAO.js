// backend/src/main/dao/registerDAO.js

const db = require('../../connection/_index');

// 自訂函式名稱
function insertRegister(user, callback) {
	// 執行SQL語法(資料表名稱：users 擷取欄位)
	const sql = `
		INSERT INTO users (username, password, nickname, gender, birth, email, phone, registration_time)
		VALUES (?, ?, ?, ?, ?, ?, ?, CONVERT_TZ(NOW(), @@session.time_zone, '+08:00'))
	`;

	// 一個資料 對 一個 ?
	const params = [
		user.username,
		user.password,
		user.nickname,
		user.gender,
		user.birth,
		user.email,
		user.phone,
	];

	// 固定寫法
	db.query(sql, params, (err, result) => {
		// 有錯誤，就立刻呼叫上層 callback，並中斷函式（用 return）
		if (err) {
			// callback將資料丟給呼叫該方法的對象
			callback(err, null);
			return;
		}
		// 結構原則：「錯誤為第一參數、資料為第二參數」
		callback(null, { id: result.insertId });
	});
}

module.exports = {
	insertRegister,
};
