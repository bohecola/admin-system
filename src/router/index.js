import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layout';

import { cloneDeep } from '@/utils/utils';

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Layout
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login')
  }
];

const router = new VueRouter({
  routes,
  mode:  'history'
});

const requireModules = require.context('../views', false, /.vue$/);

const views = requireModules.keys().reduce((views, modulePath) => {
  // request为../views文件夹下面匹配文件的相对路径
  // resolve()传入request，返回这个匹配文件相对于整个工程的相对路径
  // 对返回的路径进行正则处理，得到viewPath
  // 也就是菜单列表中向数据库中存入的viewPath，这样方便通过接口返回的viewPath去匹配相应的组件模块
  const viewPath = requireModules.resolve(modulePath).replace('./src/', '');
  views[viewPath] = requireModules(modulePath);
  return views;
}, {});

export const addViews = (list, options) => {
  if (!options) {
    options = {}
  }

  // Parse route config
  list.forEach(e => {
    const d = cloneDeep(e);

    // avoid router repeat
    d.name = d.path;

    if (!d.component) {
      const url = d.viewPath;

      if (url) {
        d.component = () => Promise.resolve(views[url])
      } else {
        d.redirect = '/404';
      }
    }

    router.addRoute('index', d);
  });
}

export default router;
