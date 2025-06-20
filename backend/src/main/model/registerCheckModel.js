// backend/src/main/model/registerCheckModel.js

const registerCheckDAO = require('../dao/registerCheckDAO');

function checkUsername(username, callback) {
	registerCheckDAO.checkUsername(username, callback);
}

function checkEmail(email, callback){
	registerCheckDAO.checkEmail(email, callback);
}

module.exports = {
	checkUsername,
	checkEmail,
};