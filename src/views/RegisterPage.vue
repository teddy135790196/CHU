<template>
  <div id="app" class="wrap">
    <Register />
  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import Register from "@/components/Register.vue";

export default {
  name: "RegisterPage",
  components: {
    Register,
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

.wrap {
  height: 100vh;
}
</style>
