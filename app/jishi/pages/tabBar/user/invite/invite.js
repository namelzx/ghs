// pages/tabBar/user/invite/invite.js



import {
  UserModel
} from '../../../../api/user.js'

let usermodel = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    commission:{},
    userinfo:{},
  },
  wanr() {
    wx.navigateTo({
      url: '/pages/member/shop/withdraw/withdraw/index?type=2'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo=wx.getStorageSync('userinfo');
    this.setData({
      userinfo
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
    let user=wx.getStorageSync('userinfo');
    usermodel.GetUserCommissByInfo(user.id,res=>{
      this.setData({
        commission:res.data
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