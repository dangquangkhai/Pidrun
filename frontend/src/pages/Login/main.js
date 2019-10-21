import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import home_router from "../Home/router";
import VeeValidate from "vee-validate";

let api = require("../../assets/js/host");
import { TokenService } from "../../services/storage.service";
let ACC_CONTROLLER = api.getApi() + "/account";
Vue.config.productionTip = false;

Vue.prototype.$api = api;
//config axios
axios.defaults.headers.common["x-access-token"] = TokenService.getToken();
Vue.prototype.$http = axios;

const config = {
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    errorBagName: "errors", // change if property conflicts
    events: "input|blur",
    fieldsBagName: "fields",
    i18n: null, // the vue-i18n plugin instance
    i18nRootKey: "validations", // the nested key under which the validation messages will be located
    inject: true,
    // locale: "en",
    validity: false,
    useConstraintAttrs: true,
    locale: "vi",
    dictionary: {
        vi: {
            messages: {
                _default: field => `Giá trị của ${field} không đúng.`,
                after: (field, [target]) => `${field} phải xuất hiện sau ${target}.`,
                alpha_dash: field =>
                    `${field} có thể chứa các kí tự chữ (A-Z a-z), số (0-9), gạch ngang (-) và gạch dưới (_).`,
                alpha_num: field => `${field} chỉ có thể chứa các kí tự chữ và số.`,
                alpha_spaces: field => `${field} chỉ có thế chứa các kí tự và khoảng trắng`,
                alpha: field =>
                    `${field} chỉ có thể chứa các kí tự chữ cái, không chứa khoảng trắng và không có dấu.`,
                before: (field, [target]) => `${field} phải xuất hiện trước ${target}.`,
                between: (field, [min, max]) =>
                    `${field} phải có giá trị nằm trong khoảng giữa ${min} và ${max}.`,
                confirmed: (field, [confirmedField]) => `${field} khác với ${confirmedField}.`,
                credit_card: field => `Đã điền ${field} không chính xác.`,
                date_between: (field, [min, max]) =>
                    `${field} phải có giá trị nằm trong khoảng giữa  ${min} và ${max}.`,
                date_format: (field, [format]) => `${field} phải có giá trị dưới định dạng ${format}.`,
                decimal: (field, [decimals = "*"] = []) =>
                    `${field} chỉ có thể chứa các kí tự số và sau dấu thập phân ${
            decimals === "*" ? "" : decimals
          } chữ số.`,
                digits: (field, [length]) =>
                    `Trường ${field} chỉ có thể chứa các kí tự số và bắt buộc phải có độ dài là ${length}.`,
                dimensions: (field, [width, height]) =>
                    `${field} phải có chiều rộng ${width} pixels và chiều cao ${height} pixels.`,
                email: field => `Email phải là một địa chỉ email hợp lệ.`,
                ext: field => `${field} phải là một tệp.`,
                image: field => `Trường ${field} phải là một ảnh.`,
                included: field => `${field} phải là một giá trị.`,
                ip: field => `${field} phải là một địa chỉ ip hợp lệ.`,
                max: (field, [length]) => `${field} không thể có nhiều hơn ${length} kí tự.`,
                max_value: (field, [max]) => `${field} phải nhỏ hơn hoặc bằng ${max}.`,
                mimes: field => `${field} phải chứa kiểu tệp phù hợp.`,
                min: (field, [length]) => `${field} phải chứa ít nhất ${length} kí tự.`,
                min_value: (field, [min]) => `${field} phải lớn hơn hoặc bằng ${min}.`,
                excluded: field => `${field} phải chứa một giá trị hợp lệ.`,
                numeric: field => `${field} chỉ có thể có các kí tự số.`,
                regex: field => `${field} có định dạng không đúng.`,
                required: field => `${field.charAt(0).toUpperCase() + field.substring(1)} là bắt buộc.`,
                size: (field, [size]) => `${field} chỉ có thể chứa tệp nhỏ hơn ${formatFileSize(size)}.`,
                url: field => `${field} không phải là một địa chỉ URL hợp lệ.`
            }
        }
    }
};

Vue.use(VeeValidate, config);

let login_page = new Vue({
    router,
    render: h => h(App)
}); //.$mount('#app');

if (TokenService.getToken() == null || TokenService.getToken() == undefined) {
    login_page.$mount("#app");
} else {
    home_router.push({
        name: "home"
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