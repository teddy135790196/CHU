import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Product_page from '../views/Product_page.vue'
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
    path: '/sub',
    component: sub_page,
    props:true
  }, 
  {
    path: '/sub/:sub',
    component: sub_page,
    props:true
  },
  {
    path: '/info',
    name: 'Product_page',
    component: Product_page
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
