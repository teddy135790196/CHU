<template>
  <div class="product-page">
    <h1>商品列表</h1>
    <div v-if="searchTerm">
      <p>
        搜尋內容: <strong>{{ searchTerm }}</strong>
      </p>
      <p>
        搜尋範圍: <strong>{{ searchScopeDisplay }}</strong>
      </p>
    </div>
    <div v-else>
      <p>請在導航列輸入搜尋內容</p>
    </div>

    <div class="product-list">
      <p>這裡是根據搜尋條件篩選後的商品列表...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyProduct.vue",

  data() {
    return {
      searchTerm: "",
      searchScope: "",
    };
  },

  computed: {
    searchScopeDisplay() {
      const scopeMap = {
        // all: "全部欄位",
        name: "書名",
        author: "作者",
        ISBN_id: "ISBN",
        series: "系列名稱",
        // 更多選項的映射
      };
      return scopeMap[this.searchScope] || this.searchScope;
    },
  },

  watch: {
    // 監聽路由參數變化，以便在使用者直接修改網址時更新內容
    "$route.query": {
      immediate: true, // 組件一載入就執行一次
      handler(newQuery) {
        this.searchTerm = newQuery.q || "";
        this.searchScope = newQuery.scope || "all";
        // 在這裡可以觸發商品數據的重新載入或篩選
        // this.fetchProducts(this.searchTerm, this.searchScope);
      },
    },
  },
  created() {
    // 初始載入時獲取路由參數
    this.searchTerm = this.$route.query.q || "";
    this.searchScope = this.$route.query.scope || "all";
    // 可以在這裡觸發商品數據的初始載入
    // this.fetchProducts(this.searchTerm, this.searchScope);
  },
  methods: {
    // fetchProducts(searchTerm, searchScope) {
    //   // 模擬從後端獲取商品數據的邏輯
    //   console.log(`正在根據搜尋內容 "${searchTerm}" 和範圍 "${searchScope}" 載入商品...`);
    //   // 實際應用中會發送 API 請求
    // }
  },
};
</script>

<style scoped>
.product-page {
  padding: 20px;
}

.product-list {
  margin-top: 20px;
  border: 1px dashed #ccc;
  padding: 15px;
  background-color: #f9f9f9;
}
</style>
