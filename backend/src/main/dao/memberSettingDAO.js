// backend/src/main/dao/memberSettingDAO.js

const db = require('../../connection/_index');

function selectUserSettingData(userForm, callback) {
	const sql = `
		SELECT user_id AS id, nickname, gender, birth, summary, email, phone, address
		FROM users
		WHERE user_id = ?
		LIMIT 1
	`;

	const params = [userForm.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, result[0]);
	});
}

module.exports = {
	selectUserSettingData,
};