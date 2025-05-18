<template>
  <div id="app" class="wrap">
    <div class="container-fluid">
      <div class="row">
        <!-- 左側歡迎區 -->
        <WelcomeSection />
        <!-- 右側登入區 -->
        <LoginSection />
      </div>
    </div>
  </div>
</template>

<script>
// 路徑要對應到 components/Section 底下的元件位置
import WelcomeSection from '@/components/Section/WelcomeSection.vue';
import LoginSection from '@/components/Section/LoginSection.vue';

export default {
  name: "LoginPage",
  components: {
    WelcomeSection,
    LoginSection,
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

.wrap {
  height: 100vh;
}
</style>
