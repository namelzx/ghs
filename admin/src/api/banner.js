import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'admin/banner/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetCity() {
  return request({
    url: 'admin/banner/GetCity',
    method: 'get',
  })
}

export function GetIdByDel(id) {
  return request({
    url: 'admin/banner/GetIdByDel',
    method: 'get',
    params: {id}
  })
}


export function getHomeAdvertise(id) {
  return request({
    url: 'admin/banner/getHomeAdvertise',
    method: 'get',
    params: {id}
  })
}



export function PostDataBySave(data) {
  return request({
    url: 'admin/banner/PostDataBySave',
    method: 'post',
    data
  })
}
