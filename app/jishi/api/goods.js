import { HTTP } from '../utils/http.js'
class GoodsModel extends HTTP {
  constructor() {
    super()
  }


  GetDataByList(query,res) {
    var params = {
      url: 'Goods/GetDataByList',//接口路径
      method: 'get', //请求方式
      data: query,
      success: res
    }
    this.request(params)
  }


  PostDataByAdd(data, res) {
    var params = {
      url: 'Goods/PostDataByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }

  



  GetDataByInfo(id, res) {
    var params = {
      url: 'Goods/GetDataByInfo',//接口路径
      method: 'get', //请求方式
      data: {id},
      success: res
    }
    this.request(params)
  }


  GetGoodsEvaByList(id, res) {
    var params = {
      url: 'Goods/GetGoodsEvaByList',//接口路径
      method: 'get', //请求方式
      data: {id},
      success: res
    }
    this.request(params)
  }

  

  GetDataByGooslist(id,res) {
    var params = {
      url: 'Goods/GetDataByGooslist',//接口路径
      method: 'get', //请求方式
      data: { id },
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
export { GoodsModel }