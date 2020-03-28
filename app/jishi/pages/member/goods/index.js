// pages/member/goods/index.js
let base_url = 'https://ch.10huisp.com';

import Toast from '../../../vant-weapp/dist/toast/toast';

import {
  UserModel
} from '../../../api/user.js'

let usermodel = new UserModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: '',
    canvasHidden: false,
    hbHidden: false,

    tabs_id: 1,
    list:[],
    one:0,
    tow:0,
    avatarUrl:'',
    listQuery: {
      limit: 20,
      page: 1,
      status:1,
      user_id: undefined,
    },
    condition_id: 1,
    cond_show: false,
    com_name: '全部商品',
    con_coupon: 1,
    base_show: false,
    selectAllStatus: false,
  },
  handelBack(){
    wx.switchTab({
      url: '/pages/member/index',
    })

  },
  baocun: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              /* 该隐藏的隐藏 */
              that.setData({
                maskHidden: true,
                hbHidden: false,
              })
            }
          },
          fail: function (res) {
            console.log(11111)
          }
        })
      }
    })
  },
  handelbox(){
    console.log('影城')
    this.setData({
      hbHidden:false
    })

  },
  onTabs(e) {
    console.log(e)
    let _this = this;
    let tabs_id = parseInt(e.target.dataset.id)
    _this.setData({
      tabs_id: tabs_id
    })
    this.data.listQuery.status=tabs_id
    this.data.list=[];
    this.getlist()

   
  },


  createNewImg: function (e) {
   
    var that = this;
    var temp = e.detail
    var userinfo = wx.getStorageSync('userinfo')
    var nickName = userinfo.nickName
    var avatarUrl = this.data.avatarUrl
    console.log(avatarUrl)
    
    
  
    // console.log(temp)
    var context = wx.createCanvasContext('mycanvas');

    var tpath = "../../../imgs/goodsbg2.png";  //详细看onLoad函数注释部分
    context.drawImage(tpath, 0, 0, 350, 570);  //这里
    let path = temp.path//商品图片


    context.drawImage(path, 25, 90, 300, 230); //右 上 最后一个是高度

    var xccode = temp.code
    //不知道是什么原因，手机环境能正常显示
    // context.save(); // 保存当前context的状态

    //分享用户头像
    
    context.drawImage(avatarUrl, 30, 10, 40, 40); //右 上



    //分享用户
    context.setFontSize(14);
    context.setFillStyle('#909399');
    context.setTextAlign('center');
    context.fillText(nickName, 100, 35);
    context.stroke();

    //商品名称
    context.setFontSize(18);
    context.setFillStyle('#000');
    context.setTextAlign('center');
    let name = temp.name.substring(0, 22)
    context.fillText(name, 60, 340);//距离左边宽度，距离顶部高度
    context.setTextAlign('right');
    context.fillText(temp.name.substring(22, 100), 150, 355);
    context.stroke();

    //总价模块
    context.setFontSize(20);
    context.setFillStyle('#D92E2E');
    context.setTextAlign('center');
    context.fillText("¥", 30, 380);
    context.stroke();

    context.setFontSize(30);
    context.setFillStyle('#D92E2E');
    context.setTextAlign('center');
    context.fillText(temp.price, 85, 380);
    context.stroke();
    // 总价模块结束

    
    


    //二维码
    context.drawImage(temp.code, 30, 430, 100, 100); //右 上
    context.stroke();

    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {

          var tempFilePath = res.tempFilePath;
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: true,
            hbHidden: true,
          });
          Toast.clear();
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 200);
  },
  onCondition() {
    this.cond_show = !this.cond_show
  },
  onCondShow(e, name) {
    this.condition_id = e
    this.com_name = name
    this.cond_show = !this.cond_show
  },
  onCoupon() {
    let id = this.con_coupon
    if (id == 1) {
      this.con_coupon = 2
    } else {
      this.con_coupon = 1
    }
  },
  onOption() {
    console.log(this.data.base_show)

    this.setData({
      base_show: !this.data.base_show
    })
  },
  onAccomplish() {
    this.onOption()
  },
  //全选
  selectAll() {
    let selectAllStatus = this.data.selectAllStatus;
    let list = this.data.list
    //开始的状态为未选中，当选中时执行以下代码
    //true---false之间的切换
    selectAllStatus = !selectAllStatus;
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    this.setData({
      list,
      selectAllStatus
    })
  },
  /*删除*/
  deleteList() {
    var _this = this;
    let list = this.data.list;    // 获取购物车列表
    var in_id = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].selected === true) {
        in_id.push(list[i].id);
      }
    }
    if (in_id.length === 0) {
      wx.showToast({
        title: '没有选中商品',
        icon: 'none'
      })
      return true;
    }
    let status = 1;
    if (parseInt(this.data.tabs_id) === 1) {
      status = 2
    }
    var temp = {
      in_id,
      status
    }
    _this.data.list = [];
    usermodel.PostdataByDel(temp, res => {
      _this.getlist()

    })
  },
  //放入仓库
  onEntrepot() {
    var _this=this;
    let list = this.data.list;    // 获取购物车列表
    var in_id=[];
    for(let i=0;i<list.length;i++){
      if (list[i].selected===true){
        in_id.push(list[i].id);
      }
    }
    if (in_id.length===0){
      wx.showToast({
        title: '没有选中商品',
        icon:'none'
      })
      return true;
    }
    let status=1;
    if (parseInt(this.data.tabs_id)===1){
      status=2
    }
    var temp={
      in_id,
      status
    }
    _this.data.list=[];
    usermodel.PostdataByStatus(temp,res=>{
      _this.getlist()
      console.log(_this.data.list)

    })
  },
  inselect(e) {
    var _this=this;
    _this.setData({
      selectAllStatus: e.detail
    })

  },
  inlist(e) {
    this.data.list = e.detail
  },
  toAdd() {
    wx.navigateTo({
      url: '/pages/product/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商家中心-商品管理',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that=this;
    let userinfo = wx.getStorageSync('userinfo')
    this.data.user_id = userinfo.id

    var nickName = userinfo.nickName
    var avatarUrl = userinfo.avatarUrl

    wx.getImageInfo({
      src: avatarUrl,
      success: function (res) {
        that.setData({
          avatarUrl: res.path
        })
      }
     
    })
    console.log(that.data.avatarUrl)
    this.getlist();
  },

  getlist() {
    var _this=this;
    this.data.listQuery.user_id = this.data.user_id
    console.log(this.data)
    usermodel.GetUserGoodsByList(this.data.listQuery, res => {
      console.log(res)
      let data = res.data.data.data
   
      for(let i=0;i<data.length;i++){
        data[i].selected=false
      }
      _this.setData({
        list: data,
        one:res.data.one,
        tow:res.data.tow
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})