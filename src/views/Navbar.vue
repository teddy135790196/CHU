<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="bi bi-shop me-2"></i>購物網站
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-house-door me-1"></i>首頁
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              <i class="bi bi-cart me-1"></i>購物車
              <span v-if="cartCount > 0" class="badge bg-primary ms-1">{{ cartCount }}</span>
            </router-link>
          </li>
        </ul>
        
        <!-- 用戶選單 -->
        <div class="navbar-nav" v-if="isLoggedIn">
          <div class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle me-1"></i>{{ userNickname }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/cart">
                  <i class="bi bi-cart me-1"></i>購物車
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/checkout-info">
                  <i class="bi bi-credit-card me-1"></i>結帳
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="handleLogout">
                  <i class="bi bi-box-arrow-right me-1"></i>登出
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- 訪客選單 -->
        <div class="navbar-nav" v-else>
          <router-link class="nav-link" to="/login">
            <i class="bi bi-box-arrow-in-right me-1"></i>登入
          </router-link>
          <router-link class="nav-link" to="/register">
            <i class="bi bi-person-plus me-1"></i>註冊
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      cartCount: 0,
      user: null
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('isLogin') === 'true';
    },
    userNickname() {
      return this.user?.nickname || '會員';
    }
  },
  created() {
    this.updateCartCount();
    // 監聽 localStorage 變化
    window.addEventListener('storage', this.updateCartCount);
    // 從 localStorage 獲取用戶信息
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.user = JSON.parse(userStr);
      } catch (e) {
        console.error('解析用戶信息失敗:', e);
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('storage', this.updateCartCount);
  },
  methods: {
    updateCartCount() {
      const cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        const items = JSON.parse(cartItems);
        this.cartCount = items.reduce((total, item) => total + item.count, 0);
      } else {
        this.cartCount = 0;
      }
    },
    handleLogout() {
      if (confirm('確定要登出嗎？')) {
        // 清除登入狀態
        localStorage.removeItem('isLogin');
        localStorage.removeItem('user');
        this.user = null;
        
        // 跳轉到登入頁面
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
}

.navbar-brand {
  font-weight: 600;
}

.nav-link {
  font-weight: 500;
}

.nav-link:hover {
  color: #007bff !important;
}

.badge {
  font-size: 0.75rem;
  padding: 0.25em 0.6em;
}

.dropdown-menu {
  min-width: 200px;
}

.dropdown-item {
  padding: 0.5rem 1rem;
}

.dropdown-item i {
  width: 1.5rem;
}
</style> 