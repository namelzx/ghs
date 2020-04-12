// pages/purchase/address/index.js
import {
  UserAdderssModel
} from '../../../api/useraddress.js';

let userAdderssModel = new UserAdderssModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addlist:[]
  },
  toggleAdds() {
    wx.navigateTo({
      url: '/pages/purchase/address/submit/index?status=1',
    })
  },

  //获取到地址信息，携带值返回订单确认
  togglepurchase(e) {
    let prod_type = wx.getStorageSync('prod_type') //商品下单途径，从店铺商品还是从首页商品，1为首页，2为店铺
    let details = JSON.stringify(e.currentTarget.dataset.item)
    if (prod_type==1){
      wx.navigateTo({
        url: '/pages/purchase/index?details=' + details,
      })
    }
    else{
      wx.navigateTo({
        url: '/pages/member/shop/purchase/index?details=' + details,
      })
    }
    
    
  },
  toggleEdit(e) {
    let details = JSON.stringify(e.target.dataset.item)

    
    wx.navigateTo({
      url: '/pages/purchase/address/submit/index?status=2' + "&details=" + details,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    
    var userinfo = wx.getStorageSync('userinfo')
    
    let id = userinfo.id
    userAdderssModel.GetDataByUseradderss(id, res => {
      console.log(res.data)
      this.setData({
        addlist: res.data
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