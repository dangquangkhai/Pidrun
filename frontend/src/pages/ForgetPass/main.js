import Vue from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VeeValidate from 'vee-validate';

let api = require('../../assets/js/host');

Vue.config.productionTip = false;

Vue.prototype.$api = api;

Vue.prototype.$http = axios;
const config = {
  aria: true,
  classNames: {},
  classes: false,
  delay: 0,
  dictionary: null,
  errorBagName: 'errors', // change if property conflicts
  events: 'input|blur',
  fieldsBagName: 'fields',
  i18n: null, // the vue-i18n plugin instance
  i18nRootKey: 'validations', // the nested key under which the validation messages will be located
  inject: true,
  locale: 'en',
  validity: false,
  useConstraintAttrs: true
};

Vue.use(VeeValidate, config);

let forget_page = new Vue({
  router,
  render: h => h(App),
});

forget_page.$mount('#app');

export default forget_page;
