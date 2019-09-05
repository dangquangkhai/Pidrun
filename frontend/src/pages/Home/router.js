import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import {
  TokenService
} from '../../services/storage.service';
let api = require('../../assets/js/host');
import login_router from '../Login/router';
Vue.use(Router);

let home_router = new Router({
  mode: 'history',
  base: "/",
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      alias: ['/home', "/home/index"]
    },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: Home,
    // },
    // {
    //   path: '/home/index',
    //   name: 'home',
    //   component: Home,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import( /* webpackChunkName: "about" */ './views/About.vue'),
    // },
    // {
    //   path: '/logim',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import( /* webpackChunkName: "about" */ './views/Login.vue'),
    // },
  ],
});

export default home_router;
