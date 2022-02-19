import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import base from './base';

NProgress.configure({ showSpinner: false });


const service = axios.create({
  baseURL: base,
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

    if (data.message) Message.error(data.message);
    
    return data;
  },

  async (error) => {
    NProgress.done();
    if (error.response) {
      console.log(error.response);
      const { status, config, data } = error.response;

      switch (status) {
        case 401:
          await store.dispatch('user/logout');
          Message('登录已过期');
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
          if (data.message) Message.error(data.message)
          console.log(status, config.url);
      }
    }

    return Promise.reject(error);
  }
);

export default service;
