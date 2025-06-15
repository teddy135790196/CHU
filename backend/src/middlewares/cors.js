// backend/src/middlewares/cors.js

const cors = require('cors');

const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'http://localhost:5173',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8081',
  'http://127.0.0.1:5500',
  'https://chu-frontend-production.up.railway.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// app.use(cors(    // 正式上線版
//   {
//   origin: 'http://localhost:8080',   // 前端 Vue 的網址
//   credentials: true                  // ⚠️ 必須要開啟 cookie 傳遞功能
//   },
// ));
// app.use(cors()); // 全部允許(但不確定能不能讓前端傳資料)

module.exports = cors(corsOptions);
