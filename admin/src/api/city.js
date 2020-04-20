import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'admin/city/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetCategory() {
  return request({
    url: 'admin/city/GetCategory',
    method: 'get'
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'admin/city/GetIdByDel',
    method: 'get',
    params: { id }
  })
}

export function City(pid) {
  return request({
    url: 'tools/Citytools/City',
    method: 'get',
    params: { pid }
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'admin/city/PostDataBySave',
    method: 'post',
    data
  })
}
