<template>
  <div class="container py-5">
    <div class="checkout-card">
      <div class="checkout-header text-center mb-4">
        <h2 class="mb-3">確認訂單</h2>
        <p class="text-muted">請確認以下資訊，然後送出訂單</p>
      </div>

      <div v-if="!orderConfirmed">
        <!-- 訂購人資料 -->
        <div class="form-section mb-4">
          <h4 class="section-title mb-3">訂購人資料</h4>
          <p><strong>姓名：</strong> {{ order.user.name }}</p>
          <p><strong>電話：</strong> {{ order.user.tel }}</p>
          <p><strong>Email：</strong> {{ order.user.email }}</p>
          <p><strong>地址：</strong> {{ order.user.address }}</p>
        </div>

        <!-- 付款方式 -->
        <div class="form-section mb-4">
          <h4 class="section-title mb-3">付款方式</h4>
          <p>{{ order.payment }}</p>
        </div>

        <!-- 運送資訊 -->
        <div class="form-section mb-4" v-if="order.delivery">
          <h4 class="section-title mb-3">運送資訊</h4>
          <p><strong>運送方式：</strong> {{ order.delivery.delivery_method }}</p>
          <p><strong>貨運公司：</strong> {{ order.delivery.carrier }}</p>
          <p><strong>重量：</strong> {{ order.delivery.estimated_weight }} kg</p>
          <p><strong>運費：</strong> ${{ order.delivery.shipping_fee }}</p>
        </div>

        <!-- 商品清單 -->
        <div class="form-section mb-4">
          <h4 class="section-title mb-3">商品明細</h4>
          <ul>
            <li v-for="(item, index) in order.items" :key="index">
              {{ item.name || item.itemName }} x {{ item.quantity || item.count }} - ${{ (item.price * (item.quantity || item.count)) }}
            </li>
          </ul>
          <p class="mt-2"><strong>總金額：</strong> ${{ order.totalAmount }}</p>
        </div>

        <div class="text-center">
          <button @click="submitOrder" class="btn btn-primary">送出訂單</button>
        </div>
      </div>

      <div v-else class="alert alert-success text-center">
        <h2 class="mb-3">✅ 訂單已成功送出！</h2>
        <p><strong>訂單編號：</strong> {{ orderId }}</p>
        <router-link to="/" class="btn btn-outline-primary mt-3">返回首頁</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { orderService } from '@/services/orderService';

export default {
  name: 'CheckoutSuccessView',
  data() {
    return {
      order: {},
      orderId: null,
      orderConfirmed: false
    };
  },
  created() {
    const latestOrder = sessionStorage.getItem('latestOrderData');
    if (latestOrder) {
      this.order = JSON.parse(latestOrder);
    } else {
      alert('查無訂單資料，請重新下單');
      if (this.$route.path !== '/shoppingCart') {
        this.$router.push('/shoppingCart');
      }
    }
  },
  methods: {
    async submitOrder() {
      try {
        console.log('準備提交訂單數據:', this.order);
        const response = await orderService.createOrder(this.order);
        console.log('訂單提交成功:', response.data);
        this.orderId = response.data.orderId || Date.now();
        this.orderConfirmed = true;
        sessionStorage.removeItem('latestOrderData');
      } catch (err) {
        console.error('❌ 訂單送出失敗:', err);
        if (err.response) {
          console.error('錯誤詳情:', err.response.data);
          alert(`訂單送出失敗: ${err.response.data.error || '請稍後再試'}`);
        } else {
          alert('訂單送出失敗，請確認後端服務是否正常運行');
        }
      }
    }
  }
};
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
  border: 1px solid #e9ecef;
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
</style> 