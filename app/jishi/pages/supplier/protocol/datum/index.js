// pages/supplier/protocol/datum/index.js
import Toast from '../../../../vant-weapp/dist/toast/toast';
const uploadImage = require('../../../../utils/uploadAliyun.js');
let base_img = 'https://kedand.oss-cn-beijing.aliyuncs.com/';
import {
  SupplierModel
} from '../../../../api/supplier.js'

let supplierModel = new SupplierModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    temp:{
      supplier_name:'',
      name:'',
      phone:'',
      addres:'',
      identity:'',
      idfront_url:'',
      idside_list:''

    },
    pList: [],
    fList:[]
  },
  delPic(e) {
    
    let type = e.currentTarget.dataset.type;
    if (type==1){
      let list = this.data.pList
      list.splice(e.detail.index, 1)
      this.setData({ pList: list })
    }
    else{
      let list = this.data.fList
      list.splice(e.detail.index, 1)
      this.setData({ fList: list })
    }
  },
  afterRead(event) {
    //启用
    var _this = this;
    var { suffix, type } = event.currentTarget.dataset
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
          console.log(res)
          //结束
          var temp = {
            url: base_img + res,
          }
          if (type === 1) {
            var dtemp = _this.data.pList;
            dtemp.push(temp);
            _this.setData({
              pList: dtemp
            })
            
          }
          if (type === 2) {
            var dtemp = _this.data.fList;
            dtemp.push(temp);
            _this.setData({
              fList: dtemp
            })
           
          }
        },
        fail: function (res) {
          console.log("上传失败")
          
        }
      })
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  },
  //检查必填项是否为空
  checkRequired() {
    if (this.data.temp.supplier_name === ''){
      Toast('供货商名称不能为空');
    }
    else if (this.data.temp.name === '') {
      Toast('联系人姓名不能为空');
    }
    else if (this.data.temp.phone === '') {
      Toast('联系人电话不能为空');
    }
    else if (this.data.temp.addres === '') {
      Toast('联系人地址不能为空');
    }
    else if (this.data.temp.identity === '') {
      Toast('身份证号不能为空');
    }
    else if (this.data.pList.length === 0) {
      Toast('请先添加身份证正面');
    }
    else if (this.data.fList.length === 0) {
      Toast('请先添加身份证反面');
    }
    else {
      this.addProduct()
    }
  },
  addProduct() {
    let data = this.data.temp
    
    //正面
    let plist = [];
    for (let i = 0; i < this.data.pList.length; i++) {
      plist.push(this.data.pList[i].url)
    }
    data.idfront_url = this.data.pList[0].url;

    //反面
    let flist = [];
    for (let i = 0; i < this.data.fList.length; i++) {
      flist.push(this.data.fList[i].url)
    }
    data.idside_list = flist.join(',');
    var userinfo = wx.getStorageSync('userinfo')
    data.user_id = userinfo.id
    
    supplierModel.PostDataByAdd(data, res => {
      wx.navigateTo({
        url: '/pages/supplier/protocol/hint/index',
      })
    })

  },
  //供货商名称
  onChange(event) {
    this.setData({
      'temp.supplier_name': event.detail
    })
  },
  //联系人姓名
  onChangeName(event) {
    this.setData({
      'temp.name': event.detail
    })
  },
  //联系人电话
  onChangePhone(event) {
    this.setData({
      'temp.phone': event.detail
    })
  },
  //详情地址
  onChangeAddres(event) {
    this.setData({
      'temp.addres': event.detail
    })
  },
  //身份证号
  onChangeID(event) {
    this.setData({
      'temp.identity': event.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '填写资料'
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