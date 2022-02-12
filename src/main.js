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

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';

import Prism from 'prismjs';

Vue.use(ElementUI);

// 过滤器
Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
});

// 工具函数
Vue.prototype.$utils = utils;

// 编辑器
VMdEditor.use(vuepressTheme, {
  Prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});
// VMdEditor.use(createLineNumbertPlugin());

Vue.use(VMdEditor);

Vue.config.productionTip = false;

store.dispatch('appLoad');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
