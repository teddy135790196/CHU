<template>
  <div class="container py-5">
    <div class="checkout-card">
      <div class="checkout-header text-center mb-4">
        <h2 class="mb-3">填寫訂單資訊</h2>
        <p class="text-muted">請填寫以下資訊以完成您的訂單</p>
      </div>

      <div class="row">
        <div class="col-md-8">
          <form @submit.prevent="addOrder">
            <!-- 訂購人資料 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">訂購人資料</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">姓名 *</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="form.user.name"
                    required
                    placeholder="請輸入您的姓名"
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="tel" class="form-label">電話 *</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="tel"
                    v-model="form.user.tel"
                    required
                    placeholder="例：0912345678"
                  >
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">電子郵箱 *</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.user.email"
                  required
                  placeholder="請輸入您的電子郵箱"
                >
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">地址 *</label>
                <textarea
                  class="form-control"
                  id="address"
                  v-model="form.user.address"
                  required
                  placeholder="請輸入詳細地址"
                  rows="3"
                ></textarea>
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
                  <option value="轉帳">銀行轉帳</option>
                </select>
              </div>
            </div>

            <!-- 運送資訊 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">運送資訊</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="delivery_method" class="form-label">運送方式 *</label>
                  <select
                    class="form-select"
                    id="delivery_method"
                    v-model="form.delivery.delivery_method"
                    required
                    @change="calculateShippingFee"
                  >
                    <option value="">請選擇運送方式</option>
                    <option value="陸運">陸運 - $60</option>
                    <option value="海運">海運 - $120</option>
                    <option value="空運">空運 - $300</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="carrier" class="form-label">貨運公司 *</label>
                  <select
                    class="form-select"
                    id="carrier"
                    v-model="form.delivery.carrier"
                    required
                  >
                    <option value="">請選擇貨運公司</option>
                    <option value="大發">大發</option>
                    <option value="六崧">六崧</option>
                    <option value="黑貓">黑貓宅急便</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="estimated_weight" class="form-label">預估重量 (kg) *</label>
                  <input
                    type="number"
                    class="form-control"
                    id="estimated_weight"
                    v-model.number="form.delivery.estimated_weight"
                    required
                    placeholder="請輸入預估重量"
                    min="0.1"
                    step="0.1"
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="shipping_fee" class="form-label">運費</label>
                  <input
                    type="number"
                    class="form-control"
                    id="shipping_fee"
                    v-model.number="form.delivery.shipping_fee"
                    readonly
                    placeholder="將根據運送方式自動計算"
                  >
                </div>
              </div>
            </div>

            <!-- 備註 -->
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">備註</h4>
              <div class="mb-3">
                <textarea
                  class="form-control"
                  v-model="form.message"
                  placeholder="如有特殊需求請在此填寫"
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-5">
              <button type="button" class="btn btn-outline-primary" @click="$router.push('/shoppingCart')">
                <i class="bi bi-arrow-left me-2"></i>返回購物車
              </button>
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                確認訂單
              </button>
            </div>
          </form>
        </div>

        <!-- 訂單摘要 -->
        <div class="col-md-4">
          <div class="order-summary-checkout">
            <h5 class="summary-title">訂單摘要</h5>
            <div class="summary-content">
              <div v-for="item in form.items" :key="item.id" class="summary-item-detail">
                <span class="item-name">{{ item.itemName }}</span>
                <span class="item-quantity">x{{ item.count }}</span>
                <span class="item-price">${{ item.price * item.count }}</span>
              </div>
              <hr>
              <div class="summary-item">
                <span>商品總額</span>
                <span>${{ itemsTotal }}</span>
              </div>
              <div class="summary-item">
                <span>運費</span>
                <span>${{ form.delivery.shipping_fee || 0 }}</span>
              </div>
              <div class="summary-total">
                <strong>總計</strong>
                <strong>${{ itemsTotal + (form.delivery.shipping_fee || 0) }}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { draftOrderService } from '@/services/draftOrderService';

export default {
  name: 'CheckoutInfoView',
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
  computed: {
    itemsTotal() {
      return this.form.items.reduce((total, item) => total + (item.price * item.count), 0);
    }
  },
  created() {
    // 從 localStorage 讀取購物車資料
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.form.items = JSON.parse(cartItems);
    } else {
      alert('購物車是空的，請先添加商品！');
      this.$router.push('/shoppingCart');
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

    async addOrder() {
      if (this.form.items.length === 0) {
        alert('購物車是空的！');
        return;
      }

      // 基本驗證
      if (!this.form.user.name || !this.form.user.email || !this.form.user.tel || 
          !this.form.user.address || !this.form.delivery.delivery_method || 
          !this.form.delivery.carrier || !this.form.delivery.estimated_weight || !this.form.pay) {
        alert('請填寫所有必填欄位！');
        return;
      }

      // 電話號碼格式驗證
      const phoneNumber = /^(09)[0-9]{8}$/;
      if (!phoneNumber.test(this.form.user.tel)) {
        alert('請輸入正確的手機號碼格式（例：0912345678）！');
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

        // 將完整的訂單數據存入 sessionStorage
        sessionStorage.setItem('latestOrderData', JSON.stringify(orderData));

        // 清空購物車
        localStorage.removeItem('cartItems');
        // 手動觸發 storage 事件來通知 HeaderArea 更新購物車徽章
        window.dispatchEvent(new Event('storage'));
        
        // 跳轉到確認頁面（避免重複導航）
        if (this.$route.path !== '/checkout-success') {
          this.$router.push('/checkout-success');
        }

      } catch (error) {
        console.error('訂單處理過程發生錯誤：', error);
        alert('準備訂單資料失敗，請稍後重試');
      } finally {
        this.isLoading = false;
      }
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
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.form-control:focus, .form-select:focus {
  border-color: #c41e3a;
  box-shadow: 0 0 0 0.2rem rgba(196, 30, 58, 0.25);
}

.order-summary-checkout {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  padding: 1.5rem;
  border: 1px solid #c41e3a;
  position: sticky;
  top: 2rem;
}

.summary-title {
  color: #c41e3a;
  font-weight: bold;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
}

.summary-item-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.item-name {
  flex: 1;
  margin-right: 1rem;
}

.item-quantity {
  color: #6c757d;
  margin-right: 1rem;
}

.item-price {
  font-weight: 500;
  color: #c41e3a;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #6c757d;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
  color: #2c3e50;
  font-size: 1.1rem;
}

.summary-total strong {
  color: #c41e3a;
}

.btn-primary {
  background-color: #c41e3a;
  border-color: #c41e3a;
}

.btn-primary:hover {
  background-color: #a01830;
  border-color: #a01830;
}

.btn-outline-primary {
  color: #c41e3a;
  border-color: #c41e3a;
}

.btn-outline-primary:hover {
  background-color: #c41e3a;
  border-color: #c41e3a;
}

@media (max-width: 768px) {
  .checkout-card {
    padding: 1rem;
  }
  
  .order-summary-checkout {
    position: static;
    margin-top: 2rem;
  }
}
</style> 
