import request from '@/utils/request';
// 文章目录
export function getTagPage (param) {
  return request({
    url: '/tags',
    method: 'get',
    params: param
  });
}

export function getTagList (param) {
  return request({
    url: '/tags-list',
    method: 'get',
    params: param
  });
}

export function addTag (data) {
  return request({
    url: '/tags',
    method: 'post',
    data
  });
}

export function updateTag (param, data) {
  return request({
    url: `/tags/${param}`,
    method: 'put',
    data
  });
}

export function removeTag (param) {
  return request({
    url: `/tags/${param}`,
    method: 'delete'
  });
}

export function findTag (param) {
  return request({
    url: `/tags/${param}`,
    method: 'get'
  });
}