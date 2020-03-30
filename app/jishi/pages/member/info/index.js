// pages/product/index.js

import Toast from '../../../vant-weapp/dist/toast/toast';




import {
  ShopModel
} from '../../../api/shop.js'

let shopModel = new ShopModel();



import {
  CommunityModel
} from '../../../api/community.js'

let communityModel = new CommunityModel();

const uploadImage = require('../../../utils/uploadAliyun.js');
let base_img = 'https://kedand.oss-cn-beijing.aliyuncs.com/';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pList: [],
    vList: [],
    actions:[],
    show:false,
    state:{
      communityObj:{},
    },
    community_name:'',
    data: {
      community_id: 0,
      name: '',
      user_id:undefined,
      address:'',
      shop_img: undefined,
       desc:'',
      tel:'',
    },
    iList: [],
    name: '',
    price: '',
    desc: '',
    stock: '',
  },
  toCommunity(){
    wx.navigateTo({
      url: '/pages/location/index',
    })
  },

  afterRead(event) {
    var _this = this;
    let { suffix, type } = event.currentTarget.dataset
    type = parseInt(type)
    const {
      file
    } = event.detail;

    uploadImage(
      {
        filePath: file.path,
        suffix: suffix,
        dir: "images/",
        success: function (res) {
          var temp = {
            url: base_img + res,
          }
          if (type === 1) {
            _this.data.data.shop_img = base_img + res
            var dtemp = _this.data.pList;
            dtemp.push(temp);
            _this.setData({
              pList: dtemp
            })
            console.log(_this.data.pList)
          }
        },
        fail: function (res) {
          console.log("上传失败")
          console.log(res)
        }
      })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式

  },

  // 检查价格是否为纯数字
  checkNumber(e) {
    console.log(Number(e.detail))
    if (isNaN(Number(e.detail))) {
      Toast('价格必须是数字');
      this.setData({ price: '' })
    }
  },

  //检查必填项是否为空
  checkRequired() {
    console.log(this.data.pList.length)
     if (this.data.data.name === '') {
      Toast('店铺名称不能为空');
     } else if (this.data.data.tel === '') {
      Toast('请填写联系电话');
     } else if (this.data.data.desc === '') {
      Toast('请添加门店描述');
     } else if (this.data.data.address === '') {
      Toast('请填写联系地址');
     } else if (this.data.data.community_id === '') {
       Toast('请选择小区');
     } else {
      this.addProduct()
    }
  },

  addProduct() {
    let data = this.data.data
    shopModel.PostDataByAdd(data,res=>{
       wx.navigateBack({
        delta: 1,
      })
    })
    // var userinfo = wx.getStorageSync('userinfo')
    // data.user_id = userinfo.id
    // goodsModel.PostDataByAdd(data, res => {
    //   wx.navigateBack({
    //     delta: 1,
    //   })
    // })

  },
  //门店名称

  setName(e) {
    console.log(e)
    this.setData({ 'data.name': e.detail.value })
  },

  line_price: undefined,
//联系电话
  setTel(e) {
    console.log(e)
    this.setData({ 'data.tel': e.detail.value })
  },

  //门店地址
  setaddress(e) {
    console.log(e)
    this.setData({ 'data.address': e.detail.value })
  },

  //商品描述
  setDesc(e) {
    this.setData({
      'data.desc': e.detail.value
    })
  },

  //库存



  setStock(e) {
    console.log(e)
    this.setData({ 'data.inventory': e.detail.value })
  },
  delPic(e) {
    console.log(e)
    let list = this.data.pList
    list.splice(e.detail.index, 1)
    this.setData({ pList: list })
  },
  delVdo(e) {
    console.log(e)
    let list = this.data.vList
    list.splice(e.detail.index, 1)
    this.setData({ vList: list })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商家中心-店铺管理',
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
    var _this=this;
    let userinfo=wx.getStorageSync('userinfo')
    shopModel.GetUserIdByInfo(userinfo.id,res=>{
      console.log(res)
      if(res.data===null){

      }else{
        let pList = [{
          url: res.data.shop_img
        }]
        _this.setData({
          'data': res.data,
          'pList': pList,
          'community_name': res.data.community.name
        })
      }
      if(res.data){

        this.setData({
          "state.communityObj": res.data.community,
        })
        
      
      }else{
        let communityObj = wx.getStorageSync("communityObj");
        let commun = JSON.parse(communityObj)

      
        if (communityObj) {
          this.setData({
            "state.communityObj": commun,
          })
          this.data.data.community_id = commun.id
        }else{
          wx.showToast({
            title: '当前未选择小区',
            icon:'none',
          })
        }
      }
      
    })

    communityModel.GetDataBylist(res=>{
      _this.setData({
        actions:res.data,
        'data.user_id':userinfo.id
      })
    })
  },

  community(){
    console.log(1)
      this.setData({
        show:!this.data.show
      })
  },
  onSelect(e){
    console.log(e)
    this.data.data.community_id = e.detail.id
    this.setData({
      community_name: e.detail.name
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
  onShareAppMessage: function () {

  }
})