import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import book_detail from '../views/book_detail.vue'
import sub_page from '../views/sub_page.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 你可以在這裡添加更多路由 

  {
    path: '/sub/:sub?',
    component: sub_page,
    props:true
  },
  {
    path: '/info',
    name: 'book_detail',
    component: book_detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
