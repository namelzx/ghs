import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'admin/Evaluate/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetIdByDel(data) {
  return request({
    url: 'admin/Evaluate/GetIdByDelete',
    method: 'post',
    data
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
