import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/base/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 後端設置：直接匯入已統一設定好的 axios 實例
import apiClient from '@/api';

// 將統一的 axios 實例掛載到 Vue 原型上，方便在元件中用 this.$axios 呼叫
Vue.prototype.$axios = apiClient;
// 也可以將 baseURL 掛載上去，方便在模板中取用
Vue.prototype.$apiBaseUrl = apiClient.defaults.baseURL;



// 匯入延遲加載套件
import VueLazyloadModule from "vue-lazyload";
// const VueLazyload=require('lazyload');
const VueLazyload = VueLazyloadModule.default || VueLazyloadModule;
// ✅ 延遲加載先啟用（在 new Vue 之前！
Vue.use(VueLazyload, {
  // loading:'/images/loadGo.svg'//匯入加載預設圖
  loading: "/images/load.jpg", //匯入加載預設圖
  error: "/images/load_fail.jpg", //匯入錯誤預設圖;
});
console.log("是物件或函式嗎", typeof VueLazyload);
console.log("測試印出vue-lazyload directive:", Vue.options.directives.lazy);



// 設定 Vue 的生產提示為 false，避免在生產環境中顯示提示訊息
// 這樣可以減少不必要的控制台輸出
Vue.config.productionTip = false;


// 注意：請求攔截器 (Request Interceptor) 的邏輯已經統一移至 src/api/index.js
// 所以這裡不再需要重複設定


// 權限驗證（後台）
router.beforeEach((to, from, next) => {
	const isAdmin = localStorage.getItem('isAdmin');

	if (to.path === '/admin' && isAdmin) {
		// 已登入狀態下，阻止回登入頁，導向後台首頁
		next('/admin/home');
	} else if (to.meta.requiresAdmin) {
		// 要求管理員權限的頁面
		if (isAdmin) {
			next(); // 允許進入
		} else {
			next('/admin'); // 沒權限，導回登入頁
		}
	} else {
		next(); // 其他頁面直接放行
	}
});

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
