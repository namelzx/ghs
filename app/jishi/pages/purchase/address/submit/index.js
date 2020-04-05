// pages/purchase/address/submit/index.js
import Toast from '../../../../vant-weapp/dist/toast/toast';
import {
  CityModel
} from '../../../../api/city.js';
import {
  UserAdderssModel
} from '../../../../api/useraddress.js';

let cityModel = new CityModel();
let userAdderssModel = new UserAdderssModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scroll_height:0,
    status:1, //添加还是更新
    list:{
      name:'',
      phone:null,
      address:''
    },
    steps:[
      {
        text: '选择省份'
      },
      {
        text: '选择城市'
      },
      {
        text: '选择区域'
      },
    ],
    stpe:0,
    addressShow:false,
    pid: 0,
    active: 0,
    province: "选择省份",
    province_code: undefined,
    city_code: undefined,
    district_code: undefined,
    area:"", //地区拼接
    areaJson:{},
    addres_id: undefined
  },
  toggleAddress(){
    this.setData({
      addressShow:true
    })
  },
  //收货人
  bindKeyname(e) {
    this.setData({
      'list.name': e.detail.value
    })
  },
  //联系电话
  bindKeyphone(e) {
    this.setData({
      'list.phone': e.detail.value
    })
  },
  //详细地址
  bindKeyaddress(e) {
    this.setData({
      'list.address': e.detail.value
    })
  },
  //保存
  toggleSubmit() {
    
    let that = this.data
    if (that.list.name==''){
      Toast('请先填写收货人姓名');
    }
    else if (that.list.phone == '') {
      Toast('请先填写联系电话');
    }
    else if (that.area == '') {
      Toast('请先选择区域');
    }
    else if (that.list.address == '') {
      Toast('请填写详细地址');
    }
    else{
      var userinfo = wx.getStorageSync('userinfo')
      let temp = that.list;
      temp.user_id = userinfo.id
      temp.city_code = that.area
      let status = that.status   //1为添加，2为更新
      if (status == 1) {
        console.log(temp, 1);
        userAdderssModel.PostDataByAdd(temp, res => {
          wx.navigateBack({
            delta: 1
          })
        })
      }
      else {
        
        let temp = that.list;
        temp.user_id = userinfo.id
        temp.city_code = that.area
        temp.id = this.data.addres_id
        userAdderssModel.PostDataByAdd(temp, res => {
          wx.navigateBack({
            delta: 1
          })
        })
      }
    }
    
    
    
  },

  //所选地区
  clickProvince(e) {
    console.log(e.target.dataset.area)
    let _this = this
    let data = e.target.dataset.area
    let grade = parseInt(e.target.dataset.area.grade);
    if (grade == 1){
      this.setData({
        province_code: data.name,
        active: data.id,
        stpe: 1,
        province:'选择城市',
        'steps[0].text': data.name,
      })
    } else if (grade== 2){
      this.setData({
        city_code: data.name,
        active: data.id,
        stpe: 2,
        'steps[1].text': data.name,
        province: '选择城区'
      })
    }
    else if (grade == 3) {
      this.setData({
        district_code: data.name,
        active: 1,
        addressShow:false,
        stpe: 0,
        'steps[0].text': '选择省份',
        'steps[1].text': '选择城市',
        'steps[2].text': '选择区域',
        province: '选择省份',
        area: _this.data.province_code + _this.data.city_code + data.name
      })
    }
    this.fetchList()
  },
  fetchList() {
    let id = this.data.active
    cityModel.GetByCitylist(id, res => {
      this.setData({
        areaJson: res.data
      })
    })
  },
  saveData() {
   this.setData({
     addressShow:false
   })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let status = options.status
   
    this.setData({
      status
    })
    let temps = options.details
    if (temps !== undefined ){
      let temps = JSON.parse(options.details)
      this.setData({
        'list.name': temps.name,
        'list.phone': temps.phone,
        'list.address': temps.address,
        area: temps.city_code,
        addres_id: temps.id
      })
    }

    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - 520 - 30
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
    this.fetchList()
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