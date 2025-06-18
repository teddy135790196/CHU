<template>
  <div id="app" class="wrap">
    <!-- 背景層 -->
    <!-- <div class="back-img"></div>  -->

    <div class="container-fluid m-4">
      <div class="row page-login">
        <!-- 左側歡迎區 -->
        <WelcomePage />
        <!-- 右側登入區 -->
        <LoginPage />
      </div>
    </div>
  </div>
</template>

<script>
import WelcomePage from '@/components/pages/LoginWelcomePage.vue';
import LoginPage from '@/components/pages/LoginPage.vue';

export default {
  name: "LoginView",
  components: {
    WelcomePage,
    LoginPage,
  },
};
</script>

<style scoped>
@import '@/assets/styles/pages/loginPage.css';
</style>
