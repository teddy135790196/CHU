// services/draftOrderService.js
import apiClient from '@/api'; // 匯入統一設定的 axios 實例

export const draftOrderService = {
  // 保存草稿訂單
  saveDraft(draftData) {
    // baseURL 已經在 apiClient 中設定好了
    return apiClient.post('/draft-orders', draftData);
  },

  // 更新草稿訂單
  updateDraft(draftId, draftData) {
    return apiClient.put(`/draft-orders/${draftId}`, draftData);
  },

  // 獲取草稿訂單
  getDraft(draftId) {
    return apiClient.get(`/draft-orders/${draftId}`);
  },

  // 獲取用戶的所有草稿訂單
  getUserDrafts(userId) {
    return apiClient.get(`/draft-orders/user/${userId}`);
  },

  // 刪除草稿訂單
  deleteDraft(draftId) {
    return apiClient.delete(`/draft-orders/${draftId}`);
  }
};
