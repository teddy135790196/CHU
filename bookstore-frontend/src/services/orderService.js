import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // ✅ 使用 proxy 轉發，不要寫完整網址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const orderService = {
  createOrder(orderData) {
    return api.post('/orders', orderData);
  },
  getOrder(orderId) {
    return api.get(`/orders/${orderId}`);
  },
  getUserOrders(userId) {
    return api.get(`/orders/user/${userId}`);
  }
};