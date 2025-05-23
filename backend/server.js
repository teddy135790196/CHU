// backend/server.js
const express = require('express');
const app = express();
const PORT = 3000;

// 測試路由
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
