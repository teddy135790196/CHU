import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // ← 有引入 router

Vue.config.productionTip = false;

new Vue({
  router,   // ← 要掛載進來
  render: h => h(App)
}).$mount("#app");