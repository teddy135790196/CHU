<template>
  <div id="app">
    <nav>
      <!-- 使用 router-link 來切換路由 -->
      <div class="nav-left">
        <router-link to="/">首頁</router-link>
        <router-link to="/admin">管理頁面</router-link>
        <router-link to="/login">登入</router-link>
        <router-link to="/cart">購物車</router-link>
        <router-link to="/checkout-info">填寫訂單</router-link>
        <router-link to="/checkout-success">訂單確認</router-link>
        <router-link to="/register">加入會員</router-link>
        <router-link to="/order-query">查詢訂單</router-link>
      </div>
      <div class="nav-icons">
        <button class="icon-btn" @click="showSearch = !showSearch">
          <i class="bi bi-search"></i>
        </button>
        <button class="icon-btn" @click="$router.push('/cart')">
          <i class="bi bi-cart"></i>
        </button>
        <button class="icon-btn" @click="$router.push('/register')">
          <i class="bi bi-person"></i>
        </button>
      </div>
    </nav>
    <div v-if="showSearch" class="search-modal" @click.self="showSearch = false">
      <div class="search-box">
        <input type="text" v-model="searchKeyword" placeholder="輸入關鍵字…" />
        <button class="close-btn" @click="showSearch = false">&times;</button>
      </div>
    </div>
    <!-- 這裡會顯示匹配的頁面元件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showSearch: false,
      searchKeyword: ''
    };
  }
};
</script>

<style>
nav {
  padding: 2em 0 1em 0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-left {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 0.7em;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 0.8em;
  margin-left: 1em;
  margin-right: 6em;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 4rem;
  color: #333;
  cursor: pointer;
  padding: 0 0.2em;
  transition: color 0.2s;
}
.icon-btn:hover {
  color: #c41e3a;
}

nav a {
  margin: 0 1.2em;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  letter-spacing: 0.05em;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
  padding-bottom: 0.2em;
}

nav a:hover,
nav a.router-link-exact-active {
  color: #c41e3a;
}

nav a.router-link-exact-active::after,
nav a:hover::after {
  content: '';
  display: block;
  margin: 0 auto;
  width: 60%;
  height: 2px;
  background: #c41e3a;
  border-radius: 1px;
  margin-top: 0.2em;
}

.search-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.1);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 2000;
}
.search-box {
  margin: 2em 2em 0 0;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
  min-width: 320px;
  position: relative;
}
.search-box input {
  border: none;
  outline: none;
  font-size: 1.1rem;
  flex: 1;
  padding: 0.5em 0.8em 0.5em 0;
  background: transparent;
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  margin-left: 0.5em;
  transition: color 0.2s;
}
.close-btn:hover {
  color: #c41e3a;
}

nav, nav * {
  font-family: 'DFKai-SB', '標楷體', DFKai-SB, serif !important;
  font-size: 1.05rem !important;
  white-space: nowrap;
}
</style>
