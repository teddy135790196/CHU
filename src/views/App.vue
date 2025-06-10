<template>
  <div id="app">
    <!-- 導航欄 -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <i class="bi bi-shop me-2"></i>購物商城
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
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout">
                <i class="bi bi-credit-card me-1"></i>訂單資訊
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout/ORDER123">
                <i class="bi bi-check-circle me-1"></i>訂單成功
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  margin-bottom: 2rem;
}

.navbar-brand {
  font-weight: bold;
}

.nav-link {
  color: #2c3e50;
}

.nav-link:hover {
  color: #007bff;
}

.nav-link.router-link-active {
  color: #007bff;
  font-weight: bold;
}
</style> 