// pages/comment/index.js

import {
  GoodsModel
} from '../../api/goods.js'

let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eva:[
      {
        id:1,
        create_time:"2020-05-06 11:52:10",
        desc:"这个活动很划算，同样价钱比之前充值的次数多了一倍，带娃很合适",
        user:{
          nickName:"城南北。",
          avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJslAVcXkVMicDTqvJQPw0Cw79cdYhvxDFCXTiaKAHg0kctWn2gLKzLpQsvDBo1nf3f9qfdmlCugWUA/132"
        },
        img_list:""
      },
      {
        id:2,
        create_time:"2020-05-06 11:52:10",
        desc:"这个活动很划算，同样价钱比之前充值的次数多了一倍，带娃很合适",
        user:{
          nickName:"城南北。",
          avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJslAVcXkVMicDTqvJQPw0Cw79cdYhvxDFCXTiaKAHg0kctWn2gLKzLpQsvDBo1nf3f9qfdmlCugWUA/132"
        },
        img_list:""
      }
      
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    goodsModel.GetGoodsEvaByList(options.goods_id,res=>{
      console.log(res)
      this.setData({
        eva:res.data
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
  onShareAppMessage: function () {

  }
})