import request from '@/utils/request';
// 用户
export function getUserPage (param) {
  return request({
    url: '/users',
    method: 'get',
    params: param
  });
}

export function addUser (data) {
  return request({
    url: '/users',
    method: 'post',
    data
  });
}

export function updateUser (param, data) {
  return request({
    url: `/users/${param}`,
    method: 'put',
    data
  });
}

export function removeUser (param) {
  return request({
    url: `/users/${param}`,
    method: 'delete'
  });
}

export function findUser (param) {
  return request({
    url: `/users/${param}`,
    method: 'get'
  });
}