import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/base/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// 後端設置
import axios from 'axios';

const BASE_URL = process.env.VUE_APP_BACKEND_URL;
// const BASE_URL = 'https://bookstore-backend-production-f711.up.railway.app';
// const BASE_URL = 'http://localhost:3000';
// this.$axios.post
axios.defaults.baseURL = BASE_URL;

Vue.prototype.$axios = axios;
// 把 baseURL 也綁到 Vue 原型方便全局取用
Vue.prototype.$apiBaseUrl = BASE_URL;



// 匯入延遲加載套件
import VueLazyloadModule from "vue-lazyload";
// const VueLazyload=require('lazyload');
const VueLazyload = VueLazyloadModule.default || VueLazyloadModule;
// ✅ 延遲加載先啟用（在 new Vue 之前！
Vue.use(VueLazyload, {
  // loading:'/images/loadGo.svg'//匯入加載預設圖
  loading: "@/assets/images/load.jpg", //匯入加載預設圖
  error: "@/assets/images/load_fail.jpg", //匯入錯誤預設圖;
});
console.log("是物件或函式嗎", typeof VueLazyload);
console.log("測試印出vue-lazyload directive:", Vue.options.directives.lazy);



// 設定 Vue 的生產提示為 false，避免在生產環境中顯示提示訊息
// 這樣可以減少不必要的控制台輸出
Vue.config.productionTip = false;


// 設定 axios 請求攔截器，將 token 加入到請求頭中
// 這樣可以在每次發送請求時自動攜帶 token
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});


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
