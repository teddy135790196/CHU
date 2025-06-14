<template>
  <div id="app">
    <PopupArea />

    <!-- 所有組件都要下移52px，因為抬頭導航不佔位 -->
    <HeaderArea />
    <div style="height: 52px"></div>


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
</style>
