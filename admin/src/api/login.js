import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    userName: username,
    password: password
  }
  return request({
    url: '/admin/login/index',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/admin/getuser',
    method: 'post'
  })
}

