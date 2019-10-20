import Vue from 'vue';
import Router from 'vue-router';
import Forget from './views/Forget.vue';

Vue.use(Router);

let forget_router = new Router({
  mode: 'history',
  base: "/",
  routes: [{
    path: '/forgetpass/index',
    name: 'index',
    component: Forget,
  }, ],
});


export default forget_router;
