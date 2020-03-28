const env = require('./oss.js');

const Base64 = require('./Base64.js');//Base64,hmac,sha1,crypto相关算法
//参考这里https://github.com/peterhuang007/weixinFileToaliyun.git

require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');


const uploadFile = function (filePath ,successc, failc) {
  console.log(filePath)
  
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }
  if (filePath.suffix===undefined){
    filePath.suffix='.jpg'
  }

  const aliyunFileKey = filePath.dir + '' + (new Date().getTime()) + '_' + filePath.suffix;
  //const aliyunFileKey = fileW 
  const aliyunServerURL = env.uploadImageUrl;//OSS地址，需要https
  const accessid = env.OSSAccessKeyId;
  
  const policyBase64 = getPolicyBase64();
  const signature = getSignature(policyBase64);//获取签名

  wx.uploadFile({
    url: aliyunServerURL,
    filePath: filePath.filePath,
    name: 'file',//必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'signature': signature,
      'success_action_status': '200',
    },
    success: function (res) {
      console.log(res)
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
    
      filePath.success(aliyunFileKey);
      // filePath.
    },
    fail: function (err) {

      err.wxaddinfo = aliyunServerURL;
      console.log(err)
      filePath.failc(err);
    },
  })
}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + env.timeout);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 200 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };

  const policyBase64 = Base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  const accesskey = env.AccessKeySecret;

  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);

  return signature;
}

module.exports = uploadFile;