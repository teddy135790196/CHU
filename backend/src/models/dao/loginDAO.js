// src/models/dao/loginDAO.js

const db = require('../../connection/_index');

function findByUsername(username, callback) {
  const sql = `
  SELECT * FROM users 
  WHERE username = ? 
  LIMIT 1
  `;

  db.query(sql, [username], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}

module.exports = {
  findByUsername,
};

