// backend/src/main/model/loginModel.js

const loginDAO = require('../dao/loginDAO');

function findUserByUsername(loginForm, callback) {	  // loginForm => 前端傳來的表單
  loginDAO.selectLogin(loginForm.username, callback);
}

module.exports = {
  findUserByUsername,
};
