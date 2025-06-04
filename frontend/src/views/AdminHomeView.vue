<template>
  <div class="container mt-5">
    <h1 class="text-center">管理後台首頁</h1>
    <p class="text-center">歡迎進入後台管理系統！</p>
	<button @click="logout" class="btn btn-danger">登出</button>
  </div>
</template>

<script>
export default {
  name: 'AdminHomePage',
  methods: {
    logout() {
      localStorage.removeItem('isAdmin');
      this.$router.push('/admin'); // 跳回管理登入頁
    }
  }
};
</script>
