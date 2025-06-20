// backend/src/main/dao/emailVerificationDAO.js

const db = require('../../connection/_index');

function findUserByEmail(email, callback) {
  const sql = `SELECT * FROM users WHERE email = ? LIMIT 1`;
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}

function updateUserVerificationToken(userId, token, expires, callback) {
  const sql = `
    UPDATE users 
    SET emailVerificationToken = ?, emailVerificationExpires = ? 
    WHERE user_id = ?
  `;
  db.query(sql, [token, expires, userId], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
}

function findUserByToken(token, callback) {
  const sql = `
    SELECT * FROM users 
    WHERE emailVerificationToken = ? 
      AND emailVerificationExpires > NOW() 
    LIMIT 1
  `;
  db.query(sql, [token], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}

function verifyUserEmail(token, callback) {
  const sql = `
    UPDATE users 
    SET isEmailVerified = 1, emailVerificationToken = NULL, emailVerificationExpires = NULL 
    WHERE emailVerificationToken = ?
  `;
  db.query(sql, [token], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
}

module.exports = {
  findUserByEmail,
  updateUserVerificationToken,
  findUserByToken,
  verifyUserEmail,
};
