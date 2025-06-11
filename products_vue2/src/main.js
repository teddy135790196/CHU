import Vue from 'vue'
import App from './App.vue'
// 匯入路由
import router from './router'


// 產品頁css匯入
import '@/assets/css/bootstrap.min.css'

// 匯入延遲加載套件
import VueLazyloadModule from 'vue-lazyload';
// const VueLazyload=require('lazyload');
const VueLazyload=VueLazyloadModule.default||VueLazyloadModule;
// ✅ 延遲加載先啟用（在 new Vue 之前！
Vue.use(VueLazyload,{
  // loading:'/images/loadGo.svg'//匯入加載預設圖
  loading:'/images/load.jpg',//匯入加載預設圖
    error:'/images/load_fail.jpg',//匯入錯誤預設圖;
    

});
console.log("是物件或函式嗎",typeof VueLazyload);
console.log('測試印出vue-lazyload directive:',
   Vue.options.directives.lazy);

// 不再顯示 Vue 開發模式提示訊息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App), //用app元件渲染畫面
})
.$mount('#app')