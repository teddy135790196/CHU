// backend/index.js

// npm install cors
const express = require('express');
const session = require('express-session');
const cors = require('cors');  // 加入 cors

const app = express();
const PORT = process.env.PORT || 3000;


// 白名單
const allowedOrigins = [
  'http://localhost:8080',
  'http://127.0.0.1:5500'
];

app.use(cors({    // 測試多網址
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// app.use(cors(    // 正式上線版
//   {
//   origin: 'http://localhost:8080',   // 前端 Vue 的網址
//   credentials: true                  // ⚠️ 必須要開啟 cookie 傳遞功能
//   },
// ));
// app.use(cors()); // 全部允許(但不確定能不能讓前端傳資料)



// 管理使用者的 Session（登入、驗證碼、購物車等暫存）
app.use(session({
  secret: process.env.SESSION_SECRET || 'MySuperSecret123!@#',
  resave: false,
  saveUninitialized: true
}));

// 讓後端能接收 JSON 格式的請求（主要用於 POST/PUT）
app.use(express.json());



// 路由導入
app.get('/', (req, res) => res.send('Hello from backend with MySQL!'));



app.use('/azureDB', require('./src/routes/dbAzureRoute'));
app.use('/railwayDB', require('./src/routes/dbRailwayRoute'));

app.use('/api/captcha', require('./src/routes/captcha'));
app.use('/api/register', require('./src/routes/registerRoute'));



// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
