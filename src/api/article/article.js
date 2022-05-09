import request from '@/utils/request';
// 文章目录
export function getArticlePage (param) {
  return request({
    url: '/articles',
    method: 'get',
    params: param
  });
}

export function addArticle (data) {
  return request({
    url: '/articles',
    method: 'post',
    data
  });
}

export function updateArticle (param, data) {
  return request({
    url: `/articles/${param}`,
    method: 'put',
    data
  });
}

export function removeArticle (param) {
  return request({
    url: `/articles/${param}`,
    method: 'delete'
  });
}

export function findArticle (param) {
  return request({
    url: `/articles/${param}`,
    method: 'get'
  });
}