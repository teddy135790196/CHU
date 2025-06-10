import Vue from "vue";
import Router from "vue-router";
import ShoppingCart from "@/views/ShoppingCart.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ShopCheckoutInfo from "@/views/ShopCheckoutInfo.vue";
import ShopCheckoutSuccess from "@/views/ShopCheckoutSuccess.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/cart" },
    { 
      path: "/cart", 
      component: ShoppingCart,
      meta: { requiresAuth: false }
    },
    { 
      path: "/login", 
      component: Login,
      meta: { guest: false }
    },
    { 
      path: "/register", 
      component: Register,
      meta: { guest: false }
    },
    { 
      path: "/checkout-info", 
      component: ShopCheckoutInfo,
      meta: { requiresAuth: false }
    },
    { 
      path: "/checkout-success", 
      component: ShopCheckoutSuccess,
      meta: { requiresAuth: false }
    },
  ],
});

// 路由守衛 - 開發測試階段暫時註釋掉
/*
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("isLogin");
  
  // 需要登入的路由
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLogin) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  }
  // 訪客路由（已登入用戶不能訪問）
  else if (to.matched.some(record => record.meta.guest)) {
    if (isLogin) {
      next('/cart');
    } else {
      next();
    }
  }
  // 其他路由
  else {
    next();
  }
});
*/

// 開發測試階段：直接放行所有路由
router.beforeEach((to, from, next) => {
  console.log('路由跳轉：', { from: from.path, to: to.path });
  next();
});

export default router;
