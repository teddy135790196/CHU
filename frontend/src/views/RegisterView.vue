<template>
  <div id="app" class="wrap">
    <!-- 背景層 -->
    <!-- <div class="back-img"></div>  -->

    <div class="container mt-5 mb-5">
      <div class="row">
        <RegisterPage />
      </div>
    </div>
  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import RegisterPage from "@/components/pages/RegisterPage.vue";

export default {
  name: "RegisterView",
  components: {
    RegisterPage,
  },
};
</script>

<style scoped>
@import '@/assets/styles/pages/registerPage.css';
</style>
