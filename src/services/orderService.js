import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export const orderService = {
  // 創建新訂單
  createOrder(orderData) {
    return axios.post(`${API_URL}/orders`, orderData);
  },

  // 獲取訂單詳情
  getOrder(orderId) {
    return axios.get(`${API_URL}/orders/${orderId}`);
  },

  // 獲取用戶的所有訂單
  getUserOrders(userId) {
    return axios.get(`${API_URL}/orders/user/${userId}`);
  }
}; 