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

export function updateRole (param, data) {
  return request({
    url: `/roles/${param}`,
    method: 'put',
    data
  });
}

export function removeRole (param) {
  return request({
    url: `/roles/${param}`,
    method: 'delete',
  });
}

export function findRole (param) {
  return request({
    url: `/roles/${param}`,
    method: 'get',
  });
}