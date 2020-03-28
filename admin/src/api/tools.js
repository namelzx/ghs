import request from '@/utils/request'

export function CarBrand() {
  return request({
    url: '/tools/CarTools/CarBrand',
    method: 'get',
  })
}
