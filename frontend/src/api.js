// src/api.js
import axios from 'axios';
import router from './router'; // 載入 router 以便攔截器中導航

const BASE_URL = process.env.VUE_APP_BACKEND_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
});

// 請求攔截器：自動帶 token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// 響應攔截器：管理者：遇到 401 清除資料並跳登入頁
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      alert('登入過期，請重新登入');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      router.push('/admin');  // 用 router 導航
    }
    return Promise.reject(error);
  }
);

export default api;
