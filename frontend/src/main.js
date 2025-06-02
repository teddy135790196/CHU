import Vue from 'vue';
import App from './App.vue';
import router from './router';

import '@/assets/styles/base/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin');

  if (to.path === '/admin' && isAdmin) {
    // 已登入狀態下，阻止回登入頁，導向後台首頁
    next('/admin/home');
  } else if (to.meta.requiresAdmin) {
    // 要求管理員權限的頁面
    if (isAdmin) {
      next(); // 允許進入
    } else {
      next('/admin'); // 沒權限，導回登入頁
    }
  } else {
    next(); // 其他頁面直接放行
  }
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
