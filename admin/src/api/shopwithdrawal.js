import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Shopwithdrawal/GetDataByList',
    method: 'get',
    params: query
  })
}

export function PostDataByAudit(data) {
  return request({
    url: '/admin/Shopwithdrawal/PostDataByAudit',
    method: 'post',
    data
  })
}


