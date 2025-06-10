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
    { path: "/cart", component: ShoppingCart },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/checkout-info", component: ShopCheckoutInfo },
    { path: "/checkout-success", component: ShopCheckoutSuccess },
  ],
});

// 路由守衛
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.getItem("isLogin");
  if (to.path === "/cart" && !isLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
