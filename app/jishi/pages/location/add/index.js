// pages/product/index.js

import Toast from '../../../vant-weapp/dist/toast/toast';

// page / index / pages / communitySearch / communitySearch


import {
  ShopModel
} from '../../../api/shop.js'

let shopModel = new ShopModel();



import {
  CommunityModel
} from '../../../api/community.js'

let communityModel = new CommunityModel();

const uploadImage = require('../../../utils/uploadAliyun.js');
let base_img = 'https://kedand.oss-cn-beijing.aliyuncs.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pList: [],
    vList: [],
    actions: [],
    locationObj:{},
    show: false,
    state: {
      communityObj: {},
    },
    community_name: '',
    data: {
      name: '',
      user_id: undefined,
      images_url: undefined,
     
    },
    iList: [],
    name: '',
    price: '',
    desc: '',
    stock: '',
  },
  toCommunity() {
    wx.navigateTo({
      url: '/pages/location/index',
    })
  },

  afterRead(event) {
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
          var temp = {
            url: base_img + res,
          }
          if (type === 1) {
            _this.data.data.images_url = base_img + res
            var dtemp = _this.data.pList;
            dtemp.push(temp);
            _this.setData({
              pList: dtemp
            })
            console.log(_this.data.pList)
          }
        },
        fail: function (res) {
          console.log("上传失败")
          console.log(res)
        }
      })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

  },

  // 检查价格是否为纯数字
  checkNumber(e) {
    console.log(Number(e.detail))
    if (isNaN(Number(e.detail))) {
      Toast('价格必须是数字');
      this.setData({ price: '' })
    }
  },

  //检查必填项是否为空
  checkRequired() {
    console.log(this.data.pList.length)
    if (this.data.data.name === '') {
      Toast('小区名称不能为空');
    } else if (this.data.data.location === '') {
      Toast('请填写详细地址');
    } else {
      this.addProduct()
    }
  },

  addProduct() {
    let data = this.data.data
  
    communityModel.PostDataByAdd(data, res => {
      if (res.code === 10001){
        wx.showToast({
          title:'该地址非正常地址,请重新输入',
          icon:'none',
        })
        return 
      }
      wx.navigateBack({
        delta: 1,
      })
    })
  },
  //门店名称

  setName(e) {
    console.log(e)
    this.setData({ 'data.name': e.detail.value })
  },

  line_price: undefined,
  //联系电话
  setTel(e) {
    console.log(e)
    this.setData({ 'data.tel': e.detail.value })
  },

  //门店地址
  setaddress(e) {
    console.log(e)
    this.setData({ 'data.location': e.detail.value })
  },

  //商品描述
  setDesc(e) {
    this.setData({
      'data.desc': e.detail.value
    })
  },

  //库存



  setStock(e) {
    console.log(e)
    this.setData({ 'data.inventory': e.detail.value })
  },
  delPic(e) {
    console.log(e)
    let list = this.data.pList
    list.splice(e.detail.index, 1)
    this.setData({ pList: list })
  },
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
    wx.setNavigationBarTitle({
      title: '小区添加',
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
    var _this = this;
    let userinfo = wx.getStorageSync('userinfo')
    let locationObj = wx.getStorageSync("locationObj");
    if (locationObj) {
      this.setData({
        "locationObj": JSON.parse(locationObj),
        'data.user_id':userinfo.id
      })
      // this.onFetchCanSelectCommunity();
    }

  },

  community() {
    console.log(1)
    this.setData({
      show: !this.data.show
    })
  },
  onSelect(e) {
    console.log(e)
    this.data.data.community_id = e.detail.id
    this.setData({
      community_name: e.detail.name
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