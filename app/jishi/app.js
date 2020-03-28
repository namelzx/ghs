//app.js

var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
qqmapsdk = new QQMapWX({
  key: 'XB2BZ-J7PW3-DIZ3P-YC34A-BWFW7-ELBOI'
});



import {
  UserModel
} from '/api/user.js'

let usermodel = new UserModel();
App({
  onLaunch: function () {
    wx.setNavigationBarTitle({
      title: '社区达人',
    })
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({
      success: res => {
      
        usermodel.postRegistered(res, res => {
          wx.setStorageSync('userinfo', res)
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })


    let locationObj = wx.getStorageSync("locationObj");
    wx.getLocation({
      
      success: function (res) {
        //第三方接口获取城市名字

        let currentLocation = wx.getStorageSync("currentLocation");
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (ret) {
        
            if (ret.status === 0 && ret.result) {
              var currentLocation = {
                city: ret.result.address_component.city,
                district: ret.result.address_component.district,
                adcode: ret.result.ad_info.adcode
              }
              // 当前定位  地址存在currentLocation
              wx.setStorageSync("currentLocation", JSON.stringify(currentLocation))
              if (locationObj) {

              } else {
                // 如果本地没有地址，则把当前定位地址 赋值给选择地址 选择定位
                wx.setStorageSync("locationObj", JSON.stringify(currentLocation))
              }

              let communityObj = wx.getStorageSync("communityObj");

              if (communityObj){

              }else{
                wx.navigateTo({
                  url: '/pages/location/index',
                })
              }
            
           
            }
          },
          fail: function (err) {
            console.log(err);

          }
        });
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
  }
})