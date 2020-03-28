export default {

  // 应用appid
  appid: 'ty9fd2848a039ab554',

  // 应用秘钥
  appSecret: 'ec32286d0718118861afdbf6e401ee81',

  // 配置显示在浏览器标签的title
  title: '安亿士-后台',
  oss_url: 'https://j-code.oss-cn-hangzhou.aliyuncs.com/',

  // token在Cookie中存储的天数，默认1天
  cookieExpires: 1,

  // oss服务地址
  VUE_APP_BASE_IMG_OSS : 'https://kedand.oss-cn-beijing.aliyuncs.com/',

  // api请求基础路径,注意和代理配合使用
  baseUrl: {
    dev: 'http://aystest.10huisp.com',
    pro: 'http://aystest.10huisp.com/'
  },
  // 上传路径
  uploadUrl: {
    img: 'https://ch.10huisp.com/admin/Upload/upimage',
    video: 'https://ch.10huisp.com/admin/Upload/upvideo',
    file: ''
  }

}
