import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

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
    console.log(error)
    NProgress.done();
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    NProgress.done();
    const res = response.data;
    return res;
  },
  error => {
    console.log('err' + error);
    NProgress.done();
    return Promise.reject(error);
  }
)

export default service;