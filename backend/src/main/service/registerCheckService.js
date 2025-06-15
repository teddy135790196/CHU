// backend/src/main/service/registerCheckService.js

const registerCheckModel = require('../model/registerCheckModel');

// 檢查帳號是否存在
async function checkUsername(username) {
	return new Promise((resolve, reject) => {
		registerCheckModel.checkUsername(username, (err, exists) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(exists);
		});
	});
}

// 檢查郵箱是否存在
function checkEmail(email){
	return new Promise((resolve, reject) => {
		registerCheckModel.checkEmail(email, (err, exists) => {
			if(err){
				reject(err);
				return;
			}
			resolve(exists);
		});
	});
}

module.exports = {
	checkUsername,
	checkEmail,
};