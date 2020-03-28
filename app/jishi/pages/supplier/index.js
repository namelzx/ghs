// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    code: '',
    enter: [
      {
        icon: '../../imgs/fill.png',
        title: '第一步',
        desc: '填写开通码'
      },
      {
        icon: '../../imgs/submit.png',
        title: '第二步',
        desc: '供货商信息提交'
      },
      {
        icon: '../../imgs/platform.png',
        title: '第三步',
        desc: '平台管理审核资质'
      }
    ]
  },

  headShow() {
    let _this = this;
    _this.setData({
      show: !this.data.show
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  bindCancel() {
    this.headShow()
  },
  bindOks() {
    let code = this.data.code
    if (code !== '123456') {
      wx.showToast({
        title: '开通码不正确！',
        icon: 'none'
      })
    }
    else {
      this.headShow()
      this.setData({
        code: ''
      })
      wx.navigateTo({
        url: '/pages/supplier/protocol/index',
      })
    }
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
    wx.setNavigationBarTitle({
      title: '社区-供货商',
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