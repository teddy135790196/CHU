<template>
  <div class="container-fluid">
    <h1 class="text-center mb-4">訂單管理</h1>

    <div class="d-flex justify-content-between mb-2">
      <div>
        每頁筆數：
        <select v-model.number="pageSize" class="form-select form-select-sm d-inline-block w-auto">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
      <div>
        <input v-model="searchQuery" type="text" class="form-control w-auto" placeholder="搜尋使用者名稱或訂單ID" />
      </div>
    </div>

    <table class="table table-bordered table-hover fixed-table">
      <thead class="table-info">
        <tr>
          <th @click="sortBy('order_id')" class="sortable">訂單ID <span class="sort-icon">{{ getSortSymbol('order_id')
          }}</span></th>
          <th @click="sortBy('user_name')" class="sortable">使用者名稱 <span class="sort-icon">{{ getSortSymbol('user_name')
          }}</span></th>
          <th @click="sortBy('user_tel')" class="sortable">電話 <span class="sort-icon">{{ getSortSymbol('user_tel')
          }}</span></th>
          <th @click="sortBy('user_email')" class="sortable">Email <span class="sort-icon">{{
            getSortSymbol('user_email') }}</span></th>
          <th @click="sortBy('user_address')" class="sortable">地址 <span class="sort-icon">{{
            getSortSymbol('user_address') }}</span></th>
          <th @click="sortBy('payment_method')" class="sortable">付款方式 <span class="sort-icon">{{
            getSortSymbol('payment_method') }}</span></th>
          <th @click="sortBy('status')" class="sortable">訂單狀態 <span class="sort-icon">{{ getSortSymbol('status')
          }}</span></th>
          <th @click="sortBy('created_at')" class="sortable">建立時間 <span class="sort-icon">{{ getSortSymbol('created_at')
          }}</span></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in paginatedFilteredOrders" :key="order.order_id" @click="toggleDetails(order.order_id)"
          class="clickable-row">
          <td>{{ order.order_id }}</td>
          <td>{{ order.user_name }}</td>
          <td>{{ order.user_tel }}</td>
          <td>{{ order.user_email }}</td>
          <td>{{ order.user_address }}</td>
          <td>{{ order.payment_method }}</td>
          <td>{{ order.status }}</td>
          <td>{{ formatDate(order.created_at) }}</td>
        </tr>
        <tr v-for="n in emptyRows" :key="'empty' + n" class="empty-row">
          <td colspan="8">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <div class="d-flex justify-content-between align-items-center mt-3">
      <div class="ms-2">
        顯示第 {{ pageStart + 1 }} 筆至第 {{ pageEnd }} 筆，共 {{ filteredOrders.length }} 筆
      </div>
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">上一頁</a>
          </li>
          <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">下一頁</a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="expandedOrderId" class="overlay" @click.self="closeDetails">
      <div class="details-card">
        <h5>訂單 {{ expandedOrderId }} 明細</h5>
        <table class="table table-sm table-bordered mt-2">
          <thead>
            <tr>
              <th>明細ID</th>
              <th>ISBN</th>
              <th>書名</th>
              <th>數量</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderDetails[expandedOrderId] || []" :key="item.order_item_id">
              <td>{{ item.order_item_id }}</td>
              <td>{{ item.ISBN_id }}</td>
              <td>{{ item.book_name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price_at_order_time }}</td>
              <td>{{ item.subtotal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminOrderPage',
  data() {
    return {
      orders: [],
      orderDetails: {},
      expandedOrderId: null,
      currentPage: 1,
      pageSize: 5,
      searchQuery: '',
      sortKey: '',
      sortAsc: true,
    };
  },
  computed: {
    filteredOrders() {
      const q = this.searchQuery.trim().toLowerCase();
      return this.orders.filter(o =>
        o.user_name?.toLowerCase().includes(q) || String(o.order_id).includes(q)
      );
    },
    sortedOrders() {
      if (!this.sortKey) return this.filteredOrders;
      return [...this.filteredOrders].sort((a, b) => {
        return this.sortAsc
          ? (a[this.sortKey] < b[this.sortKey] ? -1 : 1)
          : (a[this.sortKey] > b[this.sortKey] ? -1 : 1);
      });
    },
    paginatedFilteredOrders() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedOrders.slice(start, start + this.pageSize);
    },
    emptyRows() {
      const count = this.pageSize - this.paginatedFilteredOrders.length;
      return count > 0 ? Array.from({ length: count }) : [];
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize) || 1;
    },
    pageStart() {
      return (this.currentPage - 1) * this.pageSize;
    },
    pageEnd() {
      return Math.min(this.pageStart + this.pageSize, this.filteredOrders.length);
    },
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
    }
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
    },

    // 轉換時間格式
    formatDate(dateStr) {
      const date = new Date(dateStr);

      // UTC+8 時差調整
      const local = new Date(date.getTime() + 8 * 60 * 60 * 1000);

      const yyyy = local.getFullYear();
      const mm = String(local.getMonth() + 1).padStart(2, '0');
      const dd = String(local.getDate()).padStart(2, '0');
      const hh = String(local.getHours()).padStart(2, '0');
      const mi = String(local.getMinutes()).padStart(2, '0');

      return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
    },

    sortBy(key) {
      this.sortKey === key ? this.sortAsc = !this.sortAsc : (this.sortKey = key, this.sortAsc = true);
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    toggleDetails(id) {
      this.expandedOrderId = id;
    },
    closeDetails() {
      this.expandedOrderId = null;
    },
    getSortSymbol(key) {
      if (this.sortKey === key) return this.sortAsc ? '▲' : '▼';
      return '━';
    },
  }
};
</script>

<style scoped>
.fixed-table th,
.fixed-table td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

.sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 20px;
  transition: background-color 0.3s ease;
}

.sortable:hover {
  background-color: #b6d3ff;
}

.sort-icon {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 14px;
  pointer-events: none;
}

.clickable-row {
  cursor: pointer;
  transition: background-color .2s;
}

.clickable-row:hover {
  background-color: #f1f9ff;
}

.empty-row td {
  background: transparent;
  height: 40px;
  pointer-events: none;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.details-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.pagination .page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: #fff;
}

.pagination .page-link {
  cursor: pointer;
}
</style>
