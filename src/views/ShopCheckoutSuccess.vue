<template>
  <div class="container py-5">
    <div class="row">
      <!-- Left Column: Order Information -->
      <div class="col-md-6 mb-4 mb-md-0">
        <!-- Order Information Block -->
        <div class="card shadow-sm h-100">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">訂單資訊</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="info-item">
                  <span class="label">訂單編號：</span>
                  <span class="value">{{ orderId }}</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="info-item">
                  <span class="label">訂單時間：</span>
                  <span class="value">{{ orderTime }}</span>
                </div>
              </div>
            </div>

            <!-- Customer Information -->
            <div class="card mb-3">
              <div class="card-header bg-light">
                <h5 class="mb-0">訂購人資料</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.user">
                    <div class="info-item">
                      <span class="label">訂購人：</span>
                      <span class="value">{{ orderData.user.name }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.user">
                    <div class="info-item">
                      <span class="label">聯絡電話：</span>
                      <span class="value">{{ orderData.user.tel }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.user">
                    <div class="info-item">
                      <span class="label">信箱：</span>
                      <span class="value">{{ orderData.user.email }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.user">
                    <div class="info-item">
                      <span class="label">地址：</span>
                      <span class="value">{{ orderData.user.address }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment and Delivery Information -->
            <div class="card mb-3">
              <div class="card-header bg-light">
                <h5 class="mb-0">付款與運送資訊</h5>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.payment">
                    <div class="info-item">
                      <span class="label">付款方式：</span>
                      <span class="value">{{ orderData.payment }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.delivery">
                    <div class="info-item">
                      <span class="label">運送方式：</span>
                      <span class="value">{{ orderData.delivery.delivery_method }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.delivery">
                    <div class="info-item">
                      <span class="label">貨運公司：</span>
                      <span class="value">{{ orderData.delivery.carrier }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.delivery">
                    <div class="info-item">
                      <span class="label">預估重量：</span>
                      <span class="value">{{ orderData.delivery.estimated_weight }} kg</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3" v-if="orderData && orderData.delivery">
                    <div class="info-item">
                      <span class="label">運費：</span>
                      <span class="value">NT$ {{ orderData.delivery.shipping_fee }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="card shadow-sm mb-3" v-if="orderData && orderData.items && orderData.items.length > 0">
              <div class="card-header bg-light">
                <h5 class="mb-0">商品明細</h5>
              </div>
              <div class="card-body bg-light-subtle">
                <div class="table-responsive">
                  <table class="table table-hover">
                    <thead class="table-light">
                      <tr>
                        <th>商品名稱</th>
                        <th class="text-center">數量</th>
                        <th class="text-end">單價</th>
                        <th class="text-end">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in orderData.items" :key="item.id">
                        <td>{{ item.name }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td class="text-end">NT$ {{ item.price }}</td>
                        <td class="text-end">NT$ {{ item.subtotal }}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" class="text-end"><strong>商品總額：</strong></td>
                        <td class="text-end">NT$ {{ calculateItemsTotal() }}</td>
                      </tr>
                      <tr>
                        <td colspan="3" class="text-end"><strong>運費：</strong></td>
                        <td class="text-end">NT$ {{ orderData.delivery.shipping_fee }}</td>
                      </tr>
                      <tr class="table-primary">
                        <td colspan="3" class="text-end"><strong>總金額：</strong></td>
                        <td class="text-end"><strong>NT$ {{ orderData.totalAmount }}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Success Message -->
      <div class="col-md-6">
        <div v-if="isOrderSubmitted" class="card shadow-sm success-container h-100 d-flex flex-column align-items-center justify-content-center p-4">
          <div class="card-body text-center">
            <div class="success-icon mb-4">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <h2 class="mb-3 text-success">訂單已成功送出！</h2>
            <p class="text-muted mb-4">感謝您的購買，我們會盡快處理您的訂單</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="d-flex justify-content-center gap-3">
          <button 
            class="btn btn-primary btn-lg px-5" 
            @click="submitOrder"
            :disabled="isOrderSubmitted"
          >
            <i class="bi bi-check-circle me-2"></i>訂單送出
          </button>
          <button 
            v-if="isOrderSubmitted"
            class="btn btn-success btn-lg px-5" 
            @click="$router.push('/')"
          >
            <i class="bi bi-house-door me-2"></i>返回首頁
          </button>
          <button 
            v-if="isOrderSubmitted"
            class="btn btn-outline-primary btn-lg px-5" 
            @click="$router.push('/cart')"
          >
            <i class="bi bi-cart me-2"></i>繼續購物
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopCheckoutSuccess',
  data() {
    return {
      orderId: '',
      orderTime: '',
      orderData: null,
      isOrderSubmitted: false
    }
  },
  created() {
    this.orderId = this.$route.params.orderId || this.$route.query.orderId || 'N/A';

    const storedOrderData = sessionStorage.getItem('latestOrderData');
    if (storedOrderData) {
      try {
        this.orderData = JSON.parse(storedOrderData);
        console.log('訂單數據：', this.orderData); // 用於調試

        if (this.orderData.createdAt) {
          this.orderTime = new Date(this.orderData.createdAt).toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        } else {
          this.orderTime = new Date().toLocaleString('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });
        }
      } catch (error) {
        console.error('解析訂單數據失敗：', error);
      }
    } else {
      this.orderTime = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }
  },
  methods: {
    submitOrder() {
      this.isOrderSubmitted = true;
      sessionStorage.removeItem('latestOrderData');
    },
    calculateItemsTotal() {
      if (!this.orderData || !this.orderData.items) return 0;
      return this.orderData.items.reduce((total, item) => {
        return total + item.subtotal;
      }, 0);
    }
  }
}
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
/* ... 其他樣式 ... */
</style>

<style scoped>
.success-container {
  background: #f8f9fa;
  border-radius: 12px;
  animation: fadeIn 0.5s ease-out;
  position: sticky;
  top: 20px;
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
  animation: scaleIn 0.5s ease-out;
}

.success-icon i {
  animation: bounce 1s ease infinite;
}

.info-item {
  margin-bottom: 0.5rem;
}

.label {
  font-weight: 500;
  color: #6c757d;
  margin-right: 0.5rem;
}

.value {
  color: #2c3e50;
  font-weight: 500;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-primary {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.btn-primary:hover {
  background-color: #0b5ed7;
  border-color: #0a58ca;
  transform: translateY(-1px);
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  background-color: #157347;
  border-color: #146c43;
  transform: translateY(-1px);
}

.btn-outline-primary {
  color: #0d6efd;
  border-color: #0d6efd;
}

.btn-outline-primary:hover {
  background-color: #0d6efd;
  color: white;
  transform: translateY(-1px);
}

.table > :not(caption) > * > * {
  padding: 1rem;
}

.table tfoot tr:last-child td {
  border-bottom: none;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .success-container {
    position: static;
    margin-top: 2rem;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .d-flex {
    flex-direction: column;
  }
  
  .gap-3 {
    gap: 1rem !important;
  }
}
</style> 