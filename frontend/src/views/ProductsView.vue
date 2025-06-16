<template>
  <div id="app" class="wrap">

    <div class="container">
      <div class="row">
        <ProductPage />
      </div>
    </div>

  </div>
</template>

<script>
// 路徑要對應到 components 底下的元件位置
import ProductPage from "@/components/pages/ProductsPage.vue";

export default {
  name: "ProductsView",
  components: {
    ProductPage,
  },
};
</script>
