import { HTTP } from '../utils/http.js'
class SupplierModel extends HTTP {
  constructor() {
    super()
  }
  PostDataByAdd(data, res) {
    var params = {
      url: 'supplier/PostDataByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }
}
export { SupplierModel }