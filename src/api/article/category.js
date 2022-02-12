import request from '@/utils/request';
// 文章目录
export function getCategoryList (param) {
  return request({
    url: '/category',
    method: 'get',
    params: param
  });
}

export function addCategory (data) {
  return request({
    url: '/category',
    method: 'post',
    data
  });
}

export function updateCategory (param, data) {
  return request({
    url: `/category/${param}`,
    method: 'put',
    data
  });
}

export function removeCategory (param) {
  return request({
    url: `/category/${param}`,
    method: 'delete'
  });
}

export function findCategory (param) {
  return request({
    url: `/category/${param}`,
    method: 'get'
  });
}