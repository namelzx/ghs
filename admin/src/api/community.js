import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'admin/Community/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetCity() {
  return request({
    url: 'admin/city/GetCity',
    method: 'get',
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'admin/Community/GetIdByDel',
    method: 'get',
    params: {id}
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'admin/Community/PostDataBySave',
    method: 'post',
    data
  })
}
