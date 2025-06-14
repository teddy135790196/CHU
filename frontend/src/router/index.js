import Vue from 'vue';
import Router from 'vue-router';


import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import IndexView from '@/views/IndexView.vue';
import LoginView from '@/views/LoginView.vue';
import MembersView from '@/views/MembersView.vue';		// 會員可視
import ProductsView from '@/views/ProductsView.vue';		// 會員可視
import RegisterView from '@/views/RegisterView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';


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
			path: '/products',
			name: 'Products',
			component: ProductsView,
		},
		{
			path: '/shoppingCart',
			name: 'ShoppingCart',
			component: ShoppingCartView,
		},
		{
			path: '/test',
			name: 'TestView',
			component: TestView,
		},
	],
});

// 會員需登入
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token');
//   if (to.path === '/members' && !token) {
//     // 攔截未登入訪問會員頁，跳轉登入頁
//     if (confirm('尚未登入，是否前往登入頁？')) {
//       next('/login');
//     } else {
//       next(false); // 取消跳轉，停留原頁
//     }
//   } else {
//     next(); // 其他路由照常
//   }
// });

export default router;
