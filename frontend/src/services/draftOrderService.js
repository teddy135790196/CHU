import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

export const draftOrderService = {
  // 保存草稿訂單
  saveDraft(draftData) {
    return axios.post(`${API_URL}/draft-orders`, draftData);
  },

  // 更新草稿訂單
  updateDraft(draftId, draftData) {
    return axios.put(`${API_URL}/draft-orders/${draftId}`, draftData);
  },

  // 獲取草稿訂單
  getDraft(draftId) {
    return axios.get(`${API_URL}/draft-orders/${draftId}`);
  },

  // 獲取用戶的所有草稿訂單
  getUserDrafts(userId) {
    return axios.get(`${API_URL}/draft-orders/user/${userId}`);
  },

  // 刪除草稿訂單
  deleteDraft(draftId) {
    return axios.delete(`${API_URL}/draft-orders/${draftId}`);
  }
}; 