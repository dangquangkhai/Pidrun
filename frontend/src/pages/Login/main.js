import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import home_router from '../Home/router';

let api = require('../../assets/js/host');
import { TokenService } from '../../services/storage.service'; 
let ACC_CONTROLLER = api.getApi() + "/account";
Vue.config.productionTip = false;

Vue.prototype.$api = api;
//config axios
axios.defaults.headers.common["x-access-token"] = TokenService.getToken();
Vue.prototype.$http = axios;


let login_page = new Vue({
  router,
  render: h => h(App),
}); //.$mount('#app');

if (TokenService.getToken() == null || TokenService.getToken() == undefined) {
  login_page.$mount('#app');
} else {
  home_router.push({
    name: 'home'
  });
  location.reload();
}
// axios.post(ACC_CONTROLLER + "/IsLoged").then(val => {
//   if (val.data.status == "error") {
//     login_page.$mount('#app');
//   }
//   else{
//     home_router.push({name: 'home'});
//     location.reload();
//   }
// }).catch(err => {
//   console.log(err.data.message);
//   login_page.$mount('#app');
// })

export default login_page;
