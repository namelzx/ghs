// page/purchase/purchase.js
const data = require("./data.js");
const wxApi = require("../../../../utils/wxApi.js");
import {
  OrderModel
} from '../../../../api/order.js'

let orderModel = new OrderModel();
//获取应用实例
const app = getApp()
const userMs = app.userMs;

// 引用封装的本地存储函数
const util = require("../../../../utils/util.js");
let pageObj = {

  /**
   * 页面的初始数据
   */
  data: data,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    _this.setData({
      shop_id:options.shop_id
    })
    wx.setNavigationBarTitle({
      title: '订单确认',
    });

    let queryObj = wx.getStorageSync('shopbuy');
    let arryProducts = []
    let arryTime = [];


    this.setData({
      "data.products": queryObj,
      // "state.isFormProductDetail": queryObj.isFormProductDetail,
      // "data.qiniuDomain": userMs.config["qiniuDomain"]
    })
    this.oncomputedHandler();
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

    let communityObj = wx.getStorageSync("communityObj");

    if (communityObj) {
      this.setData({
        "state.address": JSON.parse(communityObj)
      })
      // 必须本地先选择了地址，因为可用红包需要判断门店id
      this.onFetchPackageAbleListHandler();
    }


  },
  //获取时间搓时间day
  getTimeDays: function (tamp) {
    var now = new Date(Number(tamp) * 1000);
    var day = now.getDate();
    var month = now.getMonth() + 1;
    return month + '/' + day;
  },
  // 通过门店id 获取门店地址函数
  getStoreIdAddress: function (id) {
    let _this = this;
    let url = `${config.ApiRoot}/store/related-merchant`;

    let data = {
      url,
      data: {
        store_id: id
      }
    }
    userMs.request(data)
      .then(res => {
        const {
          data,
          code,
          msg
        } = res.data
        if (code == 10000) {
          if (data && data.store_status == 1) {
            data.canSeedName = utilActions.formateToShadowText(1, 1, data.contact);
            data.canSeedMobile = utilActions.formateToShadowText(3, 4, data.mobile);
            let address = {
              ...data,
              id: id,
              address: data.store_address + data.community_name,
              name: data.store_name
            }
            this.setData({
              "state.address": address
            })
            // 必须本地先选择了地址，因为可用红包需要判断门店id
            this.onFetchPackageAbleListHandler();
          } else {
            // this.onGetAddressList();
          }
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(res => {
        wx.hideLoading();
      })
  },
  //点击件数按钮下拉出产品
  onSwitchHeightHandler: function () {

    this.setData({
      "state.switchHeight": !this.data.state.switchHeight
    });
  },
  // 获取配送费接口 目前没用上
  onFetchFree: function () {
    let _this = this;
    let id = this.data.data.id;
    let url = `${config.ApiRoot}/freight/calculate`;
    let arr = [];
    this.data.data.products.forEach(item => {
      arr.push(item.goods_id)
    })
    let data = {
      url,
      method: "POST",
      data: {
        goods_ids: arr
      }
    }
    userMs.request(data)
      .then(res => {
        const {
          data,
          code,
          msg
        } = res.data
        if (code == 10000) {

          _this.setData({
            "data.fee": data.fee,
          })

          this.oncomputedHandler();
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(res => {
        wx.hideLoading();
      })
  },

  // 获取可用红包请求
  onFetchPackageAbleListHandler: function () {
    if (!this.data.state.address) {
      return false;
    }
    let _this = this;
    let id = this.data.data.id;
    let url = `${config.ApiRoot}/red-envelop/available-items`;
    let queryObj = {
      store_id: this.data.state.address.id
    };
    let arr = [];
    this.data.data.products.forEach(item => {
      let obj = {
        activity_goods_id: item.activity_goods_id,
        goods_id: item.goods_id,
        sku_id: item.sku_id,
        number: item.num,
        type: item.type
      }
      arr.push(obj)
    })
    queryObj.goods = arr;
    if (wx.getStorageSync("communityObj")) {
      queryObj.adcode = JSON.parse(wx.getStorageSync("communityObj")).adcode
    }

    let data = {
      url,
      method: "POST",
      data: queryObj
    }
    userMs.request(data)
      .then(res => {
        const {
          data,
          code,
          msg
        } = res.data
        if (code == 10000) {
          let canUsePackageNum = 0;
          data.forEach(item => {
            item.deadlineUtil = util.formatTimeToDay(new Date(item.deadline * 1000));
            let matchArr = this.splitIntFloat(item.amount / 100);
            item.amountInt = matchArr[1];
            item.amountFloat = matchArr[2] ? matchArr[2] : "";
            item.available && ++canUsePackageNum;
          })
          this.setData({
            "data.packageList": data,
            "data.canUsePackageNum": canUsePackageNum
          })
        }
      }).catch(err => {
        console.log(err)
      });

  },
  // 切割整数小数部分函数
  splitIntFloat: util.splitIntFloat,
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

  // alert 提示function
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
  formSubmit: function (e) {
    this.formId = e.detail.formId;
    // this.onGotoProductDetail();
    this.onCheckValueHandler();
    console.log('form发生了submit事件，携带数据为：', e)
  },

  // 判断字段是否合法
  onCheckValueHandler: function () {


    if (!this.data.data.buyerName) {
      wx.showToast({
        title: '请填写提货人姓名',
        icon: 'none'
      })
      return;
    }
    if (!this.data.data.buyerPhone) {
      wx.showToast({
        title: '请填写提货人电话',
        icon: 'none'
      })
      return;
    }
    let reg = /^1[3456789]\d{9}$/;

    if (!reg.test(this.data.data.buyerPhone)) {

      wx.showToast({
        title: '请填写合法手机号',
        icon: 'none'
      })
      return;
    }
    this.setData({
      "state.onComfirmBoxStatus": true,
      "data.buyerName": this.data.data.buyerName,
      "data.buyerPhone": this.data.data.buyerPhone,
      "data.buyerText": this.data.data.buyerText
    })
  },

  // 创建订单 && 支付事件
  onSureOrderComfirmHandler: function () {
    const _this = this;
    let userinfo = wx.getStorageSync('userinfo')
    this.payingStatus = true;
    let cart = wx.getStorageSync('shopbuy')
    let queryObj = {
      pay_type: 1,
      totalPrice: this.data.state.goodsPrice ,
      items: cart,
      type:2,
      shop_id: _this.data.shop_id,
      user_id: userinfo.id,
      buyerName: this.data.data.buyerName, // 用户名
      mobile: this.data.data.buyerPhone, //手机号码
      addressText: this.data.data.addressText, //收货地址
      buyerText: this.data.data.buyerText, //订单备注
      openid:userinfo.openid,
      type:2
    }
    orderModel.PostDataBycreateOrder(queryObj, res => {


      let paydata = res.data;
      wx.requestPayment({
        timeStamp: paydata.timeStamp,
        nonceStr: paydata.nonceStr,
        package: paydata.package,
        signType: 'MD5',
        paySign: paydata.paySign,
        success(res) {
          console.log(res)
          var temp = {
            id: paydata.id,
            status: 2,
            out_trade_no: paydata.out_trade_no
          }
          orderModel.PostDataByUpdate(temp, res => {
            wx.showToast({
              title: '支付成功!',
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/userCenter/pages/orderList/orderList?id=' + res.data
              })
            }, 1000);
          })

        },
        fail(res) {
          wx.redirectTo({
            url: '/pages/userCenter/pages/orderDetail/orderDetail?id=' + paydata.id
          })
        }
      })

    })

    //请求创建订单
    console.log(queryObj)



  },

  // 之前地址直接保存在本地，现在每次都请求接口，获取地址列表
  // 当用户本地没有地址时，则提示点击添加收获地址
  // 当用户本地有地址，则拿地址列表遍历一遍，如果该地址未被删除，则显示，否则提示点击添加收获地址
  onGetAddressList: function () {
    let _this = this;
    let url = `${config.ApiRoot}/store/list`;
    let locationObj = wx.getStorageSync("locationObj")
    if (locationObj) {
      locationObj = JSON.parse(locationObj)
    }
    let queryObj = {
      adcode: locationObj.adcode
    };
    if (locationObj.com) {
      queryObj.community_id = locationObj.com.id
    }
    let data = {
      url,
      data: queryObj
    }
    userMs.request(data)
      .then(res => {
        const {
          data,
          code,
          msg
        } = res.data
        if (code == 10000) {
          let localAddress = wx.getStorageSync("address");
          let address = ""; // 判断本地地址是否可用，再赋值给该变量
          if (!localAddress) {

          } else {
            localAddress = JSON.parse(localAddress);
            data.forEach(item => {
              if (item.id == localAddress.id) {
                // 如果接口的地址跟本地地址 id相同，则更新接口地址到本地
                item.canSeedName = utilActions.formateToShadowText(1, 1, item.contact);
                item.canSeedMobile = utilActions.formateToShadowText(3, 4, item.mobile);

                wx.setStorageSync("address", JSON.stringify(item))
                address = item
              }
            })
          }
          this.setData({
            "state.address": address
          })
          // 必须本地先选择了地址，因为可用红包需要判断门店id
          this.onFetchPackageAbleListHandler();
        } else {
          throw res;
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(res => {
        wx.hideLoading();
      })
  },

  // 获取本地地址
  getAddress: function () {
    const _this = this;

    wxApi.getStorage({
      key: 'address'
    })
      .then(res => {
        const address = JSON.parse(res.data);
        _this.setData({
          "state.address": address
        });
      })
      .catch(error => console.log(error));
  },

  // 
  onOpenSettingNeedBtn: function () {
    wxApi.getSetting().then(res => {
      console.log(res)
      if (res.authSetting["scope.address"] !== undefined && res.authSetting["scope.address"] === false) {
        if (wx.canIUse("button.open-type.openSetting")) {
          this.setData({
            "state.needOpenSettingBtn": true
          })
        } else {

        }
      }

    })
  },

  // 第一次调用获取地址授权事件
  onSelectAddress: function () {

    const _this = this;

    wxApi.authorize({
      scope: "scope.address"
    }).catch(e => {
      return wxApi.openSetting().then(res => {
        if (res.authSetting["scope.address"]) {
          return;
        } else {
          throw "授权失败！";
        }
      }).catch(err => {
        // 这里的思路是，先让用户授权地址，用户拒绝以后，先进入一次设置页
        // 如果 opensetting api 报错，
        // 如果是 用户自己取消授权，则不是api 报错
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
      return wxApi.chooseAddress()
        .then(res => {
          delete res.errMsg;

          _this.setData({
            "state.address": res
          });

          return wxApi.setStorage({
            key: "address",
            data: JSON.stringify(res)
          })
        });
    }).catch(err => {
      if (typeof err === "string") {
        wx.showToast({
          title: err,
          image: "/imgs/cancel.png",
          duration: 2000
        });
      }
    });
  },

  // 打开设置页面回调函数判断地址
  // openSettingHandler: function (e) {
  //   let _this = this;
  //   if (e.detail.authSetting && e.detail.authSetting["scope.address"]) {
  //     this.setData({
  //       "state.needOpenSettingBtn": false
  //     })
  //     wxApi.chooseAddress()
  //       .then(res => {
  //         delete res.errMsg;

  //         _this.setData({
  //           "state.address": res
  //         });

  //         return wxApi.setStorage({
  //           key: "address",
  //           data: JSON.stringify(res)
  //         })
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       });
  //     console.log(e)
  //   } else {
  //     wx.showToast({
  //       title: "授权失败",
  //       image: "/imgs/cancel.png",
  //       duration: 2000
  //     });
  //   }
  // },

  // 数量减事件
  // onNumDescHandler:function(e){
  //   let index = e.currentTarget.dataset.index;
  //   this.data.data.products[index].num--;
  //   this.setData({
  //     "data.products": this.data.data.products
  //   })
  //   this.oncomputedHandler();
  // },

  // 数量加事件
  // onNumAddHandler: function(e){
  //   let index = e.currentTarget.dataset.index;

  //   this.data.data.products[index].num++;
  //   this.setData({
  //     "data.products": this.data.data.products
  //   })
  //   this.oncomputedHandler();
  // },

  // 计算商品总价function
  oncomputedHandler: function () {
    let goodsPrice = 0;
    this.data.data.products.forEach(item => {
      goodsPrice = Number((item.totalBuyNum * item.price + goodsPrice).toFixed(2))
    })
    this.setData({
      "state.goodsPrice": goodsPrice,
    })
  },

  // 选择门店事件
  onGotoLocationListHandler: function () {
    wx.navigateTo({
      url: `../index/pages/location/location`,
    })
  },

  // 输入买家姓名事件
  onInputBuyerNameHandler: function (e) {
    this.data.data.buyerName = e.detail.value;
  },

  // 输入买家手机号事件
  onInputBuyerPhoneHandler: function (e) {
    this.data.data.buyerPhone = e.detail.value;
  },
  //收货地址
  onInputAddressTextHandler: function (e) {
    this.data.data.addressText = e.detail.value;
    this.setData({
      'data.addressText': e.detail.value
    })
  },

  // 输入备注事件
  onInputBuyerTextHandler: function (e) {
    this.data.data.buyerText = e.detail.value;

    this.setData({
      'data.buyerText': e.detail.value
    })
  },

  // 关闭订单确认弹窗事件
  onCloseOrderComfirmHandler: function (e) {
    this.setData({
      "state.onComfirmBoxStatus": false
    })
  },

  // 打开关闭选择红包弹窗
  onChangePackageBoxStatusHandler: function () {
    this.setData({
      "state.choosePackageStatus": !this.data.state.choosePackageStatus
    })
  },

  // 选择不用红包事件
  onCancelUsePackageHandler: function () {
    this.setData({
      "state.choosePackageStatus": false,
      "data.selectPackageItem": ""
    })
  },


  // 选择红包回调事件
  onChoosePackageItemHandler: function (e) {
    if (this.data.data.selectPackageItem.id !== e.detail.id) {
      this.setData({
        "data.selectPackageItem": e.detail
      })
    }
    let totalPrice = this.data.state.goodsPrice - this.data.data.selectPackageItem.amount;
    this.setData({
      "state.choosePackageStatus": false,
      "state.totalPrice": totalPrice > 0 ? totalPrice : 0
    })
  }
}
Page(pageObj)