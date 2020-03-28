// pages/member/shop/withdraw/attestation/index.js


const uploadImage = require('../../../../../utils/uploadAliyun.js');
let base_img = 'https://kedand.oss-cn-beijing.aliyuncs.com/';

import {
  ShopModel
} from '../../../../../api/shop.js'

let shopmodel = new ShopModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    fileList2: [],
    temp: {
      username: '',
      idname: '',
      address: '',
      dates: '',
      phone: '',
      radio: ''
    },
    type: '',
    show: false,
    columns: ['居民身份证'],
    showDate: false,
    minDate: new Date(1900, 10, 1).getTime(),
    maxDate: new Date(2030, 10, 1).getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    }
  },
  
  inputUser(e){ 
    var that=this
    that.setData({
      'temp.realName': e.detail.value
    })
  },

  inputcard(e) {
    var that = this
    that.setData({
      'temp.card_number': e.detail.value
    })
  },

  inputphone(e) {
    var that = this
    that.setData({
      'temp.phone': e.detail.value
    })
  },
  afterRead(event){
    var _this = this;
    let { suffix, type } = event.currentTarget.dataset
    type = parseInt(type)
    const {
      file
    } = event.detail;

    uploadImage(
      {
        filePath: file.path,
        suffix: suffix,
        dir: "images/",
        success: function (res) {
       
            console.log(res)
            var temp=[];
          temp.push({ url:base_img+res})
          if(type===1){
            _this.setData({
              fileList:temp
            })
          }
          if (type === 2) {
            _this.setData({
              fileList2: temp
            })
          }

        },
        fail: function (res) {
          console.log("上传失败")
          console.log(res)
        }
      })
  },
  onSubmit(){
    if (this.data.temp.realName===''){
      wx.showToast({
        title: '请填写真实姓名',
        icon:'none',
      })
      return ;
    }
    if (this.data.temp.card_number === '') {
      wx.showToast({
        title: '请填写证件',
        icon: 'none',
      })
      return true
    }
    if (this.data.temp.phone === '') {
      wx.showToast({
        title: '请填写手机号码',
        icon: 'none',
      })
      return true
    }
    if (this.data.fileList.length ===0) {
      wx.showToast({
        title: '请上传正面照',
        icon: 'none',
      })
      return true
    }
    if (this.data.fileList2.length === 0) {
      wx.showToast({
        title: '请上传身份证反面',
        icon: 'none',
      })
      return true
    }
    let userinfo=wx.getStorageSync('userinfo');
    this.data.temp.zm=this.data.fileList[0].url
    this.data.temp.fm = this.data.fileList2[0].url
    this.data.temp.user_id = userinfo.id
    shopmodel.PostAudheByAdd(this.data.temp,res=>{
      console.log(res)
      if(res.code===10001){
        wx.showToast({
          title: res.msg,
          icon:'none'
,        })
        wx.navigateBack({
          delta: 1
        })
        return true
      }
      wx.navigateBack({
        delta: 1
      })
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