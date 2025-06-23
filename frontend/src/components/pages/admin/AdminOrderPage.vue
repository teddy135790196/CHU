<template>
  <div class="container">
    <OrderStatisticsArea :orders="orders" :orderDetails="orderDetails" />
    <OrderTableArea :orders="orders" :orderDetails="orderDetails" />
  </div>
</template>

<script>
import OrderStatisticsArea from '@/components/areas/admin/OrderStatisticsArea.vue'
import OrderTableArea from '@/components/areas/admin/OrderTableArea.vue'

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
        const [oRes, dRes, pRes] = await Promise.all([
          this.$axios.get('/api/azureDB/orders'),
          this.$axios.get('/api/azureDB/orders_query'),
          this.$axios.get('/api/azureDB/products'),
        ]);

        this.orders = oRes.data;
        const isbnMap = Object.fromEntries(pRes.data.map(p => [p.ISBN_id, p.name]));

        const raw = dRes.data.map(i => ({
          ...i,
          book_name: isbnMap[i.ISBN_id] || '(未知書名)'
        }));

        this.orderDetails = raw.reduce((acc, item) => {
          (acc[item.order_id] = acc[item.order_id] || []).push(item);
          return acc;
        }, {});
      } catch (e) {
        console.error('讀取錯誤', e);
      }
    }
  }
}
</script>

<style scoped></style>
