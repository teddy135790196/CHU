// src/api.js
import axios from 'axios';
import router from './router'; // 載入 router 以便攔截器中導航

// 設定正確的 API 基礎 URL
const BASE_URL = process.env.VUE_APP_BACKEND_URL || 
  (process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000' 
    : 'https://bookstore-backend-production.up.railway.app');

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 請求攔截器：自動帶 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('API 請求:', config.method?.toUpperCase(), config.url, config.data);
  return config;
});


// 響應攔截器：管理者：遇到 401 清除資料並跳登入頁
// api.js 響應攔截器中的錯誤處理
api.interceptors.response.use(
  response => {
    console.log('API 回應:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('API 錯誤:', error.config?.url, error.response?.status, error.message);
    
    if (error.response && error.response.status === 401) {
      alert('登入過期，請重新登入');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');

      // ✅ 避免 NavigationDuplicated 錯誤
      if (router.currentRoute.path !== '/admin') {
        router.push('/admin');
      }
    }
    return Promise.reject(error);
  }
);


export default api;

