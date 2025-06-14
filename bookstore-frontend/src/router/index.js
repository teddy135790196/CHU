import Vue from "vue";
import Router from "vue-router";
import ShoppingCart from "@/views/ShoppingCart.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ShopCheckoutInfo from "@/views/ShopCheckoutInfo.vue";
import ShopCheckoutSuccess from "@/views/ShopCheckoutSuccess.vue";
import OrderQuery from "@/views/OrderQuery.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    { path: "/", redirect: "/cart" },
    { path: "/cart", component: ShoppingCart },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/checkout-info", component: ShopCheckoutInfo },
    { path: "/checkout-success", component: ShopCheckoutSuccess },
    { path: "/order-query", component: OrderQuery },
  ],
});

// 路由守衛 (開發測試中暫時禁用)
router.beforeEach((to, from, next) => {
  // const isLogin = localStorage.getItem("isLogin");
  // if (to.path !== "/cart" && to.path !== "/order-query" && !isLogin) {
  //   next("/login");
  // } else {
  //   next();
  // }
  next(); // 直接放行所有路由
});

export default router;
