// pages/member/shop/index.js


import {
  GoodsModel
} from '../../../api/goods.js'
import {
  ShopModel
} from '../../../api/shop.js'


let goodsmodel = new GoodsModel();
let shopModel = new ShopModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curImgIndex:1,
    banner:[],
    count:0,
    shop_id:0,
    tabs_id:1,
    list:[],
    shop:{},
    listQuery:{
      limit:20,
      page:1,
      user_id:undefined,
    },
  },
  onTabs(e){
    console.log(e.target.dataset.id)
    this.setData({
      tabs_id: e.target.dataset.id
    })
  },
  handleIndexChange(e) {
    this.setData({
      curImgIndex: e.detail.current + 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    let user_id = decodeURIComponent(options.scene);
    this.data.listQuery.user_id=user_id;
    goodsmodel.GetDataByList(this.data.listQuery,res=>{
      if (res.data.total===0){
        wx.showToast({
          title: '当前店铺中无可售商品',
          icon:'none'
        })
        setTimeout(function(){
          wx.switchTab({
            url: '/pages/member/index',
          })
        },1000)
      }
      _this.setData({
        list:res.data.data,
        shop_id:user_id
      })
      console.log(res.data.data.name)
      
    })
    
    
    var temp={
      user_id: this.data.listQuery.user_id
    }
    shopModel.GetShoplistInfo(temp, res => {
      _this.setData({
        shop: res.data
      })
      let banner = []
      if (res.data.banner !== null){
        let imglsit = res.data.banner.split(',');
        for (let i = 0; i <imglsit.length;i++) {
          banner.push(
            { url:imglsit[i]}
          )
        }
      }
      this.setData({
        banner
      })
   
      console.log(banner)
      wx.setNavigationBarTitle({
        title: res.data.name
      })
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
    let cart=wx.getStorageSync('shop_cart')
    let count=0;
    cart.forEach(element => {
      count=count+element.totalBuyNum
    });
    this.setData({
      count
    })
    
  },

  toPay(){
    if(this.data.count===0){
      wx.showToast({
        title: '购物车没有商品,先挑选一些吧~',
        icon:'none'
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/member/shop/purchase/index?shop_id=' + this.data.shop_id+'&type=2',
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
  onShareAppMessage() {
    let goods_id = this.data.goods_id
    return {
      title: this.data.shop.name,
    }
  }
})