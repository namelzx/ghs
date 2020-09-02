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
  //跳转评论列表
  toggleComment(){
    wx.navigateTo({
      url: '/pages/comment/index?goods_id='+this.data.goods_id,
    })
  },

  
  onLoad: function(e) {
    let goods_id = decodeURIComponent(e.scene);
    this.data.goods_id = decodeURIComponent(e.scene)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          model: res.model,
          screen_width: res.windowWidth / 375,
          screen_height: res.windowHeight
        })
      }
    })
    let user_id = e.user_id;
    if (user_id===undefined){
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
      wx.getImageInfo({
        src: res.data.images_url,
        success:function(res){
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
    var purchasing = data.purchasing
    var purchasing_status = data.purchasing_status

    var obj = {
      purchasing_status,
      purchasing,
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
      if(parseInt(this.data.goods_id)===carArray[i].goods_id){
        this.setData({
          'state.totalBuyNum':carArray[i].totalBuyNum
        })
        console.log(1,3)
      }
    }
    console.log(totalCount,this.data.goods_id)

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
      this.calTotalPrice();
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
  },



  onCloseSavePicStatus: function () {
    this.setData({
      "state.savePicBoxStatus": false,
    })
  },
  
  onShareAppMessage() {
    let goods_id = this.data.goods_id
    let user=wx.getStorageSync('userinfo')
    return {
      title: this.data.data.productDetail.name,
      path: 'pages/details/index?scene=' + goods_id+'&user_id='+user.id
    }
  }

})