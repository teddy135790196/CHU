<template>
  <div class="container py-5">
    <h2 class="mb-4">查詢訂單</h2>
    <form @submit.prevent="fetchOrder">
      <div class="input-group mb-3">
        <input v-model="orderId" type="text" class="form-control" placeholder="請輸入訂單編號" required>
        <button type="submit" class="btn btn-primary">查詢</button>
      </div>
    </form>

    <div v-if="order" class="card mt-4">
      <div class="card-body">
        <h5 class="card-title">訂單詳細內容</h5>
        <p><strong>姓名：</strong> {{ order.customer_name }}</p>
        <p><strong>Email：</strong> {{ order.email }}</p>
        <p><strong>地址：</strong> {{ order.address }}</p>
        <p><strong>總金額：</strong> ${{ order.total_price }}</p>
        <p><strong>商品清單：</strong></p>
        <ul>
          <li v-for="(item, index) in order.items" :key="index">
            {{ item.name }} x {{ item.quantity }} - ${{ item.price * item.quantity }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="notFound" class="alert alert-warning mt-3">
      查無此訂單，請確認訂單編號。
    </div>
  </div>
</template>

<script>
import { orderService } from '../services/orderService';

export default {
  name: 'OrderQuery',
  data() {
    return {
      orderId: '',
      order: null,
      notFound: false
    };
  },
  methods: {
    async fetchOrder() {
      try {
        const response = await orderService.getOrder(this.orderId);
        this.order = {
          ...response.data,
          items: JSON.parse(response.data.items)
        };
        this.notFound = false;
      } catch (error) {
        console.error('查詢失敗：', error);
        this.order = null;
        this.notFound = true;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
