import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/admin/Salesman/GetDataByList',
    method: 'post',
    data: query
  })
}

export function getinfo(id) {
  return request({
    url: '/admin/Salesman/getinfo',
    method: 'get',
    params: { id }
  })
}

export function modify(data) {
  return request({
    url: '/admin/Salesman/modify',
    method: 'post',
    data
  })
}

export function PostDataPByAdd(data) {
  return request({
    url: '/admin/Salesman/PostDataByAdd',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/admin/Salesman/del',
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
    url: '/admin/Salesman/change',
    method: 'post',
    data
  })
}

export function delAll(data) {
  return request({
    url: '/admin/Salesman/delall',
    method: 'post',
    data
  })
}

export function changeAll(data) {
  return request({
    url: '/admin/Salesman/changeall',
    method: 'post',
    data
  })
}



export function GetSaleByAll() {
  return request({
    url: '/admin/Salesman/GetSaleByAll',
    method: 'get'

  })
}


