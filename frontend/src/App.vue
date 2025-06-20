<template>
  <div id="app">
    <PopupArea />

    <!-- 所有組件都要下移52px，因為抬頭導航不佔位 -->
    <HeaderArea />
    <div class="space"></div>


    <router-view />


    <FooterArea />
  </div>
</template>

<script>
import PopupArea from './components/common/PopupArea.vue';
import HeaderArea from './components/common/HeaderArea.vue';
import FooterArea from './components/common/FooterArea.vue';

export default {
  name: 'App',
  data() {
    return {
      globalSelectedField: "",
      globalSearchValue: "",
    };
  },
  components: {
    PopupArea,
    HeaderArea,
    FooterArea
  },
  mounted() {
    document.title = '棲遲書屋';
  },
  provide() {
    return {
      selectedField: () => this.globalSelectedField, // 提供一個響應式屬性
      searchValue: () => this.globalSearchValue,
      updateSearch: (field, value) => {
        // 提供一個更新方法
        this.globalSelectedField = field;
        this.globalSearchValue = value;
      },
    };
  },
};
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");
/* ========================================
   基本全局樣式（適用於所有設備）
   寫好的CSS貼在這區
======================================== */

.space {
  height: 100px
}



/* ========================================
   md: 768px ~ 991px (橫向 iPad、小型平板)
   container 寬度: 720px
======================================== */
@media (min-width: 768px) and (max-width: 991px) {
  .space {
    height: 90px
  }
}




/* ========================================
   sm: 577px ~ 767px (大型手機、直向平板)
   container 寬度: 540px
======================================== */
@media (min-width: 577px) and (max-width: 767px) {
  .space {
    height: 80px
  }
}




/* ========================================
   xs: ≤ 576px (手機)
   container 寬度: 100% (fluid)
======================================== */
@media (max-width: 576px) {
  .space {
    height: 60px
  }
}
</style>
