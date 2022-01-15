import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/reset.css';

import './permission';

import * as filters from './utils/filters';

Vue.use(ElementUI);

Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
