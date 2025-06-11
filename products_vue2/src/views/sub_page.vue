<template>
    <div class="container">
    <div class="row">
        <sub_nav class="col-sm-2"/>
        <subBlock :category="sub" class="col-sm-10"/>
    </div></div>
</template>
<script>
// import block from '@/components/book_block.vue'
import sub_nav from '@/components/sub_nav.vue'
import subBlock from '@/components/sub_block.vue'


// 輸出到外面
export default{
    name:'sub_page',
    props:['sub'],
    components:{sub_nav,subBlock},
    mounted() {
  document.title =this.sub|| "分類"
}
}
</script>
<style>
/* 不論是nav、block都有用到的 */
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
a:hover,
a {
  text-decoration: none;
}
/* 設定寬度跟置中 */
.container {
  margin: 0 auto;
  width: 1300px;
}

</style>