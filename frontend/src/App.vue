<template>
  <div id="app">
    <!-- 所有組件都要下移52px，因為抬頭導航不佔位 -->
    <!-- <div style="height: 52px"></div> -->
    <router-view />
  </div>
</template>
 
<script>
export default {
  name: 'App',
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");


</style>
