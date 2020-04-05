import { HTTP } from '../utils/http.js'
class CityModel extends HTTP {
  constructor() {
    super()
  }


  GetCity(res) {
    var params = {
      url: 'city/GetCity',//接口路径
      method: 'get', //请求方式
      success: res
    }
    this.request(params)
  }


  GetCommunityBylist(res) {
    var params = {
      url: 'city/GetCommunityBylist',//接口路径
      method: 'get', //请求方式
      success: res
    }
    this.request(params)
  }

  GetByCitylist(id,res) {
    var params = {
      url: 'city/GetByCitylist',//接口路径
      method: 'get', //请求方式
      data: { id },
      success: res
    }
    this.request(params)
  }
}
export { CityModel }