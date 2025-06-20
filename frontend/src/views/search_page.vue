<template>
  <div class="container">
    <div class="row">
      <search_block @select_isbn="getIsbn" @buy_isbn="buyIsbn" class="col-sm-12" />
    </div>
  </div>
</template>
<script>

import search_block from "@/components/pages/search_block.vue";

// 輸出到外面
export default {
  name: "search_page",
  props:['isbn'],
  components: { search_block },
  
  methods: {
    getIsbn(isbn) {
      //取到這個isbn了我要跳轉到isbn頁! -->現在的路由要改成...
      console.log('選擇的ISBN:', isbn); // 這裡是接在前端路由後
      this.$router.push(`/book/${encodeURIComponent(isbn)}`);
    },
    buyIsbn(isbn){
      // 取到這個IBSN了我要放到購物車
      console.log('選擇要買的ISBN:', isbn); 
    }
  }
};
</script>

<style scoped>

/* 設定寬度跟置中 */
.container {
  margin: 0 auto;
  width: 1400px;
}
@media (max-width: 670px)
{.container{width: 100%;
margin-top: 20px;}}
</style>