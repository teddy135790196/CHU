import Vue from 'vue';
import Router from 'vue-router';


import book_detail from '@/views/book_detail.vue';
import search_page from '@/views/search_page.vue';
import AdminHomeView from '@/views/AdminHomeView.vue';
import AdminView from '@/views/AdminView.vue';
import author_page from '@/views/author_page.vue';
import ForgotPasswordView from '@/views/ForgotPasswordView.vue';
import IndexView from '@/views/IndexView.vue';
import LoginView from '@/views/LoginView.vue';
import MembersView from '@/views/MembersView.vue';		// 會員可視
import sub_page from '@/views/sub_page.vue';
// import ProductsView from '@/views/ProductsView.vue';		// 會員可視
import RegisterView from '@/views/RegisterView.vue';
import ShoppingCartView from '@/views/ShoppingCartView.vue';
import CheckoutInfoView from '@/views/CheckoutInfoView.vue';
import CheckoutSuccessView from '@/views/CheckoutSuccessView.vue';


import TestView from '@/views/TestView.vue';


Vue.use(Router);

const router = new Router({
	mode: 'history',  // 或用 'hash'，看你需求
	routes: [
		{	// 錯誤導向
			path: '*',
			redirect: '/',
		},
		{	// 根目錄(開啟位置)
			path: '/',
			name: 'Index',
			component: IndexView,
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
			component: sub_page,
		},
		{
			path: '/shoppingCart',
			name: 'ShoppingCart',
			component: ShoppingCartView,
		},
		{
			path: '/checkout-info',
			name: 'CheckoutInfo',
			component: CheckoutInfoView,
		},
		{
			path: '/checkout-success',
			name: 'CheckoutSuccess',
			component: CheckoutSuccessView,
		},
		{	// 要放根目錄前面，不然會被根目錄先抓走
			path: "/book/:isbn",
			component: book_detail,
			props: true,
		},// http://localhost:8080/search?q=ds&scope=name
		{
			path: '/search',
			name: 'search', // 
			component: search_page
		},
		{
			path: "/author/:name",
			name: 'author',
			component: author_page,
			props: true,
		}, {
			path: "/:sub", //:sub 為動態路由參數
			component: sub_page,
			props: true,
		},
		{
			path: '/test',
			name: 'TestView',
			component: TestView,
		},
		

	],
});

// ✅ 加入導航守衛(管理者未應用)
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
