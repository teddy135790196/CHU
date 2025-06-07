import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Product_page from '../views/Product_page.vue'
import novels from '../views/novels.vue'
// import Product_page from '../views/Product_page'
// import Product_page from '../views/Product_page'
// import Product_page from '../views/Product_page'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 你可以在這裡添加更多路由 
  {
    path: '/Product_page',
    name: 'Product_page',
    component: Product_page
  },  {
    path: '/novels',
    name: 'novels',
    component: novels
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
