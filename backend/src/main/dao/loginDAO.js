// backend/src/main/dao/loginDAO.js

const db = require('../../connection/_index');

function selectLoginUsername(loginForm, callback) {		// loginForm => 前端傳來的表單
	const sql = `
		SELECT * FROM users 
		WHERE username = ? 
		LIMIT 1 
	`;

	const params = [
		loginForm.username,
	];

	db.query(sql, params, (err, result) => {
		if(err) {
			callback(err, null);
			return;
		}
		if(result.length === 0) {
			callback(null, null);
			return;
		}
		callback(null, result[0]);
	});
};

module.exports = {
	selectLoginUsername,
};