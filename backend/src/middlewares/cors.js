// src/middlewares/cors.js
const cors = require('cors');

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://127.0.0.1:5500',
  'https://chu-production.up.railway.app',
  // 添加您的生產環境域名
  process.env.FRONTEND_URL
].filter(Boolean); // 過濾掉 undefined 值

const corsOptions = {
  origin: function (origin, callback) {
    // 允許沒有 origin 的請求（如移動應用或 curl 請求）
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 預檢請求結果緩存 24 小時
};

// app.use(cors(    // 正式上線版
//   {
//   origin: 'http://localhost:8080',   // 前端 Vue 的網址
//   credentials: true                  // ⚠️ 必須要開啟 cookie 傳遞功能
//   },
// ));
// app.use(cors()); // 全部允許(但不確定能不能讓前端傳資料)

module.exports = cors(corsOptions);
