import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css';
import './assets/css/common.scss';

import './permission';

import * as filters from './utils/filters';
import * as utils from './utils/utils';

Vue.use(ElementUI);

// 过滤器
Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
});

// 工具函数
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
