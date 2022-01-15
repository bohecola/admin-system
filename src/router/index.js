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
        name: 'Home',
        component: () => import('@/views/home')
      },
      {
        path: 'sys/user',
        name: 'User',
        component: () => import('@/views/sys/User')
      },
      {
        path: 'sys/role',
        name: 'User',
        component: () => import('@/views/sys/Role')
      },
      {
        path: 'sys/menu',
        name: 'User',
        component: () => import('@/views/sys/Menu')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  }
];

const router = new VueRouter({
  routes
});

export default router
