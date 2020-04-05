//index.js
//获取应用实例
const app = getApp()

const wxApi = require("../../../../utils/wxApi.js");

let base_url ='https://ch.10huisp.com/';
import {
  GoodsModel
} from '../../../../api/goods.js'

let goodsModel = new GoodsModel();

Page({
  data: {
    
    eva: [],
    imagePath: '',
    canvasHidden: false,
    hbHidden: false,
    carArray: [],
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
    totalCount: 0,
    goods_id: undefined,
    motto: 'Hello World',
    userInfo: {},
    data: {
      shareBoxStatus: false,
      shopCartBoxStatus: false,
      type: 1,
      totalPrice: 0,
      productDetail: {
     
      }
    },
    sUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onChangeShareBoxHandler: function () {
    this.setData({
      shareBoxStatus: !this.data.shareBoxStatus
    })
  },
  onLoad: function (options) {

    let goods_id = decodeURIComponent(options.scene);
    this.data.carArray = wx.getStorageSync('cart');
    this.data.goods_id = goods_id
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
      let evaarr = [];
      for (let i = 0; i < eva.length; i++) {
        console.log(eva[i])
        eva[i]['img_list'] = eva[i]['img_list'].split(',');
        // evaarr.push(eva[i])
      }
      that.setData({
        eva
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
      wx.setNavigationBarTitle({
        title: data.name
      })
    })
  },
  onOpenShopCartBoxStatusHandler: function () {
    wx.showToast({
      title: '当前商品不可加入购物车',
      icon:'none'
    })
  },
  //立即购买
  onNowBuyHandler(){
    var that=this;
    let data = that.data.data.productDetail
    if (data.inventory - data.sales===0){
      wx.showToast({
        title: '商品已卖完',
        icon:'none'
      })
      return true;
    }
    var totalBuyNum = that.data.state.totalBuyNum; //数量
    var price = data.price; //当前商品价格
    var goods_id = data.id; //当前商品id
    var line_price = data.line_price
    var images_url = data.images_url
    var name = data.name;
    var mark = goods_id
    

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
      
    };
    wx.setStorageSync('shopbuy', [obj]) 
    wx.navigateTo({
      url: '/pages/member/shop/purchase/index?shop_id=' + data.shop_id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getUserInfo: function (e) {
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

    var obj = {
      goods_id,
      line_price,
      mark,
      name,
      totalBuyNum,
      price,
      images_url,
      selected: false,
      moveState: false,

    };

    var carArray1 = this.data.carArray.filter(item => item.goods_id != goods_id)
    carArray1.push(obj)
    wx.setStorageSync('cart', carArray1)
    this.setData({
      carArray: carArray1,
    })
    this.calTotalPrice();

  },
  calTotalPrice: function () {

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
      shopCartBoxStatus: false,
      //payDesc: this.payDesc()
    });
  },


  // 数量减事件
  onNumDescHandler: function (e) {
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
  onNumAddHandler: function (e) {
    let index = e.currentTarget.dataset.index;

    this.data.data.productDetail.inventory--;
    this.data.state.totalBuyNum++
    this.setData({
      "data.productDetail": this.data.data.productDetail,
      'state.totalBuyNum': this.data.state.totalBuyNum
    })
    // this.oncomputedHandler();
  },

  //点击生成
  formSubmit: function (e) {

    var that = this;
  
    this.setData({
      hbHidden: false
    });
    wx.showToast({
      title: '生成中...',
      icon: 'loading',
      duration: 1000
    });

    this.setData({
      "state.savePicBoxStatus": true,
      "state.shareBoxStatus": false,
      // "state.openSavePicBoxTimes": ++this.data.state.openSavePicBoxTimes
    })
    var path=''
    var temp={
      path:'',
      code:'',
      avatarUrl:'',
    }
    wx.getImageInfo({
      src: that.data.data.productDetail.images_url,
      success: function (res) {
        temp.path=res.path
      }
    })

  
    wx.getImageInfo({
      src: base_url+that.data.data.productDetail.code,
      success: function (res) {
       temp.code = res.path
      
      }
    })
    setTimeout(function () {
      wx.hideToast()
      that.createNewImg(temp);
      that.setData({
        hbHidden: true
      });
    }, 3000)
  },

  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function (temp) {
    var that = this;
    var context = wx.createCanvasContext('mycanvas');
    let productDetail = this.data.data.productDetail;
    let windowWidth = this.windowWidth;
    let WidthRadio = this.WidthRadio;
    let picRadio = 500 / 750;

    const ctx = wx.createCanvasContext('mycanvas');
    ctx.clearRect(0, 0, 500 * WidthRadio, 840 * windowWidth);
    ctx.setFillStyle("#fff");
    ctx.fillRect(0, 0, 500 * WidthRadio, 840 * windowWidth);



    var path;
    // 背景图片
    path = "../../../../imgs/icon-share-poster-bg.png";
    ctx.drawImage(path, 0, 0, (500 * WidthRadio), (957 * picRadio * WidthRadio));
    path = "../../../../imgs/icon-logo-share.png";
    ctx.drawImage(path, (258 * picRadio * WidthRadio), 46 * picRadio * WidthRadio, (234 * picRadio * WidthRadio), (138 * picRadio * WidthRadio));

    // 商品logo
   
    path = temp.path;
    if (path) {
      ctx.drawImage(path, (10 * picRadio * WidthRadio), (214 * picRadio * WidthRadio), (730 * picRadio * WidthRadio), (448 * picRadio * WidthRadio));
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
    if (productDetail.line_price) {
      let our_price = productDetail.line_price;
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

    path = temp.code;
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
    ctx.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
       
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath)
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true,
            hbHidden:true,
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  onShow(){
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.windowWidth = res.windowWidth;
        _this.WidthRadio = res.windowWidth / 750;
      }
    })
  },
  //点击保存到相册

  onCloseSavePicStatus: function () {
    this.setData({
      "state.savePicBoxStatus": false,
    })
  },
  onPreventHandler: function () {
    return false;
  },
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
          if (typeof err === "string") {
            throw "授权失败！";
          } else {
            _this.setData({
              "state.needOpenSettingBtn": true
            })
          }
        })

    }).then(() => {
      return wxApi.canvasToTempFilePath({ x: 0, y: 0, canvasId: 'mycanvas' })
    })
      .then(res => {
        console.log(res)
        return wxApi.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
      })
      .then(res => {
        wx.showToast({
          title: '保存成功，请前往微信扫描二维码',
        })
        
        _this.setData({
          "state.savePicBoxStatus": false,
      
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
  onShareAppMessage() {
    let goods_id = this.data.goods_id
    return {
      title: this.data.data.productDetail.name,
      path: 'pages/member/shop/goodsinfo/index?scene=' + goods_id
    }
  }

})