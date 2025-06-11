// backend/src/main/model/loginModel.js

const loginDAO = require('../dao/loginDAO');

function findUserByUsername(loginDto, callback) {
  loginDAO.selectLogin(loginDto.username, callback);
}

module.exports = {
  findUserByUsername,
};
