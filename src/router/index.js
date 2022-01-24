import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layout';

// const requireModules = require.context('../views', false, /.vue$/);
// const modules = requireModules.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//   modules[moduleName] = requireModules(modulePath).default;
//   return modules;
// }, {});

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home.vue')
      },
      {
        path: '/sys/user',
        name: 'user',
        component: () => import('@/views/user.vue')
      },
      {
        path: '/sys/role',
        name: 'role',
        component: () => import('@/views/role.vue')
      },
      {
        path: '/sys/menu',
        name: 'menu',
        component: () => import('@/views/menu.vue')
      },
      {
        path: '/my/info',
        name: 'info',
        component: () => import('@/views/info.vue')
      }
    ]
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

export default router;
