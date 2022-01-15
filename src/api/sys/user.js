import request from '@/utils/request';
// 用户
export function getUserList (param) {
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

export function updateUser (data) {
  return request({
    url: '/users',
    method: 'put',
    data
  });
}

export function removeUser (param) {
  return request({
    url: '/users',
    method: 'delete',
    params: param
  });
}

export function findUser (param) {
  return request({
    url: '/users',
    method: 'get',
    params: param
  });
}