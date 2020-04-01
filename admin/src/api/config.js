import request from '@/utils/request'

export function GetConfigByInfo() {
  return request({
    url: '/admin/Config/GetConfigByInfo',
    method: 'get'

  })
}


export function PostDataByUpdate(data) {
  return request({
    url: '/admin/Config/PostDataByUpdate',
    method: 'post',
    data

  })
}

