'use strict'
import Utils from './utils'

var OSS = require('ali-oss')

export default {

  /**
   * 创建随机字符串
   * @param num
   * @returns {string}
   */
  randomString (num) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let res = ''
    for (let i = 0; i < num; i++) {
      var id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },

  /**
   * 创建oss客户端对象
   * @returns {*}
   */
  createOssClient () {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI4G7m7lF5SkXU',
        accessKeySecret: 'PbcsuZTY2CMVPjr1K2DGzMejeotVTI',
        bucket: 'kedand'
      })
      resolve(client)
    })
  },
  /**
   * 文件上传
   * @param option 参考csdn: https://blog.csdn.net/qq_27626333/article/details/81463139
   */
  ossUploadFile (option) {
    let file = option.file
    const self = this
    return new Promise((resolve, reject) => {
      let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
      let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
      let randomStr = self.randomString(4)//  4位随机字符串
      let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
      let fileName = 'video/' + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
      // 执行上传
      self.createOssClient().then(client => {
        // 异步上传,返回数据

        // 上传处理
        // 分片上传文件
        client.multipartUpload(fileName, file, {
          progress: function (p) {
            let e = {}
            e.percent = Math.floor(p * 100)
            // console.log('Progress: ' + p)
            option.onProgress(e)
          }
        }).then((val) => {
          resolve({
            name: file.name,
            url: val.name
          })
          if (val.res.statusCode === 200) {
            option.onSuccess(val)
            return val
          } else {
            option.onError('上传失败')
          }
        }, err => {
          option.onError('上传失败')
          reject(err)
        })
      })
    })
  }
}
