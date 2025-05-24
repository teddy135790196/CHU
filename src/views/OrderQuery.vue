<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-header bg-info text-white">
            <h4 class="mb-0">查詢訂單</h4>
          </div>
          <div class="card-body">
            <p class="card-text text-muted mb-4">請輸入以下任一資訊來查詢您的訂單。</p>

            <form @submit.prevent="queryOrder">
              <div class="row g-3 mb-4">
                <div class="col-md-6">
                  <label for="queryName" class="form-label">姓名</label>
                  <input type="text" class="form-control" id="queryName" v-model="query.name" placeholder="請輸入姓名">
                </div>
                <div class="col-md-6">
                  <label for="queryEmail" class="form-label">E-mail</label>
                  <input type="email" class="form-control" id="queryEmail" v-model="query.email" placeholder="請輸入信箱">
                </div>
                <div class="col-md-6">
                  <label for="queryOrderId" class="form-label">訂單編號</label>
                  <input type="text" class="form-control" id="queryOrderId" v-model="query.orderId" placeholder="請輸入訂單編號">
                </div>
                <div class="col-md-6">
                  <label for="queryDeliveryId" class="form-label">運送編號</label>
                  <input type="text" class="form-control" id="queryDeliveryId" v-model="query.deliveryId" placeholder="請輸入運送編號">
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">查詢</button>
              </div>
            </form>

            <!-- Query Result Area -->
            <div v-if="orderResult" class="mt-5">
              <h5 class="mb-4">查詢結果</h5>
              <div class="card border-success">
                <div class="card-header bg-success text-white">
                   訂單編號: {{ orderResult.orderId || 'N/A' }} | 訂單時間: {{ formatOrderTime(orderResult.createdAt) }}
                </div>
                <div class="card-body text-success">
                  <h6 class="card-title">訂購人資料</h6>
                  <p>姓名: {{ orderResult.user.name }}</p>
                  <p>電話: {{ orderResult.user.tel }}</p>
                  <p>信箱: {{ orderResult.user.email }}</p>
                  <p>地址: {{ orderResult.user.address }}</p>

                  <h6 class="card-title mt-4">付款與運送</h6>
                  <p>付款方式: {{ orderResult.payment }}</p>
                  <p>運送方式: {{ orderResult.delivery.delivery_method }}</p>
                  <p>貨運公司: {{ orderResult.delivery.carrier }}</p>
                  <p>預估重量: {{ orderResult.delivery.estimated_weight }} kg</p>
                  <p>運費: NT$ {{ orderResult.delivery.shipping_fee }}</p>

                   <h6 class="card-title mt-4">商品明細</h6>
                   <ul class="list-group list-group-flush">
                     <li class="list-group-item" v-for="item in orderResult.items" :key="item.id">
                       {{ item.name }} x {{ item.quantity }} - NT$ {{ item.subtotal }}
                     </li>
                   </ul>

                  <h6 class="card-title mt-4">總金額</h6>
                   <p class="card-text fs-5"><strong>總金額: NT$ {{ orderResult.totalAmount }}</strong></p>

                </div>
              </div>
            </div>

            <div v-else-if="searched" class="mt-5 alert alert-warning">
              未找到符合條件的訂單。
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderQuery',
  data() {
    return {
      query: {
        name: '',
        email: '',
        orderId: '',
        deliveryId: ''
      },
      orderResult: null,
      searched: false
    };
  },
  methods: {
    queryOrder() {
      this.orderResult = null; // Reset previous result
      this.searched = true; // Indicate that a search was attempted

      // Simulate querying from sessionStorage (only gets the last order)
      const storedOrderData = sessionStorage.getItem('latestOrderData');
      
      if (storedOrderData) {
        try {
          const order = JSON.parse(storedOrderData);

          let match = false;

          // Check if any query field matches the stored order data
          if (this.query.name && order.user && order.user.name === this.query.name) match = true;
          if (this.query.email && order.user && order.user.email === this.query.email) match = true;
          // Note: The simulated orderId is 'ORDER_' + timestamp, need to match this format or just the raw value
          // For simplicity, let's just check if the input matches the stored orderId string exactly
          if (this.query.orderId && (order.orderId === this.query.orderId || ('ORDER_' + new Date(order.createdAt).getTime()) === this.query.orderId)) match = true; // Check against the generated ID format too
          if (this.query.deliveryId && order.delivery && order.delivery.delivery_id === this.query.deliveryId) match = true;
          
          // If any field matches, show this order
          if (match) {
            this.orderResult = order;
             // Manually add a simulated orderId to the result for display consistency if it wasn't stored
            if (!this.orderResult.orderId && this.orderResult.createdAt) {
                 this.orderResult.orderId = 'ORDER_' + new Date(this.orderResult.createdAt).getTime();
            }
          } else {
             console.log('No match found for latest order in sessionStorage.');
          }

        } catch (error) {
          console.error('Error parsing order data from sessionStorage:', error);
        }
      }
       if (!this.orderResult) {
         console.log('sessionStorage is empty or no order data found.');
       }
    },
     formatOrderTime(timestamp) {
        if (!timestamp) return 'N/A';
         try {
             const date = new Date(timestamp);
             return date.toLocaleString('zh-TW', {
                 year: 'numeric',
                 month: '2-digit',
                 day: '2-digit',
                 hour: '2-digit',
                 minute: '2-digit',
                 second: '2-digit'
             });
         } catch (error) {
             console.error('Error formatting date:', error);
             return 'Invalid Date';
         }
    }
  }
}
</script>

<style scoped>
/* Add some basic styling for the card and form */
.card {
  margin-top: 20px;
}

.form-label {
  font-weight: 500;
}

.card-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.list-group-item {
  font-size: 0.95rem;
}
</style> 