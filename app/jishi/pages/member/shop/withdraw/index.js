// pages/member/shop/withdraw/index.js


import {
  ShopModel
} from '../../../../api/shop.js'

let shopmodel = new ShopModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    audhe:{},
    info:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onNotice() {
    wx.navigateTo({
      url: '/pages/member/shop/withdraw/withdraw/index?type=1'
    })
   
  },
  onAccount() {
    wx.navigateTo({
      url: '/pages/member/shop/withdraw/record/index'
    })
  },
  onDeposit() {
    wx.navigateTo({
      url: '/pages/tabBar/user/invite/withdrawalsrecord/index?type=1'
    })
  },
  onTogeAttes() {
    if(this.data.audhe){
      if (this.data.audhe.status===1){
        wx.showToast({
          title: '您的认证正在审核中',
          icon:'none'
        })
      }
    }else{
      wx.navigateTo({
        url: '/pages/member/shop/withdraw/attestation/index',
      })
    }
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
    let userinfo=wx.getStorageSync('userinfo')
    shopmodel.CheUserByAudhe(userinfo.id,res=>{
      console.log(res)
      this.setData({
        audhe:res.data
      })
    })

    shopmodel.GetUserIdByInfo(userinfo.id, res => {
      console.log(res)
      this.setData({
        info: res.data
      })
    })
    
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
  onShareAppMessage: function () {

  }
})