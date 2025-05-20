<template>
  <div id="app" class="wrap">
    <RegisterForm />
  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import RegisterForm from "@/components/Register/RegisterForm.vue";

export default {
  name: "RegisterPage",
  components: {
    RegisterForm,
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

.wrap {
  height: 100vh;
}
</style>
