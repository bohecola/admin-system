import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '@/layout';

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
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
