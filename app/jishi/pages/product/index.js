// pages/product/index.js

import Toast from '../../vant-weapp/dist/toast/toast';
import {
  GoodsModel
} from '../../api/goods.js'

let goodsModel = new GoodsModel();


const uploadImage = require('../../utils/uploadAliyun.js');
let base_img ='https://kedand.oss-cn-beijing.aliyuncs.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,
    pList: [],
    vList: [ ],
    data:{
      name: undefined,
      setlinePrice: undefined,
      price: undefined,
      line_price:undefined,
      inventory: undefined,
      img_list:undefined,
      videosrc:undefined,
      sellpoint: undefined,
      tel:'',
    },
    order_id: undefined,
    iList:[],
    name: '',
    price: '',
    desc: '',
    stock: '',
  },
  onStatusChange(e) {
    const formats = e.detail
    console.log(formats)
    this.setData({ formats })
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context;
      wx.showLoading({
        title: '加载内容中...',
      })
      setTimeout(function(){
        let data = that.data.data.sellpoint;
        wx.hideLoading();
        that.editorCtx.setContents({
          html: data,
          success: (res) => {
            console.log(res)
          },
          fail: (res) => {
            console.log(res)
          }
        })
      },1000)
    }).exec()
  },
  afterRead(event) {
    //启用
    var _this=this;
    var { suffix ,type }   = event.currentTarget.dataset
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
            url: base_img+res,
          }
          if(type===1){
            var dtemp=_this.data.pList;
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
        var path={
          path: res.tempFilePath
        }
        var temp={
          file: path,
        type:2,
        suffix:'.mp4'
      }
        that.videoUp(temp)
        // that.setData({
        //   src: res.tempFilePath,
        // })
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
 

  // 检查价格是否为纯数字
  checkNumber(e) {
    console.log(Number(e.detail))
    if (isNaN(Number(e.detail))) {
      Toast('价格必须是数字');
      this.setData({ price: ''})
    }
  },

  //检查必填项是否为空
  checkRequired() {
    console.log(this.data.pList.length)

    if (this.data.pList.length === 0) {
      Toast('请先添加商品图');
    }else if (this.data.vList.length === 0) {
      Toast('请添加商品视频');
    } else if (this.data.iList.length === 0) {
      Toast('请添加商品详情图片集');
    } else if (this.data.data.setlinePrice === '') {
      Toast('商品名称不能为空');
    } else if (this.data.data.price === '') {
      Toast('商品价格不能为空');
    } else if (this.data.data.line_price === '') {
      Toast('商品价格不能为空');
    } else if (this.data.data.inventory === '') {
      Toast('商品价格不能为空');
    } else {
      this.addProduct()
    }
  },

  addProduct () {
    let data=this.data.data
    data.images_url=this.data.pList[0].url;
    //轮播图
    let plist=[];
    for (let i = 0; i < this.data.pList.length;i++){
      plist.push(this.data.pList[i].url)
    }
    data.img_banner=plist.join(',');
    //视频
    if (this.data.vList.length >0){
    let vlist = [];
    for (let i = 0; i < this.data.vList.length; i++) {
      vlist.push(this.data.vList[i].url)
    }
    data.videosrc = vlist.join(',');
    }


    let ilist = [];
    for (let i = 0; i < this.data.iList.length; i++) {
      ilist.push(this.data.iList[i].url)
    }
    data.img_list = ilist.join(',');
    var userinfo=wx.getStorageSync('userinfo')
    data.shop_id = userinfo.id
    data.id = this.data.order_id
    goodsModel.PostDataByAdd(data,res=>{
      Toast('保存成功');
     wx.navigateTo({
       url: '/pages/member/goods/index',
     })
    })
  
  },
//商品名

  setName(e) {
    console.log(e)
    this.setData({ 'data.name': e.detail.value})
  },
  setlinesales(e) {
    console.log(e)
    this.setData({ 'data.sales': e.detail.value})
  },

  

  setPrice(e) {
    console.log(e)
    this.setData({ 'data.price': e.detail.value })
  },


  setskuName(e) {
    console.log(e)
    this.setData({ 'data.sku_name': e.detail.value })
  },


  settel(e) {
    console.log(e)
    this.setData({ 'data.tel': e.detail.value })
  },


//市场价格
  setlinePrice(e) {
    console.log(e)
    this.setData({ 'data.line_price': e.detail.value })
  },

//商品特色
  setDesc(e) {
    let {detail}=e
    this.setData({ 
      'data.sellpoint': detail.html
       })
  },

//库存


 
  setStock(e) {
    console.log(e)
    this.setData({ 'data.inventory': e.detail.value })
  },
  delPic(e){
    console.log(e)
    let list = this.data.pList
    list.splice(e.detail.index,1)
    this.setData({pList: list})
  },
  delVdo (e) {
    console.log(e)
    let list = this.data.iList
    list.splice(e.detail.index, 1)
    this.setData({ iList: list })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let order_id = options.id;
    if (order_id !== undefined){
      that.setData({
        order_id
      })
    }
    if (order_id !== undefined){
      goodsModel.GetDataByGooslist(order_id, res => {
        let iList = []
        let vList = []
        if (res.data.img_list !== null){
          let imglsit = res.data.img_list.split(',');
          for (let i = 0; i < imglsit.length;i++) {
            iList.push(
              { url: imglsit[i]}
            )
          }
        }
        if (res.data.videosrc !== null) {
          let video = res.data.videosrc.split(',');
          for (let i = 0; i < video.length; i++) {
            vList.push(
              { url: video[i] }
            )
          }
        }
        that.setData({
          'pList[0].url': res.data.images_url,
          'iList': iList,
          'vList': vList,
          'data.setlinePrice': res.data.name,
          'data.price': res.data.price,
          'data.line_price': res.data.line_price,
          'data.sellpoint': res.data.sellpoint,
          'data.inventory': res.data.inventory,
          'data.name': res.data.name,
          'data.sales': res.data.sales,
          'data.tel': res.data.tel,
          'data.sku_name':res.data.sku_name

          
        })
      })
    }
    

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