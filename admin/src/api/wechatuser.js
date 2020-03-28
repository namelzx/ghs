import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: '/admin/Wechatuser/GetDataByList',
    method: 'get',
    params: query
  })
}


export function GetOpenidByFind(openid) {
  return request({
    url: '/admin/Wechatuser/GetOpenidByFind',
    method: 'get',
    params: {openid}
  })
}




export function PostRoleByUpdate(data) {
  return request({
    url: '/admin/Wechatuser/PostRoleByUpdate',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/admin/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/admin/admin/del',
    method: 'get',
    params: { id }
  })
}

export function change(id, field, value) {
  const data = {
    val: id,
    field: field,
    value: value
  }
  return request({
    url: '/admin/admin/change',
    method: 'post',
    data
  })
}

export function delAll(data) {
  return request({
    url: '/admin/admin/delall',
    method: 'post',
    data
  })
}

export function changeAll(data) {
  return request({
    url: '/admin/admin/changeall',
    method: 'post',
    data
  })
}


