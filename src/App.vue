<template>
  <div id="app">
    <nav>
      <!-- 使用 router-link 來切換路由 -->
      <router-link to="/">首頁</router-link> |
      <router-link to="/admin">管理頁面</router-link> |
      <router-link to="/login">登入</router-link> |
      <router-link to="/cart">購物車</router-link> |
      <router-link to="/checkout-info">填寫訂單</router-link> |
      <router-link to="/checkout-success">訂單確認</router-link> |
      <router-link to="/register">加入會員</router-link> |
      <router-link to="/order-query">查詢訂單</router-link>
    </nav>

    <!-- 這裡會顯示匹配的頁面元件 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
nav {
  padding: 1em;
  background: #f0f0f0;
}

nav a {
  margin-right: 1em;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #35495e;
}
</style>
