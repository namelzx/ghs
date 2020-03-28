import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Order/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetIdByOrderLog(id) {
  return request({
    url: '/admin/Order/GetIdByOrderLog',
    method: 'get',
    params: { id }
  })
}

export function PostDataByAdd(data) {
  return request({
    url: '/admin/Order/PostDataByAdd',
    method: 'post',
    data
  })
}

export function PostNoteByAdd(data) {
  return request({
    url: '/admin/Order/PostNoteByAdd',
    method: 'post',
    data
  })
}

//回访售后添加
export function PostDataBySale(data) {
  return request({
    url: '/admin/Order/PostDataBySale',
    method: 'post',
    data
  })
}

//退货
export function PostReturnedByAdd(data) {
  return request({
    url: '/admin/Order/PostReturnedByAdd',
    method: 'post',
    data
  })
}

//获取售后数据

export function GetTypeBySale(query) {
  return request({
    url: '/admin/Order/GetTypeBySale',
    method: 'get',
    params: query
  })
}

export function del(temp) {
  return request({
    url: '/admin/Order/GetIdByDelete',
    method: 'get',
    params:temp
  })
}

export function GetQueryBydownload(query) {
  return request({
    url: '/admin/Order/GetQueryBydownload',
    method: 'get',
    params: query
  })
}











