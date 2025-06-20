// backend/src/main/model/emailVerificationModel.js

const emailVerificationDAO = require('../dao/emailVerificationDAO');

function findUserByEmail(email, callback) {
  emailVerificationDAO.findUserByEmail(email, callback);
}

function updateUserVerificationToken(userId, token, expires, callback) {
  emailVerificationDAO.updateUserVerificationToken(userId, token, expires, callback);
}

function findUserByToken(token, callback) {
  emailVerificationDAO.findUserByToken(token, callback);
}

function verifyUserEmail(token, callback) {
  emailVerificationDAO.verifyUserEmail(token, callback);
}

module.exports = {
  findUserByEmail,
  updateUserVerificationToken,
  findUserByToken,
  verifyUserEmail,
};
