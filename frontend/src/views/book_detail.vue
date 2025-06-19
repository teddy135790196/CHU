<template>
  <div class="container">
    <div class="row">
      <sub_nav class="col-sm-2" />
      <book_info :isbn="isbn" @buy_isbn="buyIsbn" class="col-sm-10" />
    </div>
  </div>
</template>
<script>
import sub_nav from "@/components/common/sub_nav.vue";
import book_info from "@/components/pages/book_info.vue";

// 輸出到外面
export default {
  name: "book_detail",
  props:['isbn'],
  components: { sub_nav,book_info },
  
  // mounted() {
  //   document.title = this.isbn;
  methods:{
    
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
{.container{width: 100%;}}
</style>