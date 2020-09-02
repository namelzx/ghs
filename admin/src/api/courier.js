
import request from '@/utils/request'

export function getlistcourier(query) {
  return request({
    url: 'api/Courier/getlist',
    method: 'get',
    params: query
  })
}
