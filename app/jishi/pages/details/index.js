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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  
  onLoad: function(e) {
    console.log(e.user_id)
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
    this.data.goods_id = e.id
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
    wxApi.getSetting().then(res => {
      if (res.authSetting['scope.userInfo']) {
        this.onOpenSettingNeedBtn();
        this.onRequestCodePic();
        this.setData({
          "state.savePicBoxStatus": true,
          "state.shareBoxStatus": false,
          // "state.openSavePicBoxTimes": ++this.data.state.openSavePicBoxTimes
        })
      } else {
        this.alertHandler("需要用户授权才能使用这个功能")
        wx.navigateTo({
          url: '../userCenter/pages/login/login',
        })
        return false;
      }
    })

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

  // 保存canvas图片到手机事件
  saveWeChatPicHandler: function () {
    const _this = this;
    wxApi.authorize({
      scope: "scope.writePhotosAlbum"
    }).catch(e => {
      return wxApi.openSetting().then(res => {
        if (res.authSetting["scope.writePhotosAlbum"]) {
          return;
        } else {
          throw "授权失败！";
        }
      })
        .catch(err => {
          // 这里的思路是，先让用户授权地址，用户拒绝以后，先进入一次设置页
          // 如果 opensetting api 报错，返回一个对象
          // 如果是 用户自己取消授权，则把报错值自定义为字符串，则不是api 报错
          // 否则使用button open-type 为 opensetting

          if (typeof err === "string") {
            throw "授权失败！";
          } else {
            _this.setData({
              "state.needOpenSettingBtn": true
            })
          }
        })

    }).then(() => {
      return wxApi.canvasToTempFilePath({ x: 0, y: 0, canvasId: this.data.state.posterId })
      // return wxApi.getImageInfo({
      //   src: "https://bir.langnadujia.cn/static/images/kefu.jpg",
      // })
    })
      .then(res => {
        console.log(res)
        return wxApi.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
        // return wxApi.saveImageToPhotosAlbum({ filePath: res.path})


        // wx.saveImageToPhotosAlbum({
        //   filePath: res.path,
        //   success: function () {
        //     _this.setData({
        //       "state.alertingStatus": true,
        //       "state.alertingWords": "保存成功，请前往微信扫描二维码"
        //     })
        //     setTimeout(function () {
        //       _this.setData({
        //         "state.alertingStatus": false
        //       })
        //     }, 2000);
        //     _this.setData({
        //       "state.qrcodeBoxStatus": !_this.data.state.qrcodeBoxStatus
        //     })
        //   }
        // })
      })
      .then(res => {
        this.alertHandler("保存成功，请前往微信扫描二维码")
        // _this.setData({
        //   "state.alertingStatus": true,
        //   "state.alertingWords": "保存成功，请前往微信扫描二维码"
        // })
        // setTimeout(function () {
        //   _this.setData({
        //     "state.alertingStatus": false
        //   })
        // }, 2000);
        _this.setData({
          "state.savePicBoxStatus": false,
          // "state.posterId": this.data.state.posterId + this.data.state.openSavePicBoxTimes
        })
      })
      .catch(err => {
        if (typeof err === "string") {
          wx.showToast({
            title: err,
            image: "/imgs/cancel.png",
            duration: 2000
          });
        }
        console.log(err)
      });
  },
  // 请求获得小程序二维码事件
  onRequestCodePic: function () {
    let _this = this;
    let storeId = "";
    if (wx.getStorageSync("communityObj")) {
      storeId = JSON.parse(wx.getStorageSync("communityObj")).id
    }

    let adcode = "";
    let community_id = "";
    let locationObj = wx.getStorageSync("communityObj");
    if (locationObj) {
      locationObj = JSON.parse(locationObj);
      adcode = locationObj.adcode;
      locationObj.com && (community_id = locationObj.com.id)
    }

    if (this.hasCodePicStatus) {
      this.onDrawCanvasHandler();
    } else {
      _this.setData({
        "data.qrCode": '../../imgs/logo.jpg'
      })
      _this.onDrawCanvasHandler();

    }

  },


  onCloseSavePicStatus: function () {
    this.setData({
      "state.savePicBoxStatus": false,
      // "state.posterId": this.data.state.posterId + this.data.state.openSavePicBoxTimes
    })
  },
  // canvas 绘图事件
  onDrawCanvasHandler: function () {
    // if (this.data.state.posterHasCreateStatus) return;
    let productDetail = this.data.data.productDetail;
    let windowWidth = this.windowWidth;
    let WidthRadio = this.WidthRadio;
    let picRadio = 500 / 750;
    // let userInfo;
    // if (userMs){
    //   userInfo = userMs.config.userInfo
    // }
    // let {userInfo} = userMs.config;
    // console.log("userInfo",userInfo)
    console.log(this.data.state.posterId)
    const ctx = wx.createCanvasContext('mycanvas');
    console.log(ctx)
    ctx.clearRect(0, 0, 500 * WidthRadio, 840 * windowWidth);
    ctx.setFillStyle("#fff");
    ctx.fillRect(0, 0, 500 * WidthRadio, 840 * windowWidth);




    var path;
    // 背景图片
    path = "../../imgs/icon-share-poster-bg.png";
    ctx.drawImage(path, 0, 0, (500 * WidthRadio), (957 * picRadio * WidthRadio));
    path = "../../imgs/icon-logo-share.png";
    ctx.drawImage(path, (258 * picRadio * WidthRadio), 46 * picRadio * WidthRadio, (234 * picRadio * WidthRadio), (138 * picRadio * WidthRadio));
  
    // 商品logo
    path = '../../imgs/icon-share-poster-bg.png';
    if (path) {
      ctx.drawImage(path, (151 * picRadio * WidthRadio), (214 * picRadio * WidthRadio), (448 * picRadio * WidthRadio), (448 * picRadio * WidthRadio));
    }



    if (productDetail.name) {
      // 左下角的title 这里需要限制次数啊。。
      let titleLength = productDetail.name.length;
      let title = productDetail.name;
      let titleOne;
      let titleTwo;
      if (titleLength >= 36) {
        titleOne = title.substr(0, 18);
        titleTwo = title.substr(18, 16);
        titleTwo = titleTwo + "..."
      } else if (titleLength < 36 && titleLength >= 18) {
        titleOne = title.substr(0, 18);
        titleTwo = title.substr(18, 18);
      } else {
        titleOne = title
      }
      ctx.setFillStyle("#333");
      ctx.setFontSize(19 * picRadio);
      ctx.setTextBaseline('top');
      ctx.setTextAlign('center')
      ctx.fillText(titleOne, (375 * picRadio * WidthRadio), (692 * picRadio * WidthRadio));
      if (titleTwo) {
        ctx.fillText(titleTwo, (375 * picRadio * WidthRadio), (740 * picRadio * WidthRadio));
      }
    }
    // 我们的价格
    if (productDetail.price) {
      let our_price = productDetail.price;
      ctx.setFillStyle("#FF5e53");
      ctx.setTextBaseline('bottom')
      ctx.setTextAlign('right')
      // 让新价格 && 旧价格 中间对齐
      ctx.setFontSize(24 * picRadio);
      ctx.fillText(our_price / 100, ((365) * picRadio * WidthRadio), (848 * picRadio * WidthRadio));
      let prefixWidth = ctx.measureText(`${our_price / 100}`).width;
      let widthMargin = 10;
      ctx.setFontSize(16 * picRadio);
      ctx.fillText("¥", ((365 - widthMargin) * picRadio * WidthRadio - prefixWidth), (848 * picRadio * WidthRadio));

    }
    // 市场价格
    if (productDetail.line_price) {
      ctx.setFillStyle("#d6d6d6");
      ctx.setTextBaseline('bottom')
      ctx.setTextAlign('left')
      // 让新价格 && 旧价格 中间对齐
      ctx.setFontSize(14 * picRadio);

      ctx.fillText("¥", ((385) * picRadio * WidthRadio), (838 * picRadio * WidthRadio));
      let prefixWidth = ctx.measureText(`¥`).width;
      let market_price = productDetail.line_price;

      ctx.fillText(market_price / 100, ((385) * picRadio * WidthRadio + prefixWidth), (838 * picRadio * WidthRadio));
      let marketPriceWidth = ctx.measureText(`${market_price / 100}`).width;
      ctx.setStrokeStyle("#999")
      ctx.beginPath()
      ctx.moveTo(((385) * picRadio * WidthRadio), (824 * picRadio * WidthRadio))
      ctx.lineTo(((385) * picRadio * WidthRadio + marketPriceWidth + prefixWidth), (824 * picRadio * WidthRadio))
      ctx.stroke()
    }

    if (productDetail.sales) {
      let sell_count = productDetail.sales;
      
      let marketPriceWidth = ctx.measureText(`${sell_count / 100}`).width;
      ctx.setFillStyle('#ff5e53')
      // ctx.fillRect((230 * picRadio * WidthRadio), (888 * picRadio * WidthRadio), ((290) * picRadio * WidthRadio), (88 * picRadio * WidthRadio))
      ctx.setStrokeStyle('#ff5e53')
      this.drawRoundRect(ctx, (230 * picRadio * WidthRadio), (888 * picRadio * WidthRadio), ((290) * picRadio * WidthRadio), (88 * picRadio * WidthRadio), 44 * picRadio * WidthRadio);
      ctx.stroke()
      ctx.fill()
      ctx.setFillStyle("#fff");
      ctx.setFontSize(16 * picRadio);
      ctx.setTextBaseline('bottom')
      ctx.setTextAlign('center')
      ctx.fillText(`已售${sell_count}件`, (375 * picRadio * WidthRadio), (950 * picRadio * WidthRadio));
    }


    // 右下角二维码
    path = '../../imgs/icon-share-poster-bg.png';
    if (path) {
      ctx.drawImage(path, (80 * picRadio * WidthRadio), (994 * picRadio * WidthRadio), (220 * picRadio * WidthRadio), (220 * picRadio * WidthRadio));
    }
    ctx.setFillStyle("#333");
    ctx.setFontSize(16 * picRadio);
    ctx.setTextBaseline('bottom');
    ctx.setTextAlign('left')
    ctx.fillText("长按识别小程序二维码", (328 * picRadio * WidthRadio), (1117 * picRadio * WidthRadio));

    ctx.setFillStyle("#999");
    ctx.setFontSize(13 * picRadio);
    ctx.fillText("好货要和朋友一起分享", (328 * picRadio * WidthRadio), (1164 * picRadio * WidthRadio));
    // ctx.draw()
    // this.setData({
    //   "state.posterHasCreateStatus":true
    // })
    ctx.draw(true, setTimeout(function () {
      wx.hideLoading()
    }, 100))

  },
  onShareAppMessage() {
    let goods_id = this.data.goods_id
    let user=wx.getStorageSync('userinfo')
    console.log(user)
    return {
      title: this.data.data.productDetail.name,
      path: 'pages/details/index?id=' + goods_id+'&user_id='+user.id
    }
  }

})