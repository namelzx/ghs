import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'admin/Permissions/index',
    method: 'post',
    data: query
  })
}


export function getListAll() {
  return request({
    url: '/admin/Permissions/getLists',
    method: 'post'
  })
}

export function getListorlse(query) {
  return request({
    url: '/admin/Permissions/index',
    method: 'post',
    data: query
  })
}


export function getinfo(id) {
  return request({
    url: '/admin/Permissions/getinfo',
    method: 'get',
    params: { id }
  })
}

export function modify(data) {
  return request({
    url: '/admin/Permissions/modify',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/admin/Permissions/save',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/admin/Permissions/del',
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
    url: '/admin/Permissions/change',
    method: 'post',
    data
  })
}

export function delAll(data) {
  return request({
    url: '/admin/Permissions/delall',
    method: 'post',
    data
  })
}

export function changeAll(data) {
  return request({
    url: '/admin/Permissions/changeall',
    method: 'post',
    data
  })
}
