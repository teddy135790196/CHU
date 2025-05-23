// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')


// src/main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// 引入全域樣式
import '@/assets/styles/base/main.css';



Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');

