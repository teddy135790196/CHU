const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 明確允許前端網域
const corsOptions = {
  origin: "https://chu-frontend-production.up.railway.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// 測試
app.get("/", (req, res) => {
  res.send("✅ API 運作中");
});

// ✅ 訂單 API
app.post("/api/orders", (req, res) => {
  const {
    order_id,
    user_id,
    ISBN_id,
    delivery_id,
    user_name,
    user_tel,
    user_email,
    user_address,
    payment_method,
    message,
    delivery_method,
    carrier,
    estimated_weight,
    shipping_fee,
    total_amount,
    status
  } = req.body;

  const sql = `INSERT INTO orders (
    order_id, user_id, ISBN_id, delivery_id, user_name,
    user_tel, user_email, user_address, payment_method, message,
    delivery_method, carrier, estimated_weight, shipping_fee,
    total_amount, status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    order_id, user_id, ISBN_id, delivery_id, user_name,
    user_tel, user_email, user_address, payment_method, message,
    delivery_method, carrier, estimated_weight, shipping_fee,
    total_amount, status || 'pending'
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("❌ 訂單建立失敗：", err);
      return res.status(500).json({ message: "建立失敗" });
    }
    res.status(201).json({ message: "✅ 訂單建立成功", order_id });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
