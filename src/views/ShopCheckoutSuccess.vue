<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="success-container text-center">
          <div class="success-icon mb-4">
            <i class="bi bi-check-circle-fill"></i>
          </div>
          <h2 class="mb-3">訂單已成功送出！</h2>
          <p class="text-muted mb-4">感謝您的購買，我們會盡快處理您的訂單</p>
          
          <div class="order-info mb-5">
            <div class="info-card">
              <h4 class="mb-4">訂單資訊</h4>
              <div class="info-item">
                <span class="label">訂單編號：</span>
                <span class="value">{{ orderId }}</span>
              </div>
              <div class="info-item">
                <span class="label">訂單時間：</span>
                <span class="value">{{ orderTime }}</span>
              </div>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn-primary me-3" @click="$router.push('/')">
              <i class="bi bi-house-door me-2"></i>返回首頁
            </button>
            <button class="btn btn-outline-primary" @click="$router.push('/cart')">
              <i class="bi bi-cart me-2"></i>繼續購物
            </button>
          </div>
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
      orderTime: ''
    }
  },
  created() {
    // 從路由參數獲取訂單ID
    this.orderId = this.$route.params.orderId || 'ORDER' + Date.now();
    // 設置訂單時間
    this.orderTime = new Date().toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}
</script>

<style scoped>
.success-container {
  padding: 3rem 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 5rem;
  color: #28a745;
  animation: scaleIn 0.5s ease-out;
}

.success-icon i {
  animation: bounce 1s ease infinite;
}

.order-info {
  margin: 2rem 0;
}

.info-card {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  text-align: left;
}

.info-item {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
}

.info-item:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 500;
  color: #6c757d;
  width: 100px;
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
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
  transform: translateY(-1px);
}

.btn-outline-primary {
  color: #28a745;
  border-color: #28a745;
}

.btn-outline-primary:hover {
  background-color: #28a745;
  color: white;
  transform: translateY(-1px);
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

@media (max-width: 768px) {
  .success-container {
    padding: 2rem 1rem;
  }
  
  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    width: 100%;
  }
}
</style> 