import request from '@/utils/request';
// 菜单
export function getMenuList (param) {
  return request({
    url: '/menus',
    method: 'get',
    params: param
  });
}

export function addMenu (data) {
  return request({
    url: '/menus',
    method: 'post',
    data
  });
}

export function updateMenu (param, data) {
  return request({
    url: `/menus/${param}`,
    method: 'put',
    data
  });
}

export function removeMenu (param) {
  return request({
    url: `/menus/${param}`,
    method: 'delete'
  });
}

export function findMenu (param) {
  return request({
    url: `/menus/${param}`,
    method: 'get'
  });
}