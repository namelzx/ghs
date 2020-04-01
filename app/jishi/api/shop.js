import { HTTP } from '../utils/http.js'
class ShopModel extends HTTP {
  constructor() {
    super()
  }
  PostDataByAdd(data,res) {
    var params = {
      url: 'shop/PostDataByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }

  PostDataByWithdrawal(data, res) {
    var params = {
      url: 'shop/PostDataByWithdrawal',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }

  

  GetUserIdByInfo(user_id, res) {
    var params = {
      url: 'shop/GetUserIdByInfo',//接口路径
      method: 'get', //请求方式
      data: { user_id },
      success: res
    }
    this.request(params)
  }


  GetMoneyByLog(shop_id, res) {
    var params = {
      url: 'shop/GetMoneyByLog',//接口路径
      method: 'get', //请求方式
      data: { shop_id },
      success: res
    }
    this.request(params)
  }
  

  


  GetShoplistInfo(query, res) {
    var params = {
      url: 'shop/GetShoplistInfo',//接口路径
      method: 'get', //请求方式
      data: query,
      success: res
    }
    this.request(params)
  }


  GetShopHomeByData(user_id, res) {
    var params = {
      url: 'shop/GetShopHomeByData',//接口路径
      method: 'get', //请求方式
      data: { user_id},
      success: res
    }
    this.request(params)
  }


  PostAudheByAdd(data, res) {
    var params = {
      url: 'shop/PostAudheByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }

  CheUserByAudhe(user_id, res) {
    var params = {
      url: 'shop/CheUserByAudhe',//接口路径
      method: 'get', //请求方式
      data: { user_id },
      success: res
    }
    this.request(params)
  }
  
  
  

  
}
export { ShopModel }