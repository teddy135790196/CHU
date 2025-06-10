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
            <router-link class="nav-link" to="/products">
              <i class="bi bi-grid me-1"></i>商品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">
              <i class="bi bi-cart me-1"></i>購物車
              <span v-if="cartCount > 0" class="badge bg-primary ms-1">{{ cartCount }}</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/checkout">
              <i class="bi bi-credit-card me-1"></i>結帳
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      cartCount: 0
    }
  },
  created() {
    this.updateCartCount();
    // 監聽 localStorage 變化
    window.addEventListener('storage', this.updateCartCount);
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
</style> 