// services/orderService.js
import api from '@/api.js';

export const orderService = {
  /**
   * 創建新訂單
   * @param {Object} orderData 訂單內容（顧客資訊、購物車、總金額）
   * @returns {Promise} Axios Promise
   */
  createOrder(orderData) {
    return api.post('/api/orders', orderData);
  },

  /**
   * 查詢特定訂單內容
   * @param {number} orderId 訂單 ID
   * @returns {Promise} Axios Promise
   */
  getOrder(orderId) {
    return api.get(`/api/orders/${orderId}`);
  },

  /**
   * 查詢某用戶的所有訂單
   * @param {number|string} userId 用戶 ID
   * @returns {Promise} Axios Promise
   */
  getUserOrders(userId) {
    return api.get(`/api/orders/user/${userId}`);
  },

  /**
   * 刪除訂單
   * @param {string} orderId 訂單 ID
   * @returns {Promise} Axios Promise
   */
  deleteOrder(orderId) {
    return api.delete(`/api/orders/${orderId}`);
  },

  /**
   * 取得所有訂單（管理員用）
   * @returns {Promise} Axios Promise
   */
  getAllOrders() {
    return api.get('/api/orders');
  },

  /**
   * 取得所有訂單明細（管理員用）
   * @returns {Promise} Axios Promise
   */
  getAllOrderDetails() {
    return api.get('/api/orders/details');
  },

  /**
   * 取得所有商品資訊（管理員用）
   * @returns {Promise} Axios Promise
   */
  getAllProducts() {
    return api.get('/api/orders/products');
  }
}; 
