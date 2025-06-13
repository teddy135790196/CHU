import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/home.vue";
import book_detail from "../views/book_detail.vue";
import sub_page from "../views/sub_page.vue";
Vue.use(VueRouter);

const routes = [
  {
    //首頁
    path: "/",
    component: sub_page, //←到時候要做首頁時，再將sub_page.vue複製出sub_page2.vue後，將sub_page2.vue結合修改首頁的view就行
    props: true,
  },
  // 你可以在這裡添加更多路由
{
    path: "/book/:isbn",
    component: book_detail,
    props: true,
  },
  {
    path: "/:sub",
    component: sub_page,
    props: true,
  },
  
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
