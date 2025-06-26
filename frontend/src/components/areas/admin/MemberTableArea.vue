<template>
  <div>
    <div class="d-flex justify-content-between mb-2 mt-5">
      <div>
        每頁筆數：
        <select v-model.number="pageSize" class="form-select form-select-sm d-inline-block w-auto">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
      <div>
        <input v-model="searchQuery" type="text" class="form-control w-auto" placeholder="搜尋會員名稱或ID" />
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-hover fixed-table">
        <thead class="table-info">
          <tr>
            <th @click="$emit('sort', 'id')" class="sortable" style="width: 8%">
              會員ID <span class="sort-icon">{{ getSortSymbol('id') }}</span>
            </th>
            <th @click="$emit('sort', 'name')" class="sortable" style="width: 12%">
              會員名稱 <span class="sort-icon">{{ getSortSymbol('name') }}</span>
            </th>
            <th @click="$emit('sort', 'tel')" class="sortable" style="width: 10%">
              電話 <span class="sort-icon">{{ getSortSymbol('tel') }}</span>
            </th>
            <th @click="$emit('sort', 'email')" class="sortable" style="width: 14%">
              Email <span class="sort-icon">{{ getSortSymbol('email') }}</span>
            </th>
            <th @click="$emit('sort', 'address')" class="sortable" style="width: 18%">
              地址 <span class="sort-icon">{{ getSortSymbol('address') }}</span>
            </th>
            <th @click="$emit('sort', 'status')" class="sortable" style="width: 8%">
              狀態 <span class="sort-icon">{{ getSortSymbol('status') }}</span>
            </th>
            <th @click="$emit('sort', 'registration_time')" class="sortable" style="width: 14%">
              註冊時間 <span class="sort-icon">{{ getSortSymbol('registration_time') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedFilteredUsers" :key="user.id" class="clickable-cell">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.tel }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.status }}</td>
            <td>{{ formatDate(user.registration_time) }}</td>
          </tr>
          <tr v-for="n in emptyRows" :key="'empty' + n" class="empty-row">
            <td colspan="7">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="d-flex justify-content-between align-items-center mt-3 mb-5">
      <div class="ms-2">顯示第 {{ pageStart + 1 }} 筆至第 {{ pageEnd }} 筆，共 {{ filteredUsers.length }} 筆</div>
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
  </div>
</template>

<script>
export default {
  name: 'MemberTableArea',
  props: {
    users: { type: Array, required: true },
    currentSortKey: { type: String, required: true },
    sortAsc: { type: Boolean, required: true }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      searchQuery: ''
    };
  },
  computed: {
    filteredUsers() {
      const q = this.searchQuery.trim().toLowerCase();
      return this.users.filter(u =>
        (u.name || '').toLowerCase().includes(q) ||
        String(u.id).includes(q)
      );
    },
    sortedUsers() {
      if (!this.currentSortKey) return this.filteredUsers;
      return [...this.filteredUsers].sort((a, b) => {
        let valA = a[this.currentSortKey];
        let valB = b[this.currentSortKey];
        if (this.currentSortKey === 'registration_time') {
          valA = new Date(valA);
          valB = new Date(valB);
        }
        return this.sortAsc ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
      });
    },
    paginatedFilteredUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.sortedUsers.slice(start, start + this.pageSize);
    },
    emptyRows() {
      const count = this.pageSize - this.paginatedFilteredUsers.length;
      return count > 0 ? Array.from({ length: count }) : [];
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize) || 1;
    },
    pageStart() {
      return (this.currentPage - 1) * this.pageSize;
    },
    pageEnd() {
      return Math.min(this.pageStart + this.pageSize, this.filteredUsers.length);
    }
  },
  watch: {
    pageSize() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    }
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
    },
    getSortSymbol(key) {
      if (this.currentSortKey !== key) return '⇅';
      return this.sortAsc ? '↑' : '↓';
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      if (isNaN(date)) return dateStr;
      return date.toLocaleString();
    }
  }
};
</script>

<style scoped>
.fixed-table {
  width: 100%;
  table-layout: fixed;
}

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

.clickable-cell {
  cursor: default;
}

.empty-row td {
  background: transparent;
  height: 40px;
  pointer-events: none;
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
