import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'api/admin/brand/GetDataByList',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: 'api/admin/brand/detail',
    method: 'get',
    params: {id}
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'api/admin/brand/GetIdByDel',
    method: 'get',
    params: {id}
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'api/admin/brand/PostDataBySave',
    method: 'post',
    data
  })
}



export function GetCategory() {
  return request({
    url: 'category/GetCategory',
    method: 'get',
  })
}
