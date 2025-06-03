// backend/server.js

// npm install cors
const express = require('express');
const session = require('express-session');
const cors = require('cors');  // 加入 cors

const app = express();
const PORT = process.env.PORT || 3000;

// 引入 db.js
const database = require('./db');
const { generateCaptcha } = require('./captcha'); // ✅



// 白名單
const allowedOrigins = [
  'http://localhost:8080',
  'http://127.0.0.1:5500'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
// app.use(cors(
//   {
//   origin: 'http://localhost:8080',   // 前端 Vue 的網址
//   credentials: true                  // ⚠️ 必須要開啟 cookie 傳遞功能
//   },
// ));
// app.use(cors());

app.use(session({
  secret: process.env.SESSION_SECRET || 'MySuperSecret123!@#',
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());



// 路由
app.get('/', (req, res) => {
  res.send('Hello from backend with MySQL!');
});

// 測試書籍
app.get('/books', (req, res) => {
  database.query('SELECT * FROM T_book', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// 取得全部商品資料
app.get('/products', (req, res) => {
  database.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).json({ error: '查詢失敗', details: err });
    res.json(results);
  });
});

// 測試驗證碼：產生
app.get('/api/captcha', (req, res) => {
  const captcha = generateCaptcha();
  req.session.captcha = captcha.text;
  res.type('svg');
  res.send(captcha.data);
});

// 測試驗證碼：比對
app.post('/api/verify-captcha', (req, res) => {
  const userCaptcha = req.body.captcha;
  const sessionCaptcha = req.session.captcha;

  // 將 sessionCaptcha 顛倒順序
  // const reversedCaptcha = sessionCaptcha?.split('').reverse().join('');

  const isValid = userCaptcha &&
                  sessionCaptcha &&
                  userCaptcha.trim().toLowerCase() === sessionCaptcha.toLowerCase();
  // const isValid = userCaptcha &&
  //                 reversedCaptcha &&
  //                 userCaptcha.trim().toLowerCase() === reversedCaptcha.toLowerCase();

  res.json({
    success: isValid,
    message: isValid ? '驗證成功' : '驗證碼錯誤'
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
