// pages/product/index.js

import Toast from '../../../../vant-weapp/dist/toast/toast';



import {
  OrderModel
} from '../../../../api/order.js'

// import {
//   GoodsModel
// } from '../../../../api/goods.js'

// let goodsModel = new GoodsModel();
let orderModel = new OrderModel();

const uploadImage = require('../../../../utils/uploadAliyun.js');
let base_img = 'https://kedand.oss-cn-beijing.aliyuncs.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pList: [],
    vList: [],
    data: {
      desc: undefined,
    },
    iList: [],
    name: '',
    price: '',
    desc: '',
    stock: '',
  },

  afterRead(event) {
    //启用

    var _this = this;

    var { suffix, type } = event.currentTarget.dataset
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
          //结束
          var temp = {
            url: base_img + res,
          }
          if (type === 1) {

            var dtemp = _this.data.pList;
            dtemp.push(temp);
            _this.setData({
              pList: dtemp
            })
            console.log(_this.data.pList)
          }

          if (type === 2) {

            var dtemp = _this.data.vList;
            _this.setData({
              vList: [temp]
            })
            console.log(dtemp)
          }

          if (type === 3) {
            var dtemp = _this.data.iList;
            dtemp.push(temp);
            _this.setData({
              iList: dtemp
            })
            console.log(_this.data.iList)
          }

        },
        fail: function (res) {
          console.log("上传失败")
          console.log(res)
        }
      })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

  },
  chooseVideo: function () {
    var that = this
    wx.chooseVideo({
      success: function (res) {
        console.log(res)
        var path = {
          path: res.tempFilePath
        }
        var temp = {
          file: path,
          type: 2,
          suffix: '.mp4'
        }
        that.videoUp(temp)
      }
    })
  },


  videoUp(event) {
    //启用

    var _this = this;

    var { suffix, type, file } = event
    type = parseInt(type)
    uploadImage(
      {
        filePath: file.path,
        suffix: suffix,
        dir: "images/",
        success: function (res) {
          console.log(res)
          //结束
          var temp = {
            url: base_img + res,
          }
          if (type === 1) {

            var dtemp = _this.data.pList;
            dtemp.push(temp);
            _this.setData({
              pList: dtemp
            })
            console.log(_this.data.pList)
          }

          if (type === 2) {

            var dtemp = _this.data.vList;
            _this.setData({
              vList: [temp]
            })
            console.log(dtemp)
          }

          if (type === 3) {
            var dtemp = _this.data.iList;
            dtemp.push(temp);
            _this.setData({
              iList: dtemp
            })
            console.log(_this.data.iList)
          }

        },
        fail: function (res) {
          console.log("上传失败")
          console.log(res)
        }
      })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

  },

  //检查必填项是否为空
  checkRequired() {
    if (this.data.data.desc === undefined) {
      Toast('请先输入评论');
    }else {
      this.addProduct()
    }
  },

  addProduct() {
    let data = this.data.data
    let ilist = [];
    for (let i = 0; i < this.data.iList.length; i++) {
      ilist.push(this.data.iList[i].url)
    }
    data.img_list = ilist.join(',');
    var userinfo = wx.getStorageSync('userinfo')
    data.user_id = userinfo.id
    orderModel.PostEvakuteByAdd(data,res=>{
      wx.navigateBack({
        delta: 1
      })
    })
  },
  line_price: undefined,

  

  

  
  // delPic(e) {
  //   console.log(e)
  //   let list = this.data.pList
  //   list.splice(e.detail.index, 1)
  //   this.setData({ pList: list })
  // },
  delVdo(e) {
    console.log(e)
    let list = this.data.vList
    list.splice(e.detail.index, 1)
    this.setData({ vList: list })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.data.data.order_id = parseInt(options.order_id)
    this.data.data.goods_id = parseInt(options.goods_id)
  },
  setName: function (res) {
    this.data.data.desc = res.detail.value
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