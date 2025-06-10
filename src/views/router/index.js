import { createRouter, createWebHistory } from 'vue-router'
import ShopCheckoutInfo from '../views/ShopCheckoutInfo.vue'
import ShopCheckoutSuccess from '../views/ShopCheckoutSuccess.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/ShoppingCart.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: ShopCheckoutInfo
  },
  {
    path: '/checkout/:orderId',
    name: 'CheckoutSuccess',
    component: ShopCheckoutSuccess,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 添加導航守衛來處理路由錯誤
router.beforeEach((to, from, next) => {
  console.log('路由跳轉：', { from: from.path, to: to.path });
  next();
});

router.onError((error) => {
  console.error('路由錯誤：', error);
});

export default router 