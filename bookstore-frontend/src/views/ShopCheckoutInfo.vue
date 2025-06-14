/* eslint-disable */
<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="checkout-card">
          <div class="checkout-header text-center mb-5">
            <h2 class="mb-3">訂單資訊</h2>
            <p class="text-muted">請填寫以下資訊以完成訂單</p>
          </div>
          <form @submit.prevent="addOrder" class="checkout-form">
            <!-- 訂購人資料 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">訂購人資料</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">姓名</label>
                  <input type="text" class="form-control" id="name" v-model="form.user.name" required placeholder="請輸入姓名">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="tel" class="form-label">電話</label>
                  <input type="text" class="form-control" id="tel" v-model="form.user.tel" required placeholder="請輸入電話">
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="email" v-model="form.user.email" required placeholder="請輸入信箱">
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">地址</label>
                <input type="text" class="form-control" id="address" v-model="form.user.address" required placeholder="請輸入地址">
              </div>
            </div>

            <!-- 付款方式 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">付款方式</h4>
              <div class="mb-3">
                <select class="form-select" id="pay" v-model="form.pay" required>
                  <option value="">請選擇付款方式</option>
                  <option value="信用卡">信用卡</option>
                  <option value="現金">現金</option>
                </select>
              </div>
            </div>

            <!-- 運送資訊 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">運送資訊</h4>
              <div class="mb-3">
                <label for="delivery_id" class="form-label">運送編號</label>
                <input
                  type="text"
                  class="form-control"
                  id="delivery_id"
                  v-model="form.delivery.delivery_id"
                  required
                  placeholder="請輸入運送編號"
                >
              </div>
              <div class="mb-3">
                <label for="delivery_method" class="form-label">運送方式</label>
                <select
                  class="form-select"
                  id="delivery_method"
                  v-model="form.delivery.delivery_method"
                  required
                >
                  <option value="">請選擇運送方式</option>
                  <option value="陸運">陸運</option>
                  <option value="海運">海運</option>
                  <option value="空運">空運</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="carrier" class="form-label">貨運公司</label>
                <select
                  class="form-select"
                  id="carrier"
                  v-model="form.delivery.carrier"
                  required
                >
                  <option value="">請選擇貨運公司</option>
                  <option value="大發">大發</option>
                  <option value="六崧">六崧</option>
                </select>
              </div>
               <div class="mb-3">
                <label for="estimated_weight" class="form-label">重量</label>
                <input
                  type="number"
                  class="form-control"
                  id="estimated_weight"
                  v-model.number="form.delivery.estimated_weight"
                  required
                  placeholder="請輸入重量"
                >
              </div>
               <div class="mb-3">
                <label for="shipping_fee" class="form-label">運費</label>
                <input
                  type="number"
                  class="form-control"
                  id="shipping_fee"
                  v-model.number="form.delivery.shipping_fee"
                  required
                  placeholder="運費將根據運送方式"
                  readonly
                >
              </div>
            </div>

        

            <div class="d-flex justify-content-between align-items-center mt-5">
              <button type="button" class="btn btn-outline-primary" @click="$router.push('/cart')">
                <i class="bi bi-arrow-left me-2"></i>返回購物車
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                確認訂單
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { draftOrderService } from '@/services/draftOrderService';

export default {
  name: 'ShopCheckoutInfo',
  data() {
    return {
      isLoading: false,
      draftId: null,
      autoSaveTimer: null,
      form: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: ''
        },
        message: '',
        pay: '',
        items: [],
        delivery: {
          delivery_id: '',
          delivery_method: '',
          carrier: '',
          estimated_weight: null,
          shipping_fee: null
        }
      }
    }
  },
  created() {
    // 從 localStorage 讀取購物車資料
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.form.items = JSON.parse(cartItems);
    }

    // 檢查是否有暫存的訂單
    this.checkDraftOrder();
  },
  mounted() {
    // 設置自動保存
    this.setupAutoSave();
  },
  beforeDestroy() {
    // 清除自動保存計時器
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
    }
  },
  methods: {
    calculateShippingFee() {
      switch (this.form.delivery.delivery_method) {
        case '陸運':
          this.form.delivery.shipping_fee = 60;
          break;
        case '海運':
          this.form.delivery.shipping_fee = 120;
          break;
        case '空運':
          this.form.delivery.shipping_fee = 300;
          break;
        default:
          this.form.delivery.shipping_fee = null;
      }
    },
    setupAutoSave() {
      // 每5分鐘自動保存一次
      this.autoSaveTimer = setInterval(() => {
        this.saveDraft();
      }, 5 * 60 * 1000);
    },

    async checkDraftOrder() {
      try {
        // 從 URL 參數中獲取草稿 ID
        const draftId = this.$route.query.draftId;
        if (draftId) {
          const response = await draftOrderService.getDraft(draftId);
          const draftData = response.data;
          
          // 恢復草稿資料
          this.draftId = draftId;
          this.form = {
            ...this.form,
            ...draftData.form_data
          };
        }
      } catch (error) {
        console.error('獲取草稿訂單失敗：', error);
      }
    },

    async saveDraft() {
      if (this.form.items.length === 0) return;

      try {
        const draftData = {
          cart_data: this.form.items,
          form_data: {
            user: this.form.user,
            message: this.form.message,
            pay: this.form.pay,
            delivery: this.form.delivery
          },
          status: 'draft',
          last_updated: new Date().toISOString()
        };

        if (this.draftId) {
          // 更新現有草稿
          await draftOrderService.updateDraft(this.draftId, draftData);
        } else {
          // 創建新草稿
          const response = await draftOrderService.saveDraft(draftData);
          this.draftId = response.data.draftId;
        }
      } catch (error) {
        console.error('保存草稿失敗：', error);
      }
    },

    async addOrder() {
      if (this.form.items.length === 0) {
        alert('購物車是空的！');
        return;
      }

      // 基本驗證
      if (!this.form.user.name || !this.form.user.email || !this.form.user.tel || 
          !this.form.user.address || !this.form.delivery.delivery_method || !this.form.delivery.carrier || !this.form.delivery.estimated_weight || !this.form.pay) {
        alert('請填寫所有必填欄位！');
        return;
      }

      // 電話號碼格式驗證
      const phoneNumber = /^(09)[0-9]{8}$/;
      if (!phoneNumber.test(this.form.user.tel)) {
        alert('請輸入正確的手機號碼格式！');
        return;
      }

      this.isLoading = true;
      
      try {
        // 處理購物車項目，確保每個項目都有正確的計算
        const processedItems = this.form.items.map(item => ({
          id: item.id,
          name: item.itemName,
          price: item.price,
          quantity: item.count,
          subtotal: item.price * item.count
        }));

        // 計算商品總額
        const itemsTotal = processedItems.reduce((total, item) => total + item.subtotal, 0);

        // 準備訂單數據
        const orderData = {
          user: this.form.user,
          items: processedItems,
          payment: this.form.pay,
          message: this.form.message,
          totalAmount: itemsTotal + (this.form.delivery.shipping_fee || 0),
          status: 'pending',
          createdAt: new Date().toISOString(),
          delivery: this.form.delivery
        };

        // 將完整的訂單數據存入 sessionStorage，供 ShopCheckoutSuccess.vue 使用
        sessionStorage.setItem('latestOrderData', JSON.stringify(orderData));

        // 如果有草稿，刪除它
        if (this.draftId) {
          await draftOrderService.deleteDraft(this.draftId);
        }

        // 清空購物車
        localStorage.removeItem('cartItems');
        
        // 跳轉到成功頁面 (實際提交由 ShopCheckoutSuccess.vue 處理)
        this.$router.push({
          path: '/checkout-success'
        }).catch(err => {
          console.error('路由跳轉失敗：', err);
          alert('頁面跳轉失敗，請稍後重試');
        });

      } catch (error) {
        console.error('訂單處理過程發生錯誤：', error);
        alert('準備訂單資料失敗，請稍後重試');
      } finally {
        this.isLoading = false;
      }
    },

    calculateTotal() {
      return this.form.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    }
  },
  watch: {
    // 監聽表單變化，自動保存
    'form': {
      handler() {
        // 檢查必要的欄位是否存在
        if (this.form.user && this.form.message !== undefined && this.form.pay !== undefined && this.form.items && this.form.delivery) {
           this.saveDraft();
        }
      },
      deep: true
    },
    // 監聽運送方式變化，計算運費
    'form.delivery.delivery_method': {
      handler() {
        this.calculateShippingFee();
      },
      immediate: true // 組件創建時立即執行一次
    }
  }
}
</script>

<style scoped>
.checkout-card {
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #c41e3a;
}

.checkout-header {
  margin-bottom: 2rem;
}

.checkout-header h2 {
  color: #c41e3a;
  font-weight: 600;
  font-size: 2rem;
}

.checkout-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.section-title {
  color: #c41e3a;
  font-weight: 500;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 1.5rem;
}

.form-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
}

.form-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-section:nth-child(1) {
  background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
  border-left: 4px solid #007bff;
}

.form-section:nth-child(2) {
  background: linear-gradient(to bottom right, #ffffff, #f8f9fa);
  border-left: 4px solid #28a745;
}

.form-label {
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.75rem;
  display: block;
}

.form-control, .form-select {
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 0.75rem;
  transition: all 0.3s ease;
  background-color: #ffffff;
}

.form-control:focus, .form-select:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.15);
  background-color: #ffffff;
}

.btn-primary {
  background-color: #c41e3a;
  border-color: #c41e3a;
  color: #fff;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #a01830;
  border-color: #a01830;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-outline-primary {
  color: #c41e3a;
  border-color: #c41e3a;
  background: #fff;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background: #c41e3a;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

textarea {
  resize: none;
  min-height: 100px;
}

@media (max-width: 768px) {
  .checkout-card {
    padding: 1rem;
  }
  
  .form-section {
    padding: 1rem;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .d-flex {
    flex-direction: column;
  }
}
</style>