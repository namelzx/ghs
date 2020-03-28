import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'api/admin/category/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetCategory() {
  return request({
    url: 'api/admin/category/GetCategory',
    method: 'get',
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'api/admin/category/GetIdByDel',
    method: 'get',
    params: {id}
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'api/admin/category/PostDataBySave',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: 'api/admin/article/update',
    method: 'post',
    data
  })
}
