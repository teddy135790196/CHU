<template>
  <div class="container">
    <div class="row">
      <sub_nav class="col-sm-2" />
      <div class="col-sm-10">
        <h1>這是首頁可以把首頁的html貼到這邊</h1>
      </div>
    </div>
  </div>
</template>
<script>
import sub_nav from "@/components/sub_nav.vue";
// 輸出到外面
export default {
  name: "ProductHome",
  components: { sub_nav },
};
</script>
