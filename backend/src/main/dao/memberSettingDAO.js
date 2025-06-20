// backend/src/main/dao/memberSettingDAO.js

const db = require('../../connection/_index');

function selectUserSettingData(userForm, callback) {
	const sql = `
		SELECT user_id AS id, nickname, gender, birth, summary, email, phone, address, isEmailVerified
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

function updateUserSettingInfo(userForm, callback) {
	const sql = `
    UPDATE users 
    SET nickname = ?, gender = ?, birth = ?, summary = ?
    WHERE user_id = ?
  `;
	const params = [userForm.nickname, userForm.gender, userForm.birth, userForm.summary, userForm.id];

	db.query(sql, params, (err, result) => {
		if (err) return callback(err, null);
		callback(null, result);
	});
}


function updateUserSettingContact(userForm, callback) {
	const sql = `
    UPDATE users 
    SET email = ?, phone = ?, address = ?
    WHERE user_id = ?
  `;
	const params = [userForm.email, userForm.phone, userForm.address, userForm.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			callback(err, null);
			return;
		}
		callback(null, result);
	});
}

module.exports = {
	selectUserSettingData,
	updateUserSettingInfo,
	updateUserSettingContact,
};