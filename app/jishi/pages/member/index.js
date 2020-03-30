// pages/order/index.js
const wxApi = require("../../utils/wxApi.js")
import Dialog from '../../vant-weapp/dist/dialog/dialog';

import {
  ShopModel
} from '../../api/shop.js'

let shopmodel = new ShopModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '181****3619的云小店',
    name_edit: '',
    show: false,
    info:{},
    shopinfo:{},
  },
 
  toShop(){
    console.log(1)
    wx.navigateTo({
      url: '/pages/member/shop/index?scene=' + this.data.info.id,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  onCompile() {
    this.show = !this.show
    this.name_edit = this.name
    wx.navigateTo({
      url: '/pages/member/info/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onClickShow() {
    this.show = !this.show
  },
  onSbtn() {
    this.name = this.name_edit
    this.show = !this.show
  },
  onManagement() {
    wx.navigateTo({
      url: '/pages/member/goods/index'
    })
  },
  onStore() {
    wx.navigateTo({
      url: '/pages/store/index'
    })
  },
  onOrder() {
    wx.navigateTo({
      url: '/pages/member/shop/order/index'
    })
  },
  onGroup() {
    wx.navigateTo({
      url: '/pages/group/index'
    })
  },
  onWith() {
    wx.navigateTo({
      url: '/pages/member/shop/withdraw/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this=this;
    wx.setNavigationBarTitle({
      title: '社区-商家中心',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this=this;

    let info = wx.getStorageSync('userinfo')
    console.log(info)
    shopmodel.GetUserIdByInfo(info.id, res => {
      console.log(res)
      if (res.data === null) {
    

        wx.showModal({
          title: '提示',
          content: '请先完善信息，再使用卖家中心',
          showCancel: false,
          success(){
            wx.navigateTo({
              url: '/pages/member/info/index',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
          }
        })

        // Dialog.confirm({
        //   title: '标题',
        //   message: '弹窗内容'
        // }).then(() => {
        //   // on confirm
        
        // }).catch(() => {
        //   // on cancel
        //   wx.switchTab({
        //     url: '/pages/index/index',
        //   })
        // });

       

      }
    })
    wxApi.getSetting().then(res => {
      console.log(res.authSetting["scope.userInfo"])
      if (res.authSetting["scope.userInfo"]) {

        // this.onComputePriceAndCheckAll();
        let info = wx.getStorageSync('userinfo')
        console.log(info)
        _this.setData({
          info
        })
        shopmodel.GetShopHomeByData(this.data.info.id, res => {
          console.log(res)
          this.setData({
            shopinfo: res.data
          })
        })

      } else {
        wx.navigateTo({
          url: '/pages/userCenter/pages/login/login',
        })
      }
    }).catch(err => {
      console.log(err)
    });
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})