// backend/src/main/dao/loginDAO.js

const db = require('../../connection/_index');

function selectLoginUsername(loginForm, callback) {
  const sql = `
    SELECT * FROM users
    WHERE username = ? OR email = ?
    LIMIT 1
  `;

  // 用同一個值對應 username 和 email
  const params = [loginForm.username, loginForm.username];

  db.query(sql, params, (err, result) => {
    if (err) return callback(err, null);
    if (result.length === 0) return callback(null, null);
    callback(null, result[0]);
  });
}

function updateLastLoginTime(userId, callback) {
  const sql = `UPDATE users SET lastLogin_time = NOW() WHERE user_id = ?`;
  db.query(sql, [userId], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}


module.exports = {
  selectLoginUsername,
  updateLastLoginTime,
};
