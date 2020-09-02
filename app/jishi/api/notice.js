import { HTTP } from '../utils/http.js'
class NoticeModel extends HTTP {
  constructor() {
    super()
  }
  GetDataByNotice( temp,res) {
    var params = {
      url: 'Notice/GetDataByNotice',//接口路径
      method: 'get', //请求方式
      data:temp,
      success: res
    }
    this.request(params)
  }

}
export { NoticeModel }