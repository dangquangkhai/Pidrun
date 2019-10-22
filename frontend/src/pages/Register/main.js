import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VeeValidate from "vee-validate";

let api = require("../../assets/js/host");

Vue.config.productionTip = false;

Vue.prototype.$api = api;

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
                _default: field => `Giá trị của ${field.charAt(0).toUpperCase() + field.substring(1)} không đúng.`,
                after: (field, [target]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải xuất hiện sau ${target}.`,
                alpha_dash: field =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} có thể chứa các kí tự chữ (A-Z a-z), số (0-9), gạch ngang (-) và gạch dưới (_).`,
                alpha_num: field => `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể chứa các kí tự chữ và số.`,
                alpha_spaces: field => `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thế chứa các kí tự và khoảng trắng`,
                alpha: field =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể chứa các kí tự chữ cái, không chứa khoảng trắng và không có dấu.`,
                before: (field, [target]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải xuất hiện trước ${target}.`,
                between: (field, [min, max]) =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} phải có giá trị nằm trong khoảng giữa ${min} và ${max}.`,
                confirmed: (field, [confirmedField]) => `${field.charAt(0).toUpperCase() + field.substring(1)} khác với ${confirmedField}.`,
                credit_card: field => `Đã điền ${field.charAt(0).toUpperCase() + field.substring(1)} không chính xác.`,
                date_between: (field, [min, max]) =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} phải có giá trị nằm trong khoảng giữa  ${min} và ${max}.`,
                date_format: (field, [format]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải có giá trị dưới định dạng ${format}.`,
                decimal: (field, [decimals = "*"] = []) =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể chứa các kí tự số và sau dấu thập phân ${
            decimals === "*" ? "" : decimals
          } chữ số.`,
                digits: (field, [length]) =>
                    `Trường ${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể chứa các kí tự số và bắt buộc phải có độ dài là ${length}.`,
                dimensions: (field, [width, height]) =>
                    `${field.charAt(0).toUpperCase() + field.substring(1)} phải có chiều rộng ${width} pixels và chiều cao ${height} pixels.`,
                email: field => `Email phải là một địa chỉ email hợp lệ.`,
                ext: field => `${field.charAt(0).toUpperCase() + field.substring(1)} phải là một tệp.`,
                image: field => `Trường ${field.charAt(0).toUpperCase() + field.substring(1)} phải là một ảnh.`,
                included: field => `${field.charAt(0).toUpperCase() + field.substring(1)} phải là một giá trị.`,
                ip: field => `${field.charAt(0).toUpperCase() + field.substring(1)} phải là một địa chỉ ip hợp lệ.`,
                max: (field, [length]) => `${field.charAt(0).toUpperCase() + field.substring(1)} không thể có nhiều hơn ${length} kí tự.`,
                max_value: (field, [max]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải nhỏ hơn hoặc bằng ${max}.`,
                mimes: field => `${field.charAt(0).toUpperCase() + field.substring(1)} phải chứa kiểu tệp phù hợp.`,
                min: (field, [length]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải chứa ít nhất ${length} kí tự.`,
                min_value: (field, [min]) => `${field.charAt(0).toUpperCase() + field.substring(1)} phải lớn hơn hoặc bằng ${min}.`,
                excluded: field => `${field.charAt(0).toUpperCase() + field.substring(1)} phải chứa một giá trị hợp lệ.`,
                numeric: field => `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể có các kí tự số.`,
                regex: field => `${field.charAt(0).toUpperCase() + field.substring(1)} có định dạng không đúng.`,
                required: field => `${field.charAt(0).toUpperCase() + field.substring(1)} là bắt buộc.`,
                size: (field, [size]) => `${field.charAt(0).toUpperCase() + field.substring(1)} chỉ có thể chứa tệp nhỏ hơn ${formatFileSize(size)}.`,
                url: field => `${field.charAt(0).toUpperCase() + field.substring(1)} không phải là một địa chỉ URL hợp lệ.`
            }
        }
    }
};

Vue.use(VeeValidate, config);

let resgister_page = new Vue({
    router,
    render: h => h(App)
});

resgister_page.$mount("#app");

export default resgister_page;