// pages/member/shop/withdraw/withdraw/index.js


import {
  ShopModel
} from '../../../../../api/shop.js'

let shopModel = new ShopModel();


import {
  UserModel
} from '../../../../../api/user.js'

let usermodel = new UserModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      info:{},
      type:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: parseInt(options.type)
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
    let userinfo = wx.getStorageSync('userinfo')
    if(this.data.type===1){
      shopModel.GetUserIdByInfo(userinfo.id, res => {
       
        var temp = {
          balance: res.data.balance
        }
        this.setData({
          info: temp
        })
      })
    }else{
      usermodel.GetUserCommissByInfo(userinfo.id, res => {
       
        var temp = {
          balance: res.data.available_commission
        }
        this.setData({
          info: temp
        })
        
      })
    }
  },

  formSubmit: function (a) {
    let money = parseFloat(this.data.info.balance )
    console.log(money)

    if (money < a.detail.value.money) {
      wx.showModal({
        title: '提示',
        content: '余额不足',
        showCancel: false
      })
      return false
    }
    if (money < 10) {
      wx.showModal({
        title: '提示',
        content: '满10元可提现',
        showCancel: false
      })
      return false
    }
    if (money - a.detail.value.money<10){
      wx.showModal({
        title: '提示',
        content: '请预留不低于10元的保证金',
        showCancel: false
      })
      return false
    }
    var formId = a.detail.formId;
    var num = a.detail.value.money;
    var userinfo = wx.getStorageSync('userinfo');
    if (num == '') {
      wx.showModal({
        title: '提示',
        content: '请输入要提现金额',
        showCancel: false
      })
      return false
    }

    var temp={
      user_id:userinfo.id,
      openid:userinfo.openid,
      money: num,
      type:this.data.type
    }
    shopModel.PostDataByWithdrawal(temp,res=>{
      wx.showToast({
        title: '提交成功待审核',
        icon:'none'
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1200)
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