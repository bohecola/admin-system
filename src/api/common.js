import request from '@/utils/request';

// 用户登录
export function login (data) {
  return request({
    url: '/login',
    method: 'post',
    data
  });
}

// 用户信息
export function userInfo() {
  return request({
    url: '/person',
    method: 'get'
  });
}

// 用户信息修改
export function userUpdate(data) {
  return request({
    url: 'personUpdate',
    method: 'post',
    data
  })
}

// 权限菜单
export function permMenu() {
  return request({
    url: 'permmenu',
    method: 'get'
  })
}
