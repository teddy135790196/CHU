// backend/src/connection/_index.js

// 根據.env設定自動選擇資料庫
require('dotenv').config();

let db;

switch (process.env.DB_TYPE) {
  case 'azure':
    db = require('./azureConnection');
    break;
  case 'railway':
    db = require('./railwayConnection');
    break;
  case 'alwaysdata':
    db = require('./alwaysdataConnection');
    break;
  default:
    throw new Error(`找不到 ${process.env.DB_TYPE} 資料庫`);
}

// 顯示選擇的資料庫
setTimeout(() => {
  console.log(`【目前選用資料庫】 ${process.env.DB_TYPE}`);
}, 2000);

module.exports = db;
