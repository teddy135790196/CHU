const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔍 Debug 用：監控所有 app.use 呼叫
const originalUse = app.use;
app.use = function (...args) {
  try {
    console.log('🟡 app.use called with:', args[0]);
  } catch (err) {
    console.log('❗ error printing app.use args');
  }
  return originalUse.apply(this, args);
};

// 1. 資料庫連線（只引入，不用 app.use）
const db = require('./src/connection/_index');

// 2. Middleware：CORS + Session
const corsMiddleware = require('./src/middlewares/cors');
app.use(corsMiddleware);

const sessionMiddleware = require('./src/middlewares/session');
app.use(sessionMiddleware);

// 3. 處理 JSON 請求
app.use(express.json());

// 4. 掛載 API 路由
app.use('/api', require('./src/routes/_index')); // ⚠️ 改為 /api 路徑以區分 API 與前端頁面

// 5. 靜態前端檔案（Vue 打包產物 frontend/dist）
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// 6. SPA fallback：所有未命中 API 的路徑都回傳 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// 7. 啟動伺服器
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


