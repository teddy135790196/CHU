import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/base/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// 後端設置
import axios from 'axios';

const BASE_URL = 'https://chu-frontend-production.up.railway.app/'; // ✅ 後端 API baseURL，自行依實際情況調整
// const BASE_URL = 'http://localhost:3000'; // ✅ 後端 API baseURL，自行依實際情況調整


// this.$axios.post
axios.defaults.baseURL = BASE_URL;
Vue.prototype.$axios = axios;
// 把 baseURL 也綁到 Vue 原型方便全局取用
Vue.prototype.$apiBaseUrl = BASE_URL;


Vue.config.productionTip = false;

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
