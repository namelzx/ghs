import { HTTP } from '../utils/http.js'
class OrderModel extends HTTP {
  constructor() {
    super()
  }


  PostDataBycreateOrder(data, res) {
    var params = {
      url: 'order/PostDataBycreateOrder',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }



  PostEvakuteByAdd(data, res) {
    var params = {
      url: 'order/postEvakuteByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }


  


  PostDataByUpdate(data, res) {
    var params = {
      url: 'order/PostDataByUpdate',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }


  GetShopOrderByUpdate(data, res) {
    var params = {
      url: 'order/GetShopOrderByUpdate',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }

  

  GetUserIdByList(query, res) {
    var params = {
      url: 'order/GetUserIdByList',//接口路径
      method: 'get', //请求方式
      data: query ,
      success: res
    }
    this.request(params)
  }




  GetDataByInfo(id, res) {
    var params = {
      url: 'order/GetDataByInfo',//接口路径
      method: 'get', //请求方式
      data: { id },
      success: res
    }
    this.request(params)
  }


  PayLog(data, res) {
    var params = {
      url: 'order/PayLog',//接口路径
      method: 'post', //请求方式
      data: data,
      success: res
    }
    this.request(params)
  }

  


  GetCommunityBylist(res) {
    var params = {
      url: 'Category/GetCommunityBylist',//接口路径
      method: 'get', //请求方式
      success: res
    }
    this.request(params)
  }


}
export { OrderModel }