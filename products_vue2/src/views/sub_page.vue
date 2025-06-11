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