// const db = require('../../connection/azureConfig');
const db = require('../../connection/railwayConfig');

function insertUser(user, callback) {
  const sql = `
    INSERT INTO users (username, password_hash, nickname, gender, birth_date, email, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    user.username,
    user.password,     // 先直接存明文到 password_hash，後面再加密
    user.nickname,
    user.gender,
    user.birth,
    user.email,
    user.phone
  ];

  db.query(sql, params, (err, result) => {
    if (err) return callback(err, null);
    callback(null, { id: result.insertId });
  });
}

module.exports = {
  insertUser,
};
