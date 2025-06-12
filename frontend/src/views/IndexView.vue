<template>
  <div id="app" class="wrap">
    <!-- 背景層 -->
    <!-- <div class="back-img"></div>  -->

    <!-- <div class="container"> -->
      <!-- <div class="row"> -->
        <IndexPage />
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import IndexPage from "@/components/pages/IndexPage.vue";

export default {
  name: "IndexView",
  components: {
    IndexPage,
  },
};
</script>

<style scoped>
</style>
