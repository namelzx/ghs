import request from '@/utils/request'

export function GetDataByList(query) {
  return request({
    url: 'api/admin/goods/GetDataByList',
    method: 'get',
    params: query
  })
}

export function GetIdByDetails(id) {
  return request({
    url: 'api/admin/goods/GetIdByDetails',
    method: 'get',
    params: {id}
  })
}

export function PostDataBySave(data) {
  return request({
    url: 'api/admin/goods/PostDataBySave',
    method: 'post',
    data
  })
}




export function GetCategoryIdByItems(id) {
  return request({
    url: 'api/admin/brand/GetCategoryIdByItems',
    method: 'get',
    params: {id}
  })
}



export function change(id, field, value) {
  const data = {
    val: id,
    field: field,
    value: value
  }
  return request({
    url: '/admin/goods/change',
    method: 'post',
    data
  })
}


export function changeAll(data) {
  return request({
    url: '/admin/goods/changeall',
    method: 'post',
    data
  })
}


export function delAll(data) {
  return request({
    url: '/admin/goods/delall',
    method: 'post',
    data
  })
}


export function del(id) {
  return request({
    url: '/admin/goods/del',
    method: 'get',
    params: { id }
  })
}

