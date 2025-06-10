import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

// 註冊相關的服務
export const authService = {
  // 註冊新用戶
  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, userData, {
        withCredentials: true // 確保發送 cookie
      });
      
      return response.data;
    } catch (error) {
      console.error('註冊服務器錯誤:', error.response ? error.response.data : error.message);
      throw new Error('註冊失敗：' + (error.response ? error.response.data.message : error.message));
    }
  },

  // 驗證用戶名
  validateUsername(username) {
    if (!username) {
      return '請輸入帳號';
    }
    if (username.length < 3) {
      return '帳號長度至少3個字符';
    }
    return '';
  },

  // 驗證密碼
  validatePassword(password) {
    if (!password) {
      return '請輸入密碼';
    }
    if (password.length < 6) {
      return '密碼長度至少6個字符';
    }
    return '';
  },

  // 驗證確認密碼
  validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword) {
      return '請確認密碼';
    }
    if (password !== confirmPassword) {
      return '兩次輸入的密碼不一致';
    }
    return '';
  },

  // 驗證電子郵件
  validateEmail(email) {
    if (!email) {
      return '請輸入電子郵件';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '請輸入有效的電子郵件地址';
    }
    return '';
  },

  // 驗證手機號碼
  validatePhone(phone) {
    if (!phone) {
      return '請輸入電話號碼';
    }
    const phoneRegex = /^09\d{8}$/;
    if (!phoneRegex.test(phone)) {
      return '請輸入有效的手機號碼';
    }
    return '';
  },

  // 驗證生日
  validateBirthday(birthday) {
    if (!birthday) {
      return '請選擇生日';
    }
    return '';
  },

  // 驗證暱稱
  validateNickname(nickname) {
    if (!nickname) {
      return '請輸入暱稱';
    }
    return '';
  },

  // 驗證圖片驗證碼 (永遠通過)
  validateCaptcha(captcha) {
    // 在此處不執行實際驗證，始終返回空字符串表示通過
    console.log('圖片驗證碼輸入：', captcha);
    return '';
  }
}; 