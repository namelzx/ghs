import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'admin/Userinterests/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetCategory() {
  return request({
    url: 'admin/Userinterests/GetCategory',
    method: 'get',
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'admin/Userinterests/GetIdByDel',
    method: 'get',
    params: {id}
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'admin/Userinterests/PostDataBySave',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: 'admin/article/update',
    method: 'post',
    data
  })
}
