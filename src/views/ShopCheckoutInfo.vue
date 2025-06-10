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
            <div class="form-section mb-4">
              <h4 class="section-title mb-3">基本資料</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">訂購人姓名</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="form.user.name"
                    required
                    placeholder="請輸入姓名"
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="email" class="form-label">訂購人信箱</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.user.email"
                    required
                    placeholder="請輸入信箱"
                  >
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="tel" class="form-label">訂購人電話</label>
                  <input
                    type="text"
                    class="form-control"
                    id="tel"
                    v-model="form.user.tel"
                    required
                    placeholder="請輸入電話"
                  >
                </div>
                <div class="col-md-6 mb-3">
                  <label for="address" class="form-label">訂購人地址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="address"
                    v-model="form.user.address"
                    required
                    placeholder="請輸入地址"
                  >
                </div>
              </div>
            </div>

            <div class="form-section mb-4">
              <h4 class="section-title mb-3">訂單資訊</h4>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="shipping" class="form-label">取貨方式</label>
                  <select
                    class="form-select"
                    id="shipping"
                    v-model="form.shipping"
                    required
                  >
                    <option value="">請選擇取貨方式</option>
                    <option value="自取">自取</option>
                    <option value="外送">外送</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="pay" class="form-label">付款方式</label>
                  <select
                    class="form-select"
                    id="pay"
                    v-model="form.pay"
                    required
                  >
                    <option value="">請選擇付款方式</option>
                    <option value="信用卡">信用卡</option>
                    <option value="現金">現金</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-section mb-4">
              <h4 class="section-title mb-3">備註</h4>
              <textarea
                class="form-control"
                id="message"
                v-model="form.message"
                rows="3"
                placeholder="如有特殊需求請在此備註"
              ></textarea>
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
export default {
  name: 'ShopCheckoutInfo',
  data() {
    return {
      isLoading: false,
      form: {
        user: {
          name: '',
          tel: '',
          email: '',
          address: ''
        },
        message: '',
        shipping: '',
        pay: '',
        items: []
      }
    }
  },
  created() {
    // 從 localStorage 讀取購物車資料
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.form.items = JSON.parse(cartItems);
    }
  },
  methods: {
    addOrder() {
      if (this.form.items.length === 0) {
        alert('購物車是空的！');
        return;
      }

      // 基本驗證
      if (!this.form.user.name || !this.form.user.email || !this.form.user.tel || 
          !this.form.user.address || !this.form.shipping || !this.form.pay) {
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
      console.log('開始提交訂單...');
      
      // 模擬訂單提交成功
      setTimeout(() => {
        try {
          const orderId = 'ORDER' + Date.now();
          console.log('訂單提交成功，訂單號：', orderId);
          
          // 清空購物車
          localStorage.removeItem('cartItems');
          
          // 跳轉到成功頁面
          this.$router.push({
            path: '/checkout-success',
            query: { orderId: orderId }
          }).catch(err => {
            console.error('路由跳轉失敗：', err);
            alert('頁面跳轉失敗，請稍後重試');
          });
        } catch (error) {
          console.error('訂單處理過程發生錯誤：', error);
          alert('訂單處理失敗，請稍後重試');
        } finally {
          this.isLoading = false;
        }
      }, 1000);
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
}

.checkout-header {
  margin-bottom: 2rem;
}

.checkout-header h2 {
  color: #2c3e50;
  font-weight: 600;
  font-size: 2rem;
}

.checkout-header p {
  color: #6c757d;
  font-size: 1.1rem;
}

.section-title {
  color: #2c3e50;
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
  background-color: #007bff;
  border-color: #007bff;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: white;
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