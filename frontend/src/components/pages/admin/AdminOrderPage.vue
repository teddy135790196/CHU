<template>
  <div class="container">
    <OrderStatisticsArea :orders="orders" :orderDetails="orderDetails" />
    <OrderTableArea 
      :orders="orders" 
      :orderDetails="orderDetails" 
      @order-deleted="handleOrderDeleted"
    />
  </div>
</template>

<script>
import OrderStatisticsArea from '@/components/areas/admin/OrderStatisticsArea.vue'
import OrderTableArea from '@/components/areas/admin/OrderTableArea.vue'
import { orderService } from '@/services/orderService'

export default {
  name: 'AdminOrderPage',
  components: { OrderStatisticsArea, OrderTableArea },
  data() {
    return {
      orders: [],
      orderDetails: {},
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const [ordersRes, orderDetailsRes, productsRes] = await Promise.all([
          orderService.getAllOrders(),
          orderService.getAllOrderDetails(),
          orderService.getAllProducts(),
        ]);

        this.orders = ordersRes.data;
        const isbnMap = Object.fromEntries(productsRes.data.map(p => [p.ISBN_id, p.name]));

        const raw = orderDetailsRes.data.map(i => ({
          ...i,
          book_name: isbnMap[i.ISBN_id] || '(未知書名)'
        }));

        this.orderDetails = raw.reduce((acc, item) => {
          (acc[item.order_id] = acc[item.order_id] || []).push(item);
          return acc;
        }, {});
      } catch (e) {
        console.error('讀取錯誤', e);
        alert('載入訂單資料失敗，請重新整理頁面');
      }
    },

    handleOrderDeleted(orderId) {
      console.log('訂單刪除事件：', orderId);
      // 重新載入訂單資料
      this.fetchOrders();
    }
  }
}
</script>

<style scoped></style>
