// backend/src/main/dao/registerCheckDAO.js

const db = require('../../connection/_index');

// 查詢 username 是否存在
function checkUsername(username, callback) {
	const sql = `
		SELECT COUNT(*) AS count FROM users 
		WHERE username = ?
	`;

	const params = [
		username,
	];

	db.query(sql, params, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}

		callback(null, result[0].count > 0);
	});
}

// 查詢 email 是否存在
function checkEmail(email, callback) {
	const sql = `
		SELECT COUNT(*) AS count FROM users 
		WHERE email = ?
	`;

	const params = [
		email,
	];

	db.query(sql, params, (err, result) => {
		if(err){
			callback(err, null);
			return;
		}
		callback(null, result[0].count > 0);
	});
}

module.exports = {
	checkUsername,
	checkEmail,
};
