//index.js
//获取应用实例
const app = getApp()

const wxApi = require("../../utils/wxApi.js");

import {
  GoodsModel
} from '../../api/goods.js'

let goodsModel = new GoodsModel();

Page({
  data: {
    model:'',
    screen_width:0,
    screen_height:0,
    hbHidden:false,
    // way_status:1,
    carArray: [],
    eva:[],
    state: {
      shopCartBoxStatus: false,
      groupsBoxStatus: false,
      scrollTop: 0,
      returnBack: false,
      scrollI: 0,
      timer: 3000,
      groupBuyingStatus: false,
      selectIds: [],
      totalBuyNum: 1,
      selectSkuItem: {},
      savePicBoxStatus: false,
      posterId: "posterId",
      openSavePicBoxTimes: 1,
      // hasAddToCartStatus:true,
      cartItemNumber: 0
    },
    totalCount:0,
    goods_id: undefined,
    motto: 'Hello World',
    userInfo: {},
    data: {
      shareBoxStatus: false,
      shopCartBoxStatus: false,
      type: 1,
      totalPrice:0,
      productDetail: {
       
      }
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  createNewImg: function () {
    var that = this;
    let goods = that.data.data.productDetail
    wx.setStorageSync('good', goods)
  
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
    return true;
    let w = 0 // 画布宽度
    let h = 0 // 画布宽度
    // 获取canvas标签
    let ctx = wx.createCanvasContext('mycanvas')
    // 获取canvas尺寸
    let query = wx.createSelectorQuery()
    query.select('#share').boundingClientRect()
    query.exec(function (rect) {
      console.log(rect)
      let res = rect[0]
      w = res.width
      h = res.height
      let baseNum = 300 // 标准画布宽度基数
      let ratio = w / baseNum // 自适应比例
      console.log('绘图开始')
      ctx.setFillStyle('#fff') // 背景颜色
      ctx.fillRect(0, 0, w, h)
      let img = {
        type: 'img',
        url: '图片链接'
      }
      let qrImg = {
        type: 'qrimg',
        url: '二维码链接'
      }
      // 图片统一转为本地图片
      let num = 0 // 转为本地图片数量
      // 将图片转为临时图片
      // 绘图内容
      ctx.drawImage(that.data.images_url, 0, 0, w, w)
      // 二维码
      ctx.drawImage(that.data.images_url, 209 * ratio, 314 * ratio, 72 * ratio, 72 * ratio)
      // 。。。中间代码省略
      ctx.draw(true, setTimeout(function () {  // 加定时器是防止绘图未完成就生成图片导致图片内容不完整
        // 生成本地图片
        wx.canvasToTempFilePath({
          x: 0, y: 0,
          canvasId: 'customCanvas',
          success: function (res) {
            let path = res.tempFilePath
            console.log(path)
          },
          fail: function (res) { }
        })
      }, 0))
    })
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath)
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  onChangeShareBoxHandler: function () {
    this.setData({
      shareBoxStatus: !this.data.shareBoxStatus
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  onLoad: function(e) {
    let goods_id = decodeURIComponent(e.scene);

    this.data.goods_id = decodeURIComponent(e.scene)

    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        that.setData({
          model: res.model,
          screen_width: res.windowWidth / 375,
          screen_height: res.windowHeight
        })
      }
    })
    let user_id = e.user_id;
    if (user_id===undefined){
      console.log('普通进入')
      var temp={
        is_shop:false,
        user_id
      }
      wx.setStorageSync('is_shop', temp)
    }else{
      var temp = {
        is_shop: true,
        user_id
      }
      wx.setStorageSync('is_shop', temp)
    }
    this.data.carArray = wx.getStorageSync('cart');
   
    this.getInfo();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.calTotalPrice();
  },

  getInfo() {
    var that = this;
    goodsModel.GetDataByInfo(this.data.goods_id, res => {
      var data = res.data;
      let eva = res.data.eva
      let evaarr=[];
      for(let i=0;i<eva.length;i++){
        console.log(eva[i])
        eva[i]['img_list'] = eva[i]['img_list'].split(',');
        // evaarr.push(eva[i])
      }
      that.setData({
        eva
      })

      wx.setNavigationBarTitle({
        title: data.name
      })
      if (data.img_list !== null) {
        data.img_list = data.img_list.split(',')

      }
      if (data.img_banner !== null) {
        data.img_banner = data.img_banner.split(',')
      }
      console.log(res.data)
      wx.getImageInfo({
        src: res.data.images_url,
        success:function(res){
          console.log(res)
          that.setData({
            images_url:res.path
          })
        }
      })
      that.setData({
        'data.productDetail': res.data
      })
    })
  },
  onOpenShopCartBoxStatusHandler: function() {
    this.setData({
      shopCartBoxStatus: !this.data.shopCartBoxStatus,

    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  addCart() {
    var that = this;
    let data = that.data.data.productDetail
    var totalBuyNum = that.data.state.totalBuyNum; //数量
    var price = data.price; //当前商品价格
    var goods_id = data.id; //当前商品id
    var line_price = data.line_price
    var images_url = data.images_url
    var name = data.name;
    var mark = goods_id
    var head_price = data.head_price
    var manager_price = data.manager_price

    var obj = {
      goods_id,
      line_price,
      mark,
      name,
      totalBuyNum,
      price,
      images_url,
      selected:false,
      moveState:false,
       is_store: data.is_store,
      head_price,
      manager_price
    };

    var carArray1 = this.data.carArray.filter(item => item.goods_id != goods_id)
    carArray1.push(obj)
    wx.setStorageSync('cart', carArray1)
    this.setData({
      carArray: carArray1,
    })
    this.calTotalPrice();

  },
  calTotalPrice: function() {

    var carArray = this.data.carArray;
    if (carArray.length < 1) {
      carArray = wx.getStorageSync('cart')
    }

    if (carArray.length < 1) {
      carArray = [];
    }
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].price * carArray[i].totalBuyNum;
      totalCount += carArray[i].totalBuyNum
    }

    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
      carArray,
      shopCartBoxStatus:false,
      //payDesc: this.payDesc()
    });
  },


  // 数量减事件
  onNumDescHandler: function(e) {
    let index = e.currentTarget.dataset.index;
    this.data.data.productDetail.inventory++;
    this.data.state.totalBuyNum--
      this.setData({
        "data.productDetail": this.data.data.productDetail,
        'state.totalBuyNum': this.data.state.totalBuyNum
      })
    // this.oncomputedHandler();
  },
  // 数量加事件
  onNumAddHandler: function(e) {
    let index = e.currentTarget.dataset.index;

    this.data.data.productDetail.inventory--;
    this.data.state.totalBuyNum++
      this.setData({
        "data.productDetail": this.data.data.productDetail,
        'state.totalBuyNum': this.data.state.totalBuyNum
      })
    // this.oncomputedHandler();
  },
  onGoToCartPageHandler(){
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  onNowBuyHandler() {
    var that = this;
    let data = that.data.data.productDetail
    if (data.inventory - data.sales === 0) {
      wx.showToast({
        title: '商品已卖完',
        icon: 'none'
      })
      return true;
    }
    var totalBuyNum = that.data.state.totalBuyNum; //数量
    var price = data.price; //当前商品价格
    var goods_id = data.id; //当前商品id
    var line_price = data.line_price
    var images_url = data.images_url
    var is_store = data.is_store
    var name = data.name;
    var mark = goods_id
    var head_price = data.head_price
    var manager_price = data.manager_price
    

    var obj = {
      goods_id,
      shop_id: data.shop_id,
      line_price,
      mark,
      name,
      totalBuyNum,
      price,
      images_url,
      selected: false,
      moveState: false,
      head_price,
      manager_price
    };

    let queryObj = {
      is_store,//是否允许自提
      
      products: [obj],
      isFromCart: true,
      isFormProductDetail: false
    }
    wx.setStorageSync('buy', queryObj)
    wx.navigateTo({
      url: '/pages/purchase/index?queryObj=' + encodeURIComponent(JSON.stringify(queryObj)),
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //生成海报
  onOpenSavePicStatus: function () {
    let that=this;
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg();
      that.setData({
        hbHidden: true
      });
    }, 1000)
    

  },


  // 初始判断 按钮打开设置还是wxapi打开设置页
  onOpenSettingNeedBtn: function () {
    wxApi.getSetting().then(res => {
      if (res.authSetting && res.authSetting["scope.writePhotosAlbum"] === false) {
        if (wx.canIUse("button.open-type.openSetting")) {
          this.setData({
            "state.needOpenSettingBtn": true
          })
        } else {
          console.log("使用wx.opensetting")
        }
      }
    })
  },

  // 打开设置页事件
  openSettingHandler: function (e) {
    if (e.detail.authSetting && e.detail.authSetting["scope.writePhotosAlbum"]) {
      const pic = e.currentTarget.dataset.pic;
      this.saveWeChatPicHandler();
    } else {
      wx.showToast({
        title: "授权保存图片失败",
        image: "/imgs/icon-fail-default.png",
        duration: 2000
      });
    }
    console.log(e)
  },



  onCloseSavePicStatus: function () {
    this.setData({
      "state.savePicBoxStatus": false,
      // "state.posterId": this.data.state.posterId + this.data.state.openSavePicBoxTimes
    })
  },
  
  onShareAppMessage() {
    let goods_id = this.data.goods_id
    let user=wx.getStorageSync('userinfo')
    console.log(user)
    return {
      title: this.data.data.productDetail.name,
      path: 'pages/details/index?scene=' + goods_id+'&user_id='+user.id
    }
  }

})