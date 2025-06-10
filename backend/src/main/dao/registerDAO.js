// backend/src/main/dao/registerDAO.js

const db = require('../../connection/_index');

function insertRegister(user, callback) {
  const sql = `
    INSERT INTO users (username, password, nickname, gender, birth, email, phone, registration_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, CONVERT_TZ(NOW(), @@session.time_zone, '+08:00'))
  `;

  const params = [
    user.username,
    user.password,
    user.nickname,
    user.gender,
    user.birth,
    user.email,
    user.phone,
  ];

  db.query(sql, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id: result.insertId });
  });
}

module.exports = {
  insertRegister,
};
