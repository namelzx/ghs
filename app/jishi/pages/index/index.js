//index.js

import {
  CategoryModel
} from '../../api/category.js'

let categoryModel = new CategoryModel();


import {
  HomeModel
} from '../../api/home.js'

let homeModel = new HomeModel();



import {
  GoodsModel
} from '../../api/goods.js'

let goodsModel = new GoodsModel();



Page({
  data: {
    faddish:[],
    vertical: false,
    circular: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    curImgIndex: 1,
    autoplayHot:true,
    intervalHot:5000,
    locationObj: {},
    listQuery: {
      limit: 20,
      page: 1,
    },
    ac: 1,
    filters: [
    ],
    imgList: [
      
    ],
  

    recom: [
      
    ],


  },
  
  toShop(){
    wx.navigateTo({
      url: '/pages/product/index',
    })
  },
  //轮播
  clickToRecom(e) {
    let {
      id
    } = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
     
      url: '/pages/details/index?scene=' + id,
    })
  },
  toNonew(){
    // wx.showToast({
    //   title: '功能未开放',
    //   icon:'none'
    // })
   wx.switchTab({
     url: '/pages/tabBar/user/index',
   })
  },

  onSelectFilterHandler(e) {
    var that=this;
    that.data.listQuery.page=1;
    that.data.listQuery.category_id = e.currentTarget.dataset.id
    that.getList();
    this.setData({
      ac: e.currentTarget.dataset.id
    })
  },
  getList(){
    var that=this;
    goodsModel.GetDataByList(this.data.listQuery, res => {
      that.setData({
        recom: res.data.data
      })
    })
  },
  onLoad() {
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude)
      }
    })
  },
  handleIndexChange(e) {
    this.setData({
      curImgIndex: e.detail.current + 1
    })
  },
  onShow() {
    var that = this;
    wx.setNavigationBarTitle({
      title: '随卖',
    })
    wx.requestSubscribeMessage({
      success:function(e){
          console.log(e)
      }, fail(e){
        console.log(e)
      }
    })
    categoryModel.GetCategoryByList(res => {
      that.setData({
        filters: res.data,
        ac: res.data[0].id
      })
    
      this.data.listQuery.category_id = res.data[0].id
      this.getList();
     


    })
    homeModel.GetAppByHomer(res=>{
      console.log(res)
      that.setData({
        imgList: res.data.banner,
        faddish: res.data.faddish
      })
    })
    let locationObj = wx.getStorageSync("locationObj");
    console.log(locationObj)
    this.setData({
      locationObj: JSON.parse(locationObj),
    })
  },
})