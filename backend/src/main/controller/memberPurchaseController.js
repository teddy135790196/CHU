// backend/src/main/controller/orderAllController.js

const orderService = require('../service/memberPurchaseService');

exports.getOrdersByUserId = async (req, res) => {
  const userId = req.params.userId;  // 從路由參數拿 userId
  try {
    console.log('Controller userId:', userId);
    const orders = await orderService.getOrdersByUserId(userId);
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.log('Controller userId:', userId);
    console.error('取得訂單錯誤：', err);
    res.status(500).json({ success: false, message: '取得訂單失敗' });
  }
};
