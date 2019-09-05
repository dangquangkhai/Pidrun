import Vue from 'vue';
import Router from 'vue-router';
import Register from './views/Register.vue';

Vue.use(Router);

let register_router = new Router({
  mode: 'history',
  base: "/",
  routes: [{
    path: '/register/index',
    name: 'index',
    component: Register,
  }, ],
});


export default register_router;