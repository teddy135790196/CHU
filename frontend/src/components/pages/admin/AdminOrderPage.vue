<template>
  <div class="container">
    <!-- 訂單統計區域，傳入 orders 與 orderDetails 資料 -->
    <OrderStatisticsArea :orders="orders" :orderDetails="orderDetails" />
    <!-- 訂單列表區域，顯示訂單明細 -->
    <OrderTableArea :orders="orders" :orderDetails="orderDetails" />
  </div>
</template>

<script>
// 匯入兩個子元件：訂單統計區塊與訂單表格區塊
import OrderStatisticsArea from '@/components/areas/admin/OrderStatisticsArea.vue'
import OrderTableArea from '@/components/areas/admin/OrderTableArea.vue'

export default {
  name: 'AdminOrderPage',
  components: {
    OrderStatisticsArea,
    OrderTableArea,
  },
  data() {
    return {
      // 訂單基本資料（例如訂單編號、會員、時間等）
      orders: [],
      // 每筆訂單對應的訂單明細列表（以 order_id 分組）
      orderDetails: {},
    };
  },
  mounted() {
    // 元件掛載後，自動載入訂單資料
    this.fetchOrders();
  },
  methods: {
    // 非同步方法，用來一次載入訂單、明細與商品資料
    async fetchOrders() {
      try {
        // 同時向三個 API 發送請求，並使用解構方式取得回應
        const [oRes, dRes, pRes] = await Promise.all([
          this.$axios.get('/api/azureDB/orders'),        // 訂單主資料
          this.$axios.get('/api/azureDB/orders_query'),  // 訂單明細資料
          this.$axios.get('/api/azureDB/products'),      // 商品資料（包含書名）
        ]);

        // 將訂單主資料設給 orders
        this.orders = oRes.data;

        // 建立 ISBN 對應書名的對照表（map）
        const isbnMap = Object.fromEntries(
          pRes.data.map(p => [p.ISBN_id, p.name])
        );

        // 加工訂單明細，加入書名（若無對應書名，則標示為「未知書名」）
        const raw = dRes.data.map(i => ({
          ...i,   // 寫入本來的資料
          book_name: isbnMap[i.ISBN_id] || '(未知書名)',
        }));

        // 根據 order_id 將訂單明細分類成一個物件
        // 結構類似：{ 1: [item1, item2], 2: [item3], ... }
        this.orderDetails = raw.reduce((acc, item) => {
          // 若 acc[item.order_id] 尚未存在則先設為空陣列
          (acc[item.order_id] = acc[item.order_id] || []).push(item);
          return acc;
        }, {});
      } catch (e) {
        // 發生錯誤時印出錯誤資訊到主控台
        console.error('讀取錯誤', e);
      }
    }
  }
}
</script>
