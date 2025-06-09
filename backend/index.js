// backend/index.js

// npm install cors
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


// src/connection/_index.js：引入資料庫連線模組（只載入，別用 app.use(db)）
const db = require('./src/connection/_index');


// 引入拆出來的 middleware(每次請求時執行的函式)
const corsMiddleware = require('./src/utils/cors');
app.use(corsMiddleware);
const sessionMiddleware = require('./src/utils/session');
app.use(sessionMiddleware);


// 讓後端能接收 JSON 格式的請求（主要用於 POST/PUT）
app.use(express.json());
// src/routes/_index.js：一次掛載所有路由(一定要在express.json()之後)
app.use('/', require('./src/routes/_index'));



// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
