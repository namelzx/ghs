var fileHost = "xxxx.aliyuncs.com(你的阿里云oss地址)"
var config = {
  //aliyun OSS config
  uploadImageUrl: `https://kedand.oss-cn-beijing.aliyuncs.com`, //默认存在根目录，可根据需求改
  AccessKeySecret: 'PbcsuZTY2CMVPjr1K2DGzMejeotVTI',
  OSSAccessKeyId: 'LTAI4G7m7lF5SkXU',
  timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config