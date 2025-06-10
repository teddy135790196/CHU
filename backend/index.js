// backend/index.js

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔍 Debug 用：監控所有 app.use 呼叫
// const originalUse = app.use;
// app.use = function (...args) {
//   try {
//     console.log('🟡 app.use called with:', args[0]);
//   } catch (err) {
//     console.log('❗ error printing app.use args');
//   }
//   return originalUse.apply(this, args);
// };

// 1. 資料庫連線（只引入，不用 app.use）
const db = require('./src/connection/_index');

// 2. 安全中間件
const { limiter, securityHeaders } = require('./src/middlewares/security');
app.use(securityHeaders);
app.use(limiter);

// ✅ 這行很關鍵（部署在 Railway 要啟用 proxy trust）
app.set('trust proxy', 1);

// 3. Middleware：CORS + Session
const corsMiddleware = require('./src/middlewares/cors');
app.use(corsMiddleware);

const sessionMiddleware = require('./src/middlewares/session');
app.use(sessionMiddleware);

// 4. 處理 JSON 請求
app.use(express.json());

// 5. 掛載 API 路由
app.use('/api', require('./src/routes/_index')); // ⚠️ 改為 /api 路徑以區分 API 與前端頁面

// 6. 靜態前端檔案（Vue 打包產物 frontend/dist）
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// 7. SPA fallback：所有未命中 API 的路徑都回傳 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

// 8. 全局錯誤處理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 9. 啟動伺服器
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});


