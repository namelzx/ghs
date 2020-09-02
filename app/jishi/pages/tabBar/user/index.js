
const wxApi = require("../../../utils/wxApi.js");
//获取应用实例
const app = getApp()
const userMs = app.userMs;



import {
  UserModel
} from '../../../api/user.js'

let usermodel = new UserModel();



import {
  NoticeModel
} from '../../../api/notice.js'

let noticeModel = new NoticeModel();
let pageObj = {

  /**
   * 页面的初始数据
   */
  data: {
    data:{
      userInfo:{}
    }
  },

  /**
   * 去链接
   */
  toUrl(e){
    let { url } = e.currentTarget.dataset
   wx.navigateTo({
     url
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '个人中心'
    });



    this.getSystemInfoHandler();
  },
  onMessage(e){
    let that=this;
    let userinfo=wx.getStorageSync('userinfo')

    console.log(this.data.userInfo)
    var temp={
      user_id:userinfo.id,
      type:e.currentTarget.dataset.type
    }
    noticeModel.GetDataByNotice(temp,res=>{
      console.log(res)
      wx.requestSubscribeMessage({
        tmplIds: res.data,
        success: function (e) {
          console.log(e)
          that.getuser()
        }, fail(e) {
          console.log(e)
        }
      })  
     this.getuser();
    })
     
  },
  // 获取设备信息，设备宽
  getSystemInfoHandler: function () {
    let _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.windowWidth = res.windowWidth;
        _this.WidthRadio = res.windowWidth / 750;
      }
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
    // 我们目前的后台登录，必须用code，iv，enctyData
    // 所以我们需要用户授权，所以这里需要判断
    // 如果用户关闭授权，就提示用户登录
 
    wxApi.getSetting().then(res => {
      console.log(res)
      if (res.authSetting['scope.userInfo']) {
        this.onCallHandlers();
        this.setData({
          "state.needAuthorize": false
        })
      } else {
        wx.navigateTo({
          url: '/pages/userCenter/pages/login/login',
        })
      }
    });
    this.userInfoHandler();

    this.setData({
      "state.canLookOtherStore": wx.getStorageSync("last_user_store_id") ? true : false,
    });
    

    setTimeout(() => {
      this.getuser();
      //判断是否授权 设置导航背景颜色
      if (this.data.state.needAuthorize) {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#FFCE38',
        });
      } else {
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: '#fed402',
        });
      }
    }, 600);
  },
  getuser(){
    let user=wx.getStorageSync('userinfo')
    usermodel.GetUserByInfo(user.id,res=>{
      this.setData({
        userInfo:res
      })
      wx.setStorageSync('userinfo', res)
    })
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
  onCallHandlers: function () {
    this.onFetchUserData();
    this.onFetchOrdersCounter();
    this.fetchPackageList();
    this.onFetchDeliveryCode();
  },
  onFetchUserData: function () {
    let _this = this;
    let userinfo=wx.getStorageSync('userinfo')
    this.setData({
      userInfo
    })
    wx.getUserInfo({
      success: function (res) {
        res.userInfo.id = userinfo.id
        usermodel.PostUserByData(res.userInfo,res=>{
          wx.setStorageSync('userinfo', res)
          _this.setData({
            'data.userInfo':res
          })
          console.log(_this.data.data.userInfo)
        })
        
        
      }
    })
  
  },
  onFetchOrdersCounter: function () {
    let _this = this;
   
  },
  fetchPackageList: function () {
    const _this = this;
   
  },

  // 获取提货码接口
  onFetchDeliveryCode: function () {
   
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   "state.selectType": "user"
    // })
    this.data.state.clickNum = 0
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

  userInfoHandler: function (e) {
    let userinfo = wx.getStorageSync('userinfo')
    this.setData({
      'data.userInfo': userinfo
    })
  },
  // 当没有手机号则需要进入绑定页
  getPhoneStatus: function () {
    const { userInfo } = this.data.data;
    return !!userInfo.mobile
  },
  onGoToOrders: function (e) {
    const type = e.currentTarget.dataset.type;
    console.log(type)
    wx.navigateTo({
      url: `/pages/userCenter/pages/orderList/orderList?type=${type}`
    })
    if (!this.getPhoneStatus()) {

      wx.navigateTo({
        url: '/page/userCenter/pages/login/login',
      });

      // this.setData({
      //     "state.orderNeedAuthorize":true
      // })

    } else {
      
      const type = e.currentTarget.dataset.type;
      console.log(type)
      wx.navigateTo({
        url: `/page/userCenter/pages/orderList/orderList?type=${type}`
      })
    }
  },
  onGotoAddressListHandler: function () {
    if (!this.getPhoneStatus()) {
      wx.navigateTo({
        url: '/page/userCenter/pages/login/login',
      })
    } else {
      wx.navigateTo({
        url: `/page/userCenter/pages/addressList/addressList?comeFromPage=${this.data.others.pageUrl}`,
      })
    }
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
  onPreventHandler: function () {
    return false;
  },

  onSeedSellerInfoHandler: function () {
    wx.navigateTo({
      url: '/page/userCenter/pages/sellerInfo/sellerInfo',
    })
  },
  onSeedSellerSaleDataHandler: function () {
    wx.navigateTo({
      url: '/page/userCenter/pages/saleData/saleData',
    })
  },
  onCallHandler: function (e) {
    wx.showActionSheet({
      itemList: ['4000585825'],
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: '4000585825' //仅为示例，并非真实的电话号码
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onGoToDebugPageHandler: function () {
    ++this.data.state.clickNum;
    if (this.data.state.clickNum > 20) {
      wx.navigateTo({
        url: '/page/userCenter/pages/debug/debug',
      })
    }
  },
  onGoToRedPackageHandler: function () {
    wx.navigateTo({
      url: '/page/userCenter/pages/redPackage/redPackage',
    })
  },
  onChangeQRCodeBoxStatusHandler: function () {
    this.setData({
      "state.qRCodeBoxStatus": !this.data.state.qRCodeBoxStatus
    })
  }
}

// pageObj = util.mixin(pageObj);

Page(pageObj)