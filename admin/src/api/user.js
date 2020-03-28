import request from '@/utils/request'

export function login(data) {
  console.log(11)
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/admin/getuser',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/admin/logout',
    method: 'post'
  })
}
