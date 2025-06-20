<template>
  <div id="app" class="wrap">

    <div class="container">
      <div class="row">
        <ShoppingCartPage />
      </div>
    </div>

  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import ShoppingCartPage from "@/components/pages/ShoppingCartPage.vue";

export default {
  name: "ShoppingCartView",
  components: {
    ShoppingCartPage,
  },
};
</script>
