import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
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
