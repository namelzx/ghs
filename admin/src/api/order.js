import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Order/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetIdByDetails(id) {
  return request({
    url: '/admin/Order/GetIdByDetails',
    method: 'get',
    params: { id }
  })
}


export function deliveryOrder(data) {
  return request({
    url: '/admin/Order/deliveryOrder',
    method: 'post',
    data
  })
}












