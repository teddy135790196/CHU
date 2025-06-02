import Vue from 'vue';
import Router from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import MembersAreaPage from '@/views/MembersAreaPage.vue';
import AdminPage from '@/views/AdminPage.vue';
import AdminHomePage from '@/views/AdminHomePage.vue';
import TestPage from '@/views/TestPage.vue';

Vue.use(Router);

const router = new Router({
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
		{
			path: '/membersArea',
			name: 'MembersAreaForm',
			component: MembersAreaPage,
		},
		{
			path: '/admin/home',
			name: 'AdminHomePage',
			component: AdminHomePage,
			meta: { requiresAdmin: true } // 標記需要管理員身份
		},
		{
			path: '/admin',
			name: 'AdminPage',
			component: AdminPage,
		},
		{
			path: '/test',
			name: 'TestPage',
			component: TestPage,
		},
	],
});

// ✅ 加入導航守衛
router.beforeEach((to, from, next) => {
	if (to.meta.requiresAdmin) {
		const isAdmin = localStorage.getItem('isAdmin');
		if (isAdmin) {
			next(); // 有權限，繼續
		} else {
			next('/admin'); // 無權限，跳回登入
		}
	} else {
		next(); // 不需要權限，直接進入
	}
});

export default router;
