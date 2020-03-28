// page/cart/cart.js
// const data = require("./data.js");
const wxApi = require("../../utils/wxApi.js")
//获取应用实例
const app = getApp()
const userMs = app.userMs;

import {
  UserModel
} from '../../api/user.js'

let usermodel = new UserModel();

// const UtilActions = require("../../class/utilActions.js");
// let utilActions = new UtilActions;

var startX, endX;
var moveFlag = true;// 判断执行滑动事件

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products:[],
   
    data: {
      prosOut:0,
      products: [
      
      ],
      likeProData: [],//猜你喜欢数据
    },
    state: {
      needAuthorize:false,
    //   likeProStaus: false,//猜你喜欢
    //   manageStatus: false,
       selectAllStatus: false,
    //   selectIds: [],
    //   moveState: false,
      allPrice: 0,//总价格
    //   favouredPrice: 0,//优惠价格
    //   marketPrice: 0,//市场价格
    //   deleteComfirm: false,
    //   isDeleteOne: false,
    //   deleteIndex: 0,
    //   isLoading: true
    },
    others: {
      pageUrl: "cartPage"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车',
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
    var car = wx.getStorageSync('cart');
   
    wxApi.getSetting().then(res => {
      console.log(res.authSetting["scope.userInfo"])
      if (res.authSetting["scope.userInfo"]) {
        this.setData({
          "state.needAuthorize": false
        })

        // this.onComputePriceAndCheckAll();
        this.setData({
          products: car
        })
      
      } else {
        wx.navigateTo({
          url: '/pages/userCenter/pages/login/login',
        })
        this.setData({
          "state.needAuthorize": true,
          "state.isLoading": false
        })
      }
    }).catch(err => {
      console.log(err)
    });

    setTimeout(() => {
      //判断是否授权 设置导航背景颜色
      if (this.data.state.needAuthorize) {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#FFCE38',
        });
      } else {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#fff',
        });
      }
    }, 600);

    // this.onComputePriceAndCheckAll();
  },
  touchStart: function (e) {
     
    var idNum = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;

    if (type == 'now') {
      if (idNum == this.data.products[index].id) {
        startX = e.touches[0].pageX; // 获取触摸时的原点
        moveFlag = true;
      }
    } else {
      if (idNum == this.data.prosOut[index].id) {
        startX = e.touches[0].pageX; // 获取触摸时的原点
        moveFlag = true;
      }
    }


  },
  // 触摸移动事件
  touchMove: function (e) {
    var index = e.currentTarget.dataset.index;
    var type = e.currentTarget.dataset.type;
    endX = e.touches[0].pageX; // 获取触摸时的原点
    if (moveFlag) {
      if (endX - startX > 50) {
        console.log("move right");
        moveFlag = false;
        if (type == 'now') {
          this.data.products[index].moveState = false;
          this.setData({
            "products": this.data.products
          });
        } else {
          this.data.prosOut[index].moveState = false;
          this.setData({
            "prosOut": this.data.prosOut
          });
        }
      }
      if (startX - endX > 50) {
        console.log("move left");
        moveFlag = false;

        if (type == 'now') {
          this.data.products[index].moveState = true;
          this.setData({
            "products": this.data.products
          });
        } else {
          this.data.prosOut[index].moveState = true;
          this.setData({
            "prosOut": this.data.prosOut
          });
        }

      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    moveFlag = true; // 回复滑动事件

  },
  
  //跳转去团长端 加盟页面
  onGoToMiniProgram: function () {
    wx.navigateToMiniProgram({
      appId: 'wx05fc0deb15e72f0f',//团长端appId
      path: 'page/userCenter/pages/merchantIntroduction/merchantIntroduction',
      extarData: {
        open: ''
      },
      envVersion: 'release',//develop 开发版 trial 体验版 release正式版
      success(res) {
        // 打开成功
      }
    })
  },
  //父级自定义方法
  onParentEvent: function (e) {
    let detailIndex = e.detail.index;//子级传过来的点击当前产品
    this.onFetchCartList(() => {
      let prosNowNum = 0;
      this.data.data.prosNow.forEach((item) => {
        if (item.activity_goods_id == this.data.data.likeProData[detailIndex].activity_goods_id) {
          prosNowNum = item.num;
        }
      })

      this.data.data.likeProData[detailIndex].num = prosNowNum;
      this.setData({
        "data.likeProData": this.data.data.likeProData
      });
    });
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

  changeManageStatus: function () {
    this.setData({
      "state.manageStatus": !this.data.state.manageStatus
    })
  },
  // 删除请求，删除成功后，重新setData  data.products
  onDeleteRequest: function (deleteIds,index) {
    const _this = this;
    this.data.products.splice(index,1)
    this.setData({
      products: this.data.products
    })
    wx.setStorageSync('cart', this.data.products)

  },
  onDeleteOnehandler: function (e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let type = e.currentTarget.dataset.type;

    if (type == 'now') {
      var activitygoodsid = this.data.products[index].activity_goods_id;//删除当前产品的 
    } else {
      var activitygoodsid = this.data.prosOut[index].goods_id;//删除当前产品的 
    }

    this.setData({
      
      "data.activityGoodsId": activitygoodsid,
      "state.deleteComfirm": true,
      "state.deleteIndex": index,
      "state.isDeleteOne": true,
      "state.deleteArrType": type,
      activity_index:index,
    })
  },
  onDeleteAllhandler: function () {
    this.setData({
      "state.deleteComfirm": true,
      "state.isDeleteOne": false
    })
  },
  onCancelDeleteHandler: function () {
    this.setData({
      "state.deleteComfirm": false,
      "state.isDeleteOne": false
    })
  },
  onConfirmDeleteHandler: function (e) {
    let deleteIds = [];
    let deleteArrType = this.data.state.deleteArrType;
    if (this.data.state.isDeleteOne) {
      deleteArrType == "out" ? deleteIds.push(this.data.data.prosOut[this.data.state.deleteIndex].id) : deleteIds.push(this.data.products[this.data.state.deleteIndex].id);

      this.onDeleteRequest(deleteIds,this.data.activity_index);
    } else {
      // 这里需要筛选下，打勾的全删除，目前没去筛选
      this.data.products.forEach(item => {
        if (item.selected) {
          console.log(item)
          deleteIds.push(item.goods_id)
        }
      })
      this.onDeleteRequest(deleteIds);
    }
    this.setData({
      "state.deleteComfirm": false,
      "state.isDeleteOne": false
    })
  },
  onNumAddHandler: function (e) {
    let index = e.currentTarget.dataset.index;
    this.onUpdateCartData(index, "add");
  },
  onNumDescHandler: function (e) {

    let index = e.currentTarget.dataset.index;
    if (this.data.products[index].totalBuyNum <= 1) {

      this.setData({
        "state.deleteComfirm": true,
        "state.deleteIndex": index,
        "state.isDeleteOne": true,
        "state.deleteArrType": e.currentTarget.dataset.type
      })

    } else {
      this.onUpdateCartData(index, "desc");
    }


  },
  onSeleteHandler: function (e) {
    let index = e.currentTarget.dataset.index;
    console.log(index)
    this.onUpdateCartData(index, "select");
  },

  changeSelectAllStatus: function () {
    
    this.onUpdateAll(!this.data.state.selectAllStatus);
  },

  // 统一计算价格函数
  onComputePriceAndCheckAll: function () {
    let _this=this;
    let allPrice = 0; //总价格
    let marketPrice = 0; //市场价
    let selectAllStatus = true;
    let selectIds = [];
    let selectLength = 0;
   
  
    _this.data.products.forEach(item => {
        if (item.selected) {
          console.log(item.price)
          allPrice += item.price * item.totalBuyNum;
          marketPrice += item.price * item.totalBuyNum;
          allPrice = Number(allPrice.toFixed(2));
          marketPrice = Number(marketPrice.toFixed(2));
          selectLength += item.totalBuyNum;
          selectIds.push(item);
        } else {
          selectAllStatus = false;
        }
      })
      setTimeout(() => {
        _this.setData({
          "state.allPrice": allPrice,
          "state.favouredPrice": ((marketPrice - allPrice) / 100).toFixed(2),
          "state.marketPrice": marketPrice,
          "state.selectAllStatus": selectAllStatus,
          "state.selectIds": selectIds,
          "state.selectLength": selectLength
        })
      }, 200)

    
  },
  // 结算
  onCreateOrderRequest: function () {
    let _this = this;
    if (!this.data.state.selectIds.length > 0) {
      this.setData({
        "state.alertingStatus": true,
        "state.alertingWords": "请选择商品"
      })
      setTimeout(function () {
        _this.setData({
          "state.alertingStatus": false
        })
      }, 2000)
      return false;
    }

    let queryObj = {
      products: _this.data.state.selectIds,
      isFromCart: true,
      isFormProductDetail: false
    }

    wx.setStorageSync('buy', queryObj)
    wx.navigateTo({
      url: '/pages/purchase/index?queryObj=' + encodeURIComponent(JSON.stringify(queryObj)),
    })
  },
  onUpdateCartData: function (index, type) {
    const _this = this;
    const skuDataItem = this.data.products[index];
    let queryObj = {
      activity_goods_id: skuDataItem.activity_goods_id,
      "goods_id": skuDataItem.goods_id,
      "sku_id": skuDataItem.sku_id,
      "type": skuDataItem.type,
      adcode: skuDataItem.adcode
    }
    switch (type) {
      case "add":
        queryObj.num = 1;
        break;
      case "desc":
        queryObj.num = -1;
        break;
      case "select":
        queryObj.selected = !skuDataItem.selected;
        break;
    }
    
    // 这里必须做状态判断，否则，用户连续点击，就会连续触发请求
    if (this.data.state.updateLoading) return;
    this.data.state.updateLoading = true;
    let cartItemNumber = app.globalData.cartItemNumber;
      switch (type) {
        case "add":
          skuDataItem.totalBuyNum++;
          cartItemNumber++;
          break;
        case "desc":
          skuDataItem.totalBuyNum--;
          cartItemNumber--;
          break;
        case "select":
          skuDataItem.selected = !skuDataItem.selected;
          break;
      }
 
      if (cartItemNumber > 0) {
        wx.setTabBarBadge({
          index: 1,
          text: cartItemNumber.toString()
        })
      } else {
        wx.removeTabBarBadge({
          index: 1,
        })
      }

    this.data.state.updateLoading=false;
      this.setData({
        "products": this.data.products
      })
      wx.setStorageSync('cart', this.data.products)
    this.onComputePriceAndCheckAll();
  },
  onUpdateAll: function (selectAllStatus) {
    const _this = this;
    const queryArr = [];
    this.data.products.forEach((item, index) => {
      queryArr[index] = {
        goods_id: item.goods_id,
        type: 1,
        selected: selectAllStatus ? 1 : 0,

      }
    });


    if (selectAllStatus) {
      this.data.products.forEach(item => {
        item.selected = true
      })
    } else {
      this.data.products.forEach(item => {
        item.selected = false
      })
    }

    this.setData({
      "products": this.data.products
    })
    this.onComputePriceAndCheckAll();
    return 1
  },

  onGoToProductDetail: function (e) {
    const index = e.currentTarget.dataset.index;
    const type = e.currentTarget.dataset.type;
    let proObj;
    if (type == "now") {
      proObj = this.data.products[index];
    } else {
      proObj = this.data.prosOut[index];
    }
    let queryObj = {
      isGroupBuyStatus: false,
      activityId: proObj.activity_goods_id,
      type: proObj.type ? proObj.type : 1
    }
    wx.navigateTo({
      url: `../productDetail/productDetail?queryObj=${encodeURIComponent(JSON.stringify(queryObj))}`,
    })
  },
  userInfoHandler: function (e) {
    let _this = this;
  
   
    if (e.detail && e.detail.errMsg === "getUserInfo:fail auth deny") {
        wx.showToast({
          title: '授权后方可使用购物车',
          icon:'none'
        })

    } else {
      wx.showLoading({
        title: '加载中',
      })

      // 当用户允许授权时，调用登录，保存token
      wx.showLoading({
        title: '授权中...',
      });

    let userinfo=  wx.getStorageSync('userinfo')
      let data = e.detail.userInfo
      data.id = userinfo.id
      usermodel.PostUserByData(data,res=>{
        wx.hideLoading()
        _this.setData({
          'state.isLoading':true,
          'state.needAuthorize':true,
        })
      })
      
    //   userMs.request(data).then(res => {
    //     const { data, code } = res.data;
    //     if (code === 10000) {

    //       if (data) {

    //         wx.setNavigationBarColor({
    //           frontColor: '#000000',
    //           backgroundColor: '#fed402',
    //         });



    //       }
    //     }
    //   }).catch(err => {
    //     this.alertHandler(err);
    //     console.log(err)
    //   })
    //     .finally(res => {
    //       wx.hideLoading()
    //     })

    }
  },
  onPreventDefault: function () {
    return false;
  },
  onGoToLoginPage: function () {
    wx.navigateTo({
      url: '/page/userCenter/pages/login/login',
    })
  },
  onGoToHomeHandler: function () {
    wx.reLaunch({
      url: '/page/tabBar/index/index',
    })
  },
  // alertHandler: utilActions.alertHandler,
})