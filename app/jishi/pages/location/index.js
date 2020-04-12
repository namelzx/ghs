// page/index/pages/location/location.js
// const data = require("./data.js");
// const wxApi = require("../../../../utils/wxApi.js");
// const UtilActions = require("../../class/utilActions.js");
// let utilActions = new UtilActions;


import {
  CityModel
} from '../../api/city.js'

let cityModel = new CityModel();
//获取应用实例
const app = getApp()
var userMs = app.userMs;
// var config = userMs.config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  tosearch(){
    wx.navigateTo({
      url: '/pages/location/communitySearch/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '社区达人',
    })

  },
  getLocationHandler: function () {
    let _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        _this.latitude = res.latitude
        _this.longitude = res.longitude
        // 先拿到本地经纬度，再请求接口获取社区列表，再循环计算距离
        _this.onFetchCanSelectCommunity();
      },
      fail(err) {
        _this.setData({
          'state.needLocation': true,
        })
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 当前选择定位
    let locationObj = wx.getStorageSync("locationObj");
    if (locationObj) {
      this.setData({
        "state.locationObj": JSON.parse(locationObj),
      })
      this.getLocationHandler();
      
    }
    // 选择社区
    let communityObj = wx.getStorageSync("communityObj");
    if (communityObj) {
      this.setData({
        "state.communityObj": JSON.parse(communityObj),
      })
    }
    // 微信定位
    let currentLocation = wx.getStorageSync("currentLocation");
    if (currentLocation) {
      this.setData({
        "state.currentLocation": JSON.parse(currentLocation),
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
  onGoToComSearchHandler: function () {
    wx.navigateTo({
      url: '../communitySearch/communitySearch',
    })
  },
  onGoToLoCityHandler: function () {
    wx.navigateTo({
      url: '/pages/location/locationCity/locationCity',
    })
  },
  // 获取可选小区
  onFetchCanSelectCommunity: function () {
    let _this = this;
    // let url = `${config.ApiRoot}/store/list`
    let locationObj = this.data.state.locationObj;
    let queryObj = {
      adcode: locationObj.adcode
    };
    // if (locationObj.com) {
    //   queryObj.community_id = locationObj.com.id
    // }
    let data = {
      header: {
        "version": '1'
      },
      // url,
      data: queryObj
    }
    var temp = {
      city: locationObj.city
    }
    cityModel.GetCommunityBylist(temp,res=>{

      res.data.forEach(item => {
        item.distance = _this.distance(_this.latitude, _this.longitude, item.lat, item.lng)
      })
      res.data.sort(_this.compareArrBySort("distance"))
      this.setData({
        "data.coms": res.data
      })
    
    })
    // wx.showLoading({
    //   title: '加载中',
    // })
    //   .then(res => {
    //     const { data, code, msg } = res.data
    //     if (code == 10000) {
    //       data.data.forEach(item => {
    //         item.distance = _this.distance(_this.latitude, _this.longitude, item.latitude, item.longitude)
    //       })
    //       data.data.sort(_this.compareArrBySort("distance"))
    //       this.setData({
    //         "data.coms": data.data
    //       })
    //     } else {
    //       throw res;
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    //   .finally(res => {
    //     wx.hideLoading();
    //   })
  },
  distance: function (la1, lo1, la2, lo2) {
    la1 = la1 || 0;
    lo1 = lo1 || 0;
    la2 = la2 || 0;
    lo2 = lo2 || 0;

    var La1 = la1 * Math.PI / 180.0;

    var La2 = la2 * Math.PI / 180.0;

    var La3 = La1 - La2;

    var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));

    s = s * 6378137;//地球半径

    s = Math.round(s / 1000);
    return s

    // console.log("计算结果",s)

  },
  compareArrBySort: function (property) {
    return function (a, b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
  },
  onSelectComHandler: function (e) {
    const index = e.currentTarget.dataset.index;
    let selectObj = this.data.data.coms[index];
    // let locationObj= this.data.state.locationObj;

    // app.globalData.onChangeLocationStatus = true; // 触发首页刷新字段
    wx.setStorageSync("communityObj", JSON.stringify(selectObj))
    app.globalData.onChangeCommunityStatus = true;
    // if(locationObj.com) {
    //   // 如果当前选择的小区跟本地保存的小区已经一样
    //   if(locationObj.com.id ==selectObj.id ){

    //   }else{
    //     app.globalData.onChangeLocationStatus = true
    //   }
    // }else{
    //   app.globalData.onChangeLocationStatus = true
    // }
    // 重置掉，是怕数据库改了小区名称等
    // locationObj.com = selectObj;
    // wx.removeStorageSync("last_user_store_id");
    // wx.setStorageSync("locationObj", JSON.stringify(locationObj))
    wx.navigateBack({
      delta: 1
    })
  },
  onGoBackHandler: function () {
    // wx.navigateBack({
    //   delta: 1
    // })

    wx.switchTab({
      url: '/page/tabBar/index/index'
    });

  },
  // 获取可选城市
  onFetchCommunityHandler: function () {
    let _this = this;
    // let url = `${config.ApiRoot}/region/community-address`
    let locationObj = wx.getStorageSync("locationObj");
    if (locationObj) {
      locationObj = JSON.parse(locationObj)
    }
    let data = {
      // url,
      data: {
        adcode: locationObj.adcode,
        keyword: _this.keyWord,
        all: 1
      }
    }
    wx.showLoading({
      title: '加载中',
    })
    // wxApi.request(data)
      .then(res => {
        const { data, code, msg } = res.data
        if (code == 10000) {
          this.setData({
            "data.coms": data
          })
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(res => {
        wx.hideLoading();
      })
  },
})