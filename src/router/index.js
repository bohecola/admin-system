import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 解决路由重复点击报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

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
        path: '/home',
        component: () => import('@/views/home')
      },
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

// 解决切换账户后，不刷新页面仍然是上一账户路由的问题 
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

// 生成动态路由
export const addViews = (list, options) => {
  if (!options) {
    options = {};
  }

  // Parse route config
  list.forEach(e => {
    const d = cloneDeep(e);
    Reflect.set(d, 'meta', { label: e.name });

    // avoid router repeat
    d.name = d.path;

    if (!d.component) {
      const url = d.viewPath;

      if (url) {
        d.component = () => import(`@/${url}`);
      } else {
        d.redirect = '/404';
      }
    }

    router.addRoute('index', d);
  });
}

export default router;
