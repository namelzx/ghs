import { HTTP } from '../utils/http.js'
class CategoryModel extends HTTP {
  constructor() {
    super()
  }


  GetCategoryByList(res) {
    var params = {
      url: 'Category/GetCategoryByList',//接口路径
      method: 'get', //请求方式
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
export { CategoryModel }