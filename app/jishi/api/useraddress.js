import { HTTP } from '../utils/http.js'
class UserAdderssModel extends HTTP {
  constructor() {
    super()
  }


  


  PostDataByAdd(data, res) {
    var params = {
      url: 'Useraddress/PostDataByAdd',//接口路径
      method: 'post', //请求方式
      data,
      success: res
    }
    this.request(params)
  }




  //请求地址列表
  GetDataByUseradderss(id, res) {
    var params = {
      url: 'Useraddress/GetDataByUseradderss',//接口路径
      method: 'get', //请求方式
      data: { id },
      success: res
    }
    this.request(params)
  }


  




  // GetCommunityBylist(res) {
  //   var params = {
  //     url: 'Category/GetCommunityBylist',//接口路径
  //     method: 'get', //请求方式
  //     success: res
  //   }
  //   this.request(params)
  // }


}
export { UserAdderssModel }