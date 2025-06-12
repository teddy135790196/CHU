// backend/src/main/dao/loginDAO.js

const db = require('../../connection/_index');

function selectLogin(loginForm, callback) {		// loginForm => 前端傳來的表單
	const sql = `
		SELECT * FROM users 
		WHERE username = ? 
		LIMIT 1
	`;

	const params = [
		loginForm.username,
	];

	db.query(sql, params, (err, results) => {
		if (err) return callback(err, null);
		if (results.length === 0) return callback(null, null);
		callback(null, results[0]);
	});
}

module.exports = {
	selectLogin,
};

