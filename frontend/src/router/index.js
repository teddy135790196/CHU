import Vue from 'vue';
import Router from 'vue-router';

// 管理員可視
import AdminHomeView from '@/views/AdminHomeView.vue';
import AdminView from '@/views/AdminView.vue';

// 會員可視
import MembersView from '@/views/MembersView.vue';

// 公共可視
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import IndexView from '@/views/IndexView.vue';

import TestView from '@/views/TestView.vue';


Vue.use(Router);

const router = new Router({
	mode: 'history',  // 或用 'hash'，看你需求
	routes: [
		{	// 錯誤導向
			path: '*',	
			redirect: '/index',
		},
		{	// 根目錄(開啟位置)
			path: '/',	
			name: 'myIndex',
			component: IndexView,
		},
		{
			path: '/login',
			name: 'Login',
			component: LoginView,
		},
		{
			path: '/forgot-password',
			name: 'ForgotPassword',
			component: ForgotPasswordView,
		},
		{
			path: '/register',
			name: 'Register',
			component: RegisterView,
		},
		{
			path: '/members',
			name: 'Members',
			component: MembersView,
		},
		{
			path: '/admin/home',
			name: 'AdminHomeView',
			component: AdminHomeView,
			meta: { requiresAdmin: true } // 標記需要管理員身份
		},
		{
			path: '/admin',
			name: 'AdminView',
			component: AdminView,
		},
		{
			path: '/test',
			name: 'TestView',
			component: TestView,
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
