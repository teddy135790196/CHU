// backend/src/main/model/loginModel.js

const loginDAO = require('../dao/loginDAO');

function selectLoginUsername(loginForm, callback) {	  // loginForm => 前端傳來的表單
  loginDAO.selectLoginUsername(loginForm.username, callback);
};

module.exports = {
  selectLoginUsername,
};