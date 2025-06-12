<template>
  <div id="app">
    <MyPopup></MyPopup>
    <TitleNav></TitleNav>
    <!-- 所有組件都要下移52px，因為抬頭導航不佔位 -->
    <div style="height: 52px"></div>
    <router-view />
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyPopup from "./components/MyPopup.vue";
import TitleNav from "./components/TitleNav.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: {
    MyPopup,
    TitleNav,
    MyFooter,
  },

  data() {
    return {
      globalSelectedField: "",
      globalSearchValue: "",
    };
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
@import "./assets/css/bootstrap.min.css";

* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: sans-serif;
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: black;
}
</style>
