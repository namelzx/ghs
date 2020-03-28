// page/userCenter/pages/orderDetail/orderDetail.js
let utils = require("../../../../utils/util.js");
//获取应用实例
const app = getApp()
const userMs = app.userMs;
const data = require("./data.js");
const wxApi = require("../../../../utils/wxApi.js");

import {
  OrderModel
} from '../../../../api/order.js'

let orderModel = new OrderModel();


import {
  PayModel
} from '../../../../api/pay.js'

let payModel = new PayModel();

// console.log(OrderActions)
let pageObj = {

  /**
   * 页面的初始数据
   */
  data: data,

  authMsg(){
    wx.requestSubscribeMessage({
      tmplIds: ['gHQSOcCng-4XY0DlM2b7dcrl626D-F8TylKkrYUcOgU', 'X0uUIhn5jENF4vHQ2m-69RzcEwyd9NMDGHvQxWiwLGs','wVyeppelYymqlhqmveaTIiA_S7tIled9l_1cETl5o-0'],
      success: function (e) {
        console.log(e)
      }, fail(e) {
        console.log(e)
      }
    })
  },
  onDeleteOrderHandler(){
    var that=this;
    let data = that.data.data.orderDetail;
    let goods_id = '';
    for (let i = 0; i < data.goods.length;i++) {
       goods_id = data.goods[i].goods_id+','
    }
    console.log(goods_id)
    wx.navigateTo({
      url: '/pages/userCenter/pages/evaluate/index?order_id= ' + data.id + '&goods_id=' + goods_id,
      success: function(res) {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {},
    })
  },

  getUserInfo(e){
    var that=this;
    var info = wx.getStorageSync('userinfo')
    var temp={
      price: this.data.data.value,
      openid: info.openid
    }
    payModel.Pay(temp,res=>{
      console.log(res)
      let out_trade_no = res.data.out_trade_no
      wx.requestPayment({
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: 'MD5',
        paySign: res.data.paySign,
        success(res) {
       
          var temp={
            user_id:info.id,
            type:2,
            order_id: that.data.data.orderDetail.id,
            price: that.data.data.value,
            out_trade_no: out_trade_no
          }
          orderModel.PayLog(temp,res=>{
            that.getOrderDetailData(that.data.data.orderId)
          })

        },
        fail(res) {
          console.log(res)
        }
      })
    })
    console.log(temp)
  },
  onChange(event) {
    this.setData({
      'data.value': event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '订单详情'
    })
    const id = options.id;
    this.setData({
      "data.orderId": id,
      "state.isIphoneX": app.globalData.isIphoneX
    })
    this.getOrderDetailData(id);
  },
  getOrderDetailData: function (id) {
    const _this = this;

    orderModel.GetDataByInfo(id,res=>{
      console.log(res)
      _this.setData({
        'data.orderDetail':res.data
      })
    })
   
  },
  // 生成订单红包请求
  onCreatePackageRequest: function () {
    const _this = this;
    const id = 1;
    let orderDetail = this.data.data.orderDetail;
    const url = `${config.ApiRoot}/red-envelop/pool/create`;
    userMs.request({
      url,
      data: {
        order_no: id
      },
      method: 'POST',
    })
      .then(res => {
        const {
          code,
          data,
          msg
        } = res.data;
        if (code === 10000) {
          if (data.has_activity) {
            orderDetail.user_id = data.creator;
            orderDetail.shared = 1;
            orderDetail.current_sharing_red_envelop_activity = data.activity;
            orderDetail.red_package_status = true;
            orderDetail.best_envelop_key = data.best_key;
            this.setData({
              "state.shareGroupStatus": true,
              "data.orderDetail": orderDetail
            })
          }
        } else if (code === 10003) {
          this.alertHandler(msg);
        }
      })
      .catch(error => console.log(error))
      .finally(() => wx.hideLoading());
  },
  // 分享事件
  onShareAppMessage: function (e) {
    const _this = this;
    let title; // 分享标题
    let path; // 分享路径
    let queryObj; // 分享参数
    if (e.from == "button") {
      queryObj = {
        order_no: this.data.data.orderDetail.no,
        creator: this.data.data.orderDetail.user_id,
        activity_id: this.data.data.orderDetail.current_sharing_red_envelop_activity.id,
        best_envelop_key: this.data.data.orderDetail.best_envelop_key
      }
      queryObj = encodeURIComponent(JSON.stringify(queryObj))
      path = `/page/userCenter/pages/sharePackage/sharePackage?queryObj=${queryObj}`
      title = `大吉大利拼手气，第${this.data.data.orderDetail.best_envelop_key}个领取的人得大红包`
      console.log(queryObj)
    } else {
      queryObj = {
        // 这里loacationObj 必须先JSON.parse，因为用户存的时候JSON.toString()了一下
        locationObj: wx.getStorageSync("locationObj") ? JSON.parse(wx.getStorageSync("locationObj")) : "",
        storeId: wx.getStorageSync("self_store_id") ? wx.getStorageSync("self_store_id") : (wx.getStorageSync("last_user_store_id") ? wx.getStorageSync("last_user_store_id") : "")
      }
      queryObj = encodeURIComponent(JSON.stringify(queryObj))
      path = `/page/tabBar/index/index?queryObj=${queryObj}`
      title = "壹手仓鲜品・严选品质社区团购"
    }
    return {
      title: title, // 分享标题
      // desc: _this.data.productDetail.short_name, // 分享描述
      imageUrl: "/imgs/share-package-bg.png",
      path: path, // 分享路径
      success: function (res) {

      },
      fail: function (res) {
      }
    }
  },
  onDeleteOrderHit() {
    this.setData({
      'data.show':true,
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
    let _this = this;
    _this.getOrderDetailData(_this.data.data.orderId)
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
  onCopyHandler: function (e) {
    const _this = this;
    wx.requestSubscribeMessage({
      tmplIds: ['gHQSOcCng-4XY0DlM2b7dcrl626D-F8TylKkrYUcOgU'],
      success: function (e) {
        console.log(e)
      }, fail(e) {
        console.log(e)
      }
    })
    let value = e.currentTarget.dataset.no || "";
    wxApi.setClipboardData({
      data: value
    }).then(res => {
      // 现在的复制api，默认成功有提示框了
      // this.setData({
      //   "state.alertingStatus": true,
      //   "state.alertingWords": "复制成功"
      // })
      // setTimeout(function () {
      //   _this.setData({
      //     "state.alertingStatus": false
      //   })
      // }, 2000)
    })
  },
  onCallHandler: function (e) {
    const phone = e.currentTarget.dataset.phone;
    wx.showActionSheet({
      itemList: [phone],
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: phone //仅为示例，并非真实的电话号码
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onGoToLogisticsHandler: function (e) {
    const id = e.currentTarget.dataset.tradeNo;
    wx.navigateTo({
      url: `../logistics/logistics?id=${id}`,
    })
  },
  onGoToReturnPageHandler: function (e) {
    wx.navigateTo({
      url: '../returnPage/returnPage',
    })
  },
  formSubmit: function (e) {

    this.onNowPayHandler(e);
    console.log('form发生了submit事件，携带数据为：', e)
  },
  onNowPayHandler: function (event) {
    let _this = this;

    const orderId = event.detail.target.dataset.orderId;
    // const orderFrom = event.detail.orderFrom;
    const formId = event.detail.formId;
    // if (orderFrom == 1) {
    //   _this.setData({
    //     "state.alertingStatus": true,
    //     "state.alertingWords": "请在微信公众号付款"
    //   })
    //   setTimeout(function () {
    //     _this.setData({
    //       "state.alertingStatus": false
    //     })
    //   }, 2000)
    //   return false;
    // }
    if (this.loading) return;
    this.loading = true;
    const url = `${config.ApiRoot}/orders/pay`;

    wx.showLoading({
      title: '加载中',
    })
    userMs.request({
      url,
      data: {
        order_no: orderId, //订单号
        // form_id: formId
      },
      method: 'post',
    })
      .then(res => {
        // console.log(res.data.code)

        if (res.data.code == 10000) {
          var sign = res.data.data
          return wxApi.requestPayment({
            timeStamp: sign.timeStamp,
            nonceStr: sign.nonceStr,
            package: sign.package,
            signType: sign.signType,
            paySign: sign.paySign
          })
        } else {
          this.alertHandler(res.data.msg)
          throw res
        }
      }).then(res => {
        //支付成功
        wx.showToast({
          title: '支付成功!',
        })
        this.loading = false;
        _this.getOrderDetailData(_this.data.data.orderId);
        app.globalData.isOrderDetailUpdata = true;

      })
      .catch(error => {
        //支付失败或者取消
        console.log(error)
      })
      .finally(() => {
        wx.hideLoading();
        this.loading = false;
      });
  },
  onCloseComfirmHandler: function () {
    this.setData({
      "state.comfirmBoxStatus": false
    })
  },
  onDeleteCallBackHandler: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  onNormalCallBackHandler: function () {
    app.globalData.isOrderDetailUpdata = true;
    this.getOrderDetailData(this.data.data.orderId);
  },
  alertHandler: function (alertText) {
    const _this = this;
    _this.setData({
      "state.alertingStatus": true,
      "state.alertingWords": alertText
    })
    setTimeout(function () {
      _this.setData({
        "state.alertingStatus": false
      })
    }, 2000)
  },
  onGoToReturnPageHandler: function (e) {
    let hasReturn = e.currentTarget.dataset.hasReturn;
    let orderDetail = this.data.data.orderDetail;
    let itemIndex = e.currentTarget.dataset.index;
    let currentItem = e.currentTarget.dataset.currentItem;
    orderDetail.currentItem = currentItem;
    orderDetail.qiniuDomain = this.data.data.qiniuDomain;
    if (hasReturn) {
      wx.navigateTo({
        url: `../returnDetailPage/returnDetailPage?orderDetail=${encodeURIComponent(JSON.stringify(orderDetail))}`,
      })
    } else {
      wx.navigateTo({
        url: `../returnPage/returnPage?orderDetail=${encodeURIComponent(JSON.stringify(orderDetail))}`,
      })
    }

  },

  countDown(time) {
    const lastTime = (time + 30 * 60) * 1000 - new Date().getTime();
    if (lastTime > 0) {
      this.setData({
        'data.countDown': utils.formatTime2(new Date(Number(lastTime)))
      });
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
    } else {
      //进入取消状态，并且显示超时
      this.setData({
        'data.orderDetail.status': -1,
        'data.orderDetail.cancel_type': 1
      });
      app.globalData.isOrderDetailUpdata = true;
    }
  },
 
  onChangeShareGroupStatusHandler: function () {
    this.setData({
      "state.shareGroupStatus": !this.data.state.shareGroupStatus
    })
  }
}
Page(pageObj)