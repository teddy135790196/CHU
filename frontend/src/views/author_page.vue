<template>
  <div class="container">
    <div class="row">
      <sub_nav class="col-sm-2" />
      <div class="col-sm-10">
        <div class="card">
  <div class="card-header">作者
  </div>
  <div class="card-body">
    <p class="card-text">他是...</p>
  </div>
</div>
        <search_block @select_isbn="getIsbn" @buy_isbn="buyIsbn"  /></div>
      
    </div>
  </div>
</template>
<script>
import sub_nav from "@/components/common/sub_nav.vue";
import search_block from "@/components/pages/search_block.vue";

// 輸出到外面
export default {
  name: "author_page",
  props:['isbn'],
  components: { sub_nav,search_block },
  
 methods:{
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
  margin: 150px auto;
  width: 1400px;
}
@media (max-width: 670px)
{.container{width: 100%;}}
</style>