const db = require('../../connection/_index');

function checkUserExists(email, callback) {
  const sql = 'SELECT user_id FROM users WHERE email = ?';
  
  db.query(sql, [email], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    // 如果找到用戶，返回 true，否則返回 false
    const userExists = rows.length > 0;
    callback(null, userExists);
  });
}

module.exports = {
  checkUserExists
}; 