import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import { TokenService } from '../../services/storage.service'; 

let api = require('../../assets/js/host');
import login_router from '../Login/router';
let ACC_CONTROLLER = api.getApi() + "/account"; 

Vue.config.productionTip = false;

Vue.prototype.$api = api;

//config axios
axios.defaults.headers.common["x-access-token"] = TokenService.getToken();


Vue.prototype.$http = axios;

let home_page = new Vue({
  router,
  render: h => h(App),
  mounted() {},
});
if (TokenService.getToken() != null || TokenService.getToken() != undefined) {
  home_page.$mount('#app');
}
else{
  login_router.push({name: 'index'});
    location.reload();
}

// axios.post(ACC_CONTROLLER + "/IsLoged").then(val => {
//   if(val.data.status == "success")
//   {
//     home_page.$mount('#app');
//   }
//   else{
//     login_router.push({name: 'index'});
//     location.reload();
//   }
// });

export default home_page;
