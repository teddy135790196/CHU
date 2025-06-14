import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // ← 有引入 router
import "./assets/style.css"; // 引入樣式文件
import 'bootstrap-icons/font/bootstrap-icons.css';

Vue.config.productionTip = false;

new Vue({
  router,   // ← 要掛載進來
  render: h => h(App)
}).$mount("#app");