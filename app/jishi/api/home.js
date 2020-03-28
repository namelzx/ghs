import { HTTP } from '../utils/http.js'
class HomeModel extends HTTP {
  constructor() {
    super()
  }
  GetAppByHomer( res) {
    var params = {
      url: 'home/GetappByHome',//接口路径
      method: 'get', //请求方式
      success: res
    }
    this.request(params)
  }

}
export { HomeModel }