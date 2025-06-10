// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import ShoppingCart from "@/views/ShoppingCart.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ShopCheckoutInfo from "@/views/ShopCheckoutInfo.vue";
import ShopCheckoutSuccess from "@/views/ShopCheckoutSuccess.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { 
      path: "/", 
      name: "home",
      component: Home,
      meta: { requiresAuth: false }
    },
    { 
      path: "/cart", 
      name: "cart",
      component: ShoppingCart,
      meta: { requiresAuth: false }
    },
    { 
      path: "/login", 
      name: "login",
      component: Login,
      meta: { guest: true }
    },
    { 
      path: "/register", 
      name: "register",
      component: () => import("@/views/Register.vue"),
      meta: { 
        requiresAuth: false,
        guest: true
      }
    },
    { 
      path: "/checkout-info", 
      name: "checkout-info",
      component: ShopCheckoutInfo,
      meta: { requiresAuth: false }
    },
    { 
      path: "/checkout-success", 
      name: "checkout-success",
      component: ShopCheckoutSuccess,
      meta: { requiresAuth: false }
    },
    // 404 頁面
    {
      path: "*",
      redirect: "/"
    }
  ],
});

// 開發測試階段的路由守衛
router.beforeEach((to, from, next) => {
  console.log('路由跳轉：', { from: from.path, to: to.path });
  
  // 檢查路由是否存在
  if (to.matched.length === 0) {
    console.warn('路由不存在：', to.path);
    next('/');
    return;
  }
  
  // 開發階段：記錄路由訪問
  const isLogin = localStorage.getItem("isLogin");
  console.log('當前登入狀態：', isLogin ? '已登入' : '未登入');
  
  next();
});

export default router;
