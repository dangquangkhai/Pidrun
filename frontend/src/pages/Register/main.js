import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

let api = require('../../assets/js/host');

Vue.config.productionTip = false;

Vue.prototype.$api = api;

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
