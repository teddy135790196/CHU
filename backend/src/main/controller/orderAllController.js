// backend/src/main/controller/orderAllController.js

const orderService = require('../service/orderAllService');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    console.error('取得訂單錯誤：', err);
    res.status(500).json({ success: false, message: '取得訂單失敗' });
  }
};
