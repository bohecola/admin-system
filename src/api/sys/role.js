import request from '@/utils/request';
// 角色
export function getRoleList (param) {
  return request({
    url: '/roles',
    method: 'get',
    params: param
  });
}

export function addRole (data) {
  return request({
    url: '/roles',
    method: 'post',
    data
  });
}

export function updateRole (data) {
  return request({
    url: '/roles',
    method: 'put',
    data
  });
}

export function removeRole (param) {
  return request({
    url: '/roles',
    method: 'delete',
    params: param
  });
}

export function findRole (param) {
  return request({
    url: '/roles',
    method: 'get',
    params: param
  });
}