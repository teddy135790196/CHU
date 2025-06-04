<template>
  <div id="app" class="wrap">
    <!-- 背景層 -->
    <!-- <div class="back-img"></div>  -->

    <RegisterPage />
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
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
@import '@/assets/styles/pages/registerPage.css';
</style>
