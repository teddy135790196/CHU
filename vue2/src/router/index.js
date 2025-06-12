import Vue from "vue";
import VueRouter from "vue-router";
import MyIndex from "../components/MyIndex.vue";
import MyProduct from "../components/MyProduct.vue";
import MyUser from "../components/MyUser.vue";
import ShoppingCart from "../components/ShoppingCart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: MyIndex,
  },

  {
    path: "/MyProduct",
    name: "MyProduct",
    component: MyProduct,
  },

  {
    path: "/MyUser",
    name: "MyUser",
    component: MyUser,
  },

  {
    path: "/ShoppingCart",
    name: "ShoppingCart",
    component: ShoppingCart,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
