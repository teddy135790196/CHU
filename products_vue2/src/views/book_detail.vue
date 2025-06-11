<template>
  <div class="container">
    <div class="row">
      <sub_nav class="col-sm-2" />
      <book_info class="col-sm-10" />
    </div>
  </div>
</template>
<script>
import sub_nav from "@/components/sub_nav.vue";
import book_info from "@/components/book_info.vue";

// 輸出到外面
export default {
  name: "book_detail",
  // props:['ibsn'],
  components: { sub_nav, book_info },
  mounted() {
    document.title = this.ibsn;
  },
};
</script>
