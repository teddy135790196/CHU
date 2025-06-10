<template>
  <!-- <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div> -->
  <div id="app">
    <MyPopup></MyPopup>
    <TitleNav></TitleNav>
    <MyIndex></MyIndex>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyPopup from "./components/MyPopup.vue";
import TitleNav from "./components/TitleNav.vue";
import MyFooter from "./components/MyFooter.vue";
import MyIndex from "./components/MyIndex.vue";

export default {
  name: "App",
  components: {
    MyPopup,
    TitleNav,
    MyFooter,
    MyIndex,
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
