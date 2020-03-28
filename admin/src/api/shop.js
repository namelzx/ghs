import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/admin/shop/GetAuditShopByList',
    method: 'post',
    data: query
  })
}

export function GetInstallByList(query) {
  return request({
    url: '/admin/shop/GetInstallByList',
    method: 'get',
    params: query
  })
}

//管理店铺
export function GetDataByList(query) {
  return request({
    url: '/admin/shop/GetDataByList',
    method: 'get',
    params: query
  })
}

export function PostDataByAudit(data) {
  return request({
    url: '/admin/shop/PostDataByAudit',
    method: 'post',
    data
  })
}

//获取所有门店
export function GetDataByShopAll() {
  return request({
    url: '/admin/shop/GetDataByAll',
    method: 'post'
  })
}

export function PostDataByUpdate(data) {
  return request({
    url: '/admin/shop/PostDataByUpdate',
    method: 'post',
    data
  })
}

export function PostDataBybalance(data) {
  return request({
    url: '/admin/shop/PostDataBybalance',
    method: 'post',
    data
  })
}

//店铺流水
export function GetShopByRunning(query) {
  return request({
    url: '/admin/shop/GetShopByRunning',
    method: 'get',
    params: query
  })
}

export function GetEnvByList(query) {
  return request({
    url: '/admin/shop/GetEnvByList',
    method: 'get',
    params: query
  })
}

export function PostDataByUpBind(data) {
  return request({
    url: '/admin/shop/PostDataByUpBind',
    method: 'post',
    data
  })
}

export function GetIDByDetails(id) {
  return request({
    url: '/admin/shop/GetIDByDetails',
    method: 'get',
    params: { id }
  })
}


export function GetProjectByList(id) {
  return request({
    url: '/admin/shop/GetProjectByList',
    method: 'get',
    params: { id }
  })
}


export function GetProjectByAdd(data) {
  return request({
    url: '/admin/shop/GetProjectByAdd',
    method: 'post',
    data
  })
}




export function PostBussByUpdate(data) {
  return request({
    url: '/admin/shop/PostBussByUpdate',
    method: 'post',
    data
  })
}




export function GetProjectByDel(id) {
  return request({
    url: '/admin/shop/GetProjectByDel',
    method: 'get',
    params: { id }
  })
}




export function GetProjectBy(id) {
  return request({
    url: '/admin/shop/GetProjectBy',
    method: 'get',
    params: { id }
  })
}







