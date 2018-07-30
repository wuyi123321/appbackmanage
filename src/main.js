import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-default/index.css'  // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import store from "store/index"
import $ from 'jquery';
import dateFns from "date-fns"
Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.dateFns = dateFns;

Vue.prototype.url="http://172.30.128.32:8080/swdAPP/common/";
 // Vue.prototype.url="http://appinter.sunwoda.com/common/";
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
