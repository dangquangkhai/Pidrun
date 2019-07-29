import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: "/",
  routes: [{
    path: '/login/index',
    name: 'index',
    component: Login,
  }, ],
});
