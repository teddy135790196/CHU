// backend/src/connection/_index.js

// 根據.env設定自動選擇資料庫
require('dotenv').config();

let db;

db = require('./railwayConnection');

// 顯示選擇的資料庫
setTimeout(() => {
  console.log(`【目前選用資料庫】 railway`);
}, 2000);

module.exports = db;
