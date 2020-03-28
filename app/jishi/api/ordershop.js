import { HTTP } from '../utils/http.js'
class OrderShopModel extends HTTP {
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



  PostDataByUpdate(data, res) {
    var params = {
      url: 'order/PostDataByUpdate',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }



  


  GetShopOrderByList(query, res) {
    var params = {
      url: 'ordershop/GetShopOrderByList',//接口路径
      method: 'get', //请求方式
      data: query,
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



  GetShopOrderByUpdate(query,res) {
    var params = {
      url: 'ordershop/GetShopOrderByUpdate',//接口路径
      method: 'get', //请求方式
      data:query,
      success: res
    }
    this.request(params)
  }

  


}
export { OrderShopModel }