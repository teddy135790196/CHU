<template>
  <div id="app" class="wrap back-img">
    <div class="container-fluid">
      <div class="row page-login">
        <!-- 左側歡迎區 -->
        <WelcomeArea />
        <!-- 右側登入區 -->
        <LoginArea />
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeArea from '@/components/modules/login/WelcomeArea.vue';
import LoginArea from '@/components/modules/login/LoginArea.vue';

export default {
  name: "LoginPage",
  components: {
    WelcomeArea,
    LoginArea,
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import '@/assets/styles/pages/login.css';
</style>
