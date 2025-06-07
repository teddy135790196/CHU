import Vue from 'vue'
import App from './App.vue'
// 匯入路由
import router from './router'
// 產品頁css匯入
import '@/assets/css/bootstrap.min.css'
import '@/assets/css/productCss.css'

// 不再顯示 Vue 開發模式提示訊息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App), //用app元件渲染畫面
}).$mount('#app')
