// services/orderService.js
import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'  // 本地開發用
  : 'https://bookstore-backend-production.up.railway.app/api'; // 雲端部署用

// 創建 axios 實例
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 請求攔截器
api.interceptors.request.use(
  config => {
    console.log('發送請求:', config.url, config.data);
    return config;
  },
  error => {
    console.error('請求錯誤:', error);
    return Promise.reject(error);
  }
);

// 響應攔截器
api.interceptors.response.use(
  response => {
    console.log('收到響應:', response.data);
    return response;
  },
  error => {
    console.error('響應錯誤:', error);
    return Promise.reject(error);
  }
);

export const orderService = {
  /**
   * 創建新訂單
   * @param {Object} orderData 訂單內容（顧客資訊、購物車、總金額）
   * @returns {Promise} Axios Promise
   */
  createOrder(orderData) {
    return api.post('/orders', orderData);
  },

  /**
   * 查詢特定訂單內容
   * @param {number} orderId 訂單 ID
   * @returns {Promise} Axios Promise
   */
  getOrder(orderId) {
    return api.get(`/orders/${orderId}`);
  },

  /**
   * 查詢某用戶的所有訂單
   * @param {number|string} userId 用戶 ID
   * @returns {Promise} Axios Promise
   */
  getUserOrders(userId) {
    return api.get(`/orders/user/${userId}`);
  }
}; 