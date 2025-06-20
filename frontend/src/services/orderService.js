// services/orderService.js
import apiClient from '@/api'; // 匯入統一設定的 axios 實例

export const orderService = {
  /**
   * 創建新訂單
   * @param {Object} orderData 訂單內容（顧客資訊、購物車、總金額）
   * @returns {Promise} Axios Promise
   */
  createOrder(orderData) {
    // 注意：因為 baseURL 已經在 apiClient 中設定好了，
    // 這裡的路徑應該是相對於 baseURL 的路徑。
    // 根據您的後端路由，這裡可能需要是 '/api/orders' 或 '/orders'
    // 我先假設是 '/orders'，如果出錯可以輕易調整。
    return apiClient.post('/orders', orderData);
  },

  /**
   * 查詢特定訂單內容
   * @param {number} orderId 訂單 ID
   * @returns {Promise} Axios Promise
   */
  getOrder(orderId) {
    return apiClient.get(`/orders/${orderId}`);
  },

  /**
   * 查詢某用戶的所有訂單
   * @param {number|string} userId 用戶 ID
   * @returns {Promise} Axios Promise
   */
  getUserOrders(userId) {
    return apiClient.get(`/orders/user/${userId}`);
  }
};
