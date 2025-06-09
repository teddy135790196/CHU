// src/main/model/loginModel.js

const loginDAO = require('../dao/loginDAO');

function findUserByUsername(loginDto, callback) {
  loginDAO.findByUsername(loginDto.username, callback);
}

module.exports = {
  findUserByUsername,
};
