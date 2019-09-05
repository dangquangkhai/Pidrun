import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import {
  TokenService
} from '../../services/storage.service';
let api = require('../../assets/js/host');
import home_router from '../Home/router';

Vue.use(Router);

let login_router = new Router({
  mode: 'history',
  base: "/",
  routes: [{
    path: '/login/index',
    name: 'index',
    component: Login,
  }, ],
});

//export login router to Vue and NodeJs by 2 command bellow
export default login_router;
