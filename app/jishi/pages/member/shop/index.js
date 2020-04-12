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
        list:res.data.data
      })
      console.log(res.data.data.name)
      
    })
    
    
    var temp={
      user_id: this.data.listQuery.user_id
    }
    shopModel.GetShoplistInfo(temp, res => {
      console.log(res,111)
      _this.setData({
        shop: res.data
      })
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