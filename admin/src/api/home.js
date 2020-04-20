import request from '@/utils/request'

export function GetDataByretail(query) {
  return request({
    url: 'admin/home/GetDataByretail',
    method: 'get',
    params: query
  })
}
