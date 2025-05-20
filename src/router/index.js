import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',  // 或用 'hash'，看你需求
	routes: [
		{
			path: '*', // 預設導向
			redirect: '/login',
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginPage,
		},
		{
			path: '/register',
			name: 'RegisterForm',
			component: RegisterPage,
		},

	],
});
