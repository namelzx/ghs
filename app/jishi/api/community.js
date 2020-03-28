import { HTTP } from '../utils/http.js'
class CommunityModel extends HTTP {
  constructor() {
    super()
  }



  GetDataBylist( res) {
    var params = {
      url: 'Community/GetDataBylist',//接口路径
      method: 'get', //请求方式
      success: res
    }
    this.request(params)
  }

}
export { CommunityModel }