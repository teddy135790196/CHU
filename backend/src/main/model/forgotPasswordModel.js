const forgotPasswordDAO = require('../dao/forgotPasswordDAO');

function checkUserExists(email, callback) {
  forgotPasswordDAO.checkUserExists(email, callback);
}

module.exports = {
  checkUserExists
}; 