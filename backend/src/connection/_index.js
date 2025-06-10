require('dotenv').config();

// ✅ 加入 fallback 預設值
const dbType = process.env.DB_TYPE || 'railway';

let db;

switch (dbType) {
  case 'azure':
    db = require('./azureConfig');
    break;

  case 'railway':
  case 'mysql':
    db = require('./railwayConfig');
    break;

  default:
    throw new Error(`❌ Unknown DB_TYPE: ${dbType}`);
}

setTimeout(() => {
  console.log(`✅【目前選用資料庫】${dbType}`);
}, 1000);

module.exports = db;




