Page({
  data: {
    showhaibao:false,//隐藏显示
    maskHidden: true,//隐藏显示
  },
  onLoad: function (options) {
    // 此处获取设备的宽高。canvas绘制的图片以次宽高为准
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          windowW: res.windowWidth,
          windowH: res.screenHeight,

        })
      },
    })
  },
  onReady: function () {
    // 页面渲染完成
    this.createNewImg();
    //创建初始化图片
  },


  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var _this = this;
    var context = wx.createCanvasContext("mycanvas");
    var path = "../../imgs/goodsbg.png";  //详细看onLoad函数注释部分
    context.drawImage(path, 0, 0, this.data.windowW, this.data.windowH);  //这里是商品图片
    context.draw(_this.getImg())

  },
  //将生成好的图片保存到本地  下面这句注释是文档中的原话。
  // tip: 在 draw 回调里调用canvasToTempFilePath方法才能保证图片导出成功。
  getImg() {
    var _this = this;
    wx.canvasToTempFilePath({
      canvasId: 'mycanvas',
      success: function success(res) {
        _this.setData({
          imagePath: res.tempFilePath,
        });
      }
    });
  },
  //点击图片进行预览，长按保存分享图片
  previewImg: function (e) {
    var img = this.data.imagePath
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  gotoSubmit: function (e) {
    var _this = this
    this.setData({
      maskHidden: false,
      showhaibao: true
    })
    wx.showToast({
      title: '图片生成中...',
      icon: 'loading',
      duration: 2000
    });
    setTimeout(function () {
      wx.hideToast()
      _this.createNewImg();
    }, 2000)

  }

})