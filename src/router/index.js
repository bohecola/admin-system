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
    component: Layout,
    children: [
      {
        path: '/my/info',
        component: () => import('@/views/info')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login')
  }
];

const createRouter = () => new VueRouter({
  routes,
  mode: 'history'
});

const router = createRouter();

// 公共模块
const requireModules = require.context('../views', false, /.vue$/);
const commonViews = requireModules.keys().reduce((views, modulePath) => {
  // request为../views文件夹下面匹配文件的相对路径
  // resolve()传入request，返回这个匹配文件相对于整个工程的相对路径
  // 对返回的路径进行正则处理，得到viewPath
  // 也就是菜单列表中向数据库中存入的viewPath，这样方便通过接口返回的viewPath去匹配相应的组件模块
  const viewPath = requireModules.resolve(modulePath).replace('./src/', '');
  views[viewPath] = requireModules(modulePath);
  return views;
}, {});

// 文章模块
const requireArticleModules = require.context('../article/views', false, /.vue$/);
const articleViews = requireArticleModules.keys().reduce((views, modulePath) => {
  const viewPath = requireArticleModules.resolve(modulePath).replace('./src/', '');
  views[viewPath] = requireArticleModules(modulePath);
  return views;
}, {});

const views = {
  ...commonViews,
  ...articleViews
};

// 解决切换账户后，不刷新页面仍然是上一账户路由的问题 
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

// 生成动态路由
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
