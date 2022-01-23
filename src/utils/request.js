import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';

NProgress.configure({ showSpinner: false });

const service = axios.create({
  baseURL: 'Http://localhost:3000/api',
  timeout: 5000
});

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken();
    }
    NProgress.start();
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  res => {
    NProgress.done();
    const { data } = res;
    return data;
  },
  async (error) => {
    NProgress.done();
    if (error.response) {
      const { status, config } = error.response;

      switch (status) {
        case 401:
          await store.dispatch('user/logout');
          Message('登录已过期')
          router.push('/login');
          break;
        case 403:
          // ...
          Message(`${config.url} 无权限访问`)
          break;

        case 404:
          break;

        case 500:
          // ...
          break;
        
        case 502:
          // ...
          break;
        
        default:
          console.log(status, config.url);
      }
    }

    return Promise.reject(error);
  }
);

export default service;
