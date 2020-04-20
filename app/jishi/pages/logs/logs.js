var app = getApp();
Page({
  
  canvasIdErrorCallback: function (e) {
    console.error(e.detail.errMsg)
  },
  
  creimg: function () {
    var that = this
    wx.showLoading({
      title: '生成中',
    })
    //设个定时器防止异步的问题
    setTimeout(function () {
      //初始化画布背景宽高及内容宽高变量
      var avatarUrl = that.data.avatarUrl
      var myCanvasWidth
      var myCanvasHeight
      var myCanvasWidth1
      var myCanvasHeight1
      //获取手机屏幕尺寸并给画布宽高赋值
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          // myCanvasWidth = res.windowWidth - 56
          // myCanvasHeight = res.windowHeight - 100
          myCanvasWidth = res.windowWidth
          myCanvasHeight = res.windowHeight
          myCanvasWidth1 = res.windowWidth
          myCanvasHeight1 = res.windowHeight
        },
      })
      console.log(myCanvasWidth, myCanvasHeight)
      console.log("宽：" + parseInt(myCanvasWidth / 5), "高:" + parseInt(myCanvasHeight / 7.88))
      // var avatarurl_width = parseInt (myCanvasWidth / 5);    //绘制的头像宽度
      //将方形图片处理成圆形头像
      var avatarurl_heigth = parseInt(myCanvasHeight / 7);   //绘制的头像高度
      var avatarurl_width = avatarurl_heigth
      var avatarurl_x = myCanvasWidth - (myCanvasWidth-20);   //绘制的头像在画布上的位置
      var avatarurl_y = myCanvasHeight - myCanvasHeight * 0.16  //绘制的头像在画布上的位置
      that.setData({
        canvasWidth: myCanvasWidth,
        canvasHeight: myCanvasHeight,
        canvasWidth1: myCanvasWidth1,
        canvasHeight1: myCanvasHeight1
      })
      //初始化画布
      var context1 = wx.createCanvasContext('firstsCanvas')
      context1.rect(0, 0, myCanvasWidth, myCanvasHeight)
      context1.setFillStyle('#FFFFFF')
      context1.fill()
      context1.draw()
      // 使用 wx.createContext 获取绘图上下文 context
      var context = wx.createCanvasContext('firstCanvas')
      context.setFillStyle('#FFFFFF')
      
      context.fillRect(0, 0, myCanvasWidth, myCanvasHeight)

      context.drawImage('../../imgs/bg.png', 0, 0, myCanvasWidth, myCanvasHeight)
      context.fill()
      context.drawImage(that.data.images_url, 0, 0, myCanvasWidth , myCanvasHeight/1.8 )
      context.fill()


      // context.drawImage('../../imgs/btm.png', 0, myCanvasHeight - 70, myCanvasWidth * 2, myCanvasHeight); 
      // context.rect(0, 0, myCanvasWidth, myCanvasHeight)

      context.save();
      context.beginPath(); //开始绘制
      //先画个圆   前两个参数确定了圆心 （x,y） 坐标  第三个参数是圆的半径  四参数是绘图方向  默认是false，即顺时针
      context.arc(avatarurl_width / 3 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 3, 0, Math.PI * 2, false);
      context.clip();//画好了圆 剪切  原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内 这也是我们要save上下文的原因


      console.log(avatarurl_x, avatarurl_y)
      context.drawImage(that.data.avatarUrl, avatarurl_x, avatarurl_y, avatarurl_width/1, avatarurl_heigth); 
      context.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
      context.setFontSize(14)
      context.setTextAlign('left')
      context.setFillStyle('red')
      context.setFontSize(20)

    //价格模块
      let price = that.data.goods.price + '/元';
      let txtWidth = context.measureText(price).width;
      context.setFontSize(14)

      context.fillText(price, myCanvasWidth - (myCanvasWidth - 30), myCanvasHeight / 1.8+30)
      context.setTextAlign('left')
      context.setFillStyle('#000000')
      context.setFontSize(17)

      context.fillText(that.data.goods.name, myCanvasWidth - (myCanvasWidth-30), myCanvasHeight / 1.8 + 55)
      context.setFillStyle('#303133')
      context.setTextAlign('left')
      context.setFontSize(12)
  
      context.setFillStyle('#333333')
      context.setFontSize(14)
      context.fillText(that.data.userinfo.nickName + "正在分享商品", myCanvasWidth - (myCanvasWidth * 0.75), myCanvasHeight - (myCanvasHeight * 0.1))
      context.setFillStyle('#999999')
      context.setFontSize(12)
      context.fillText("(长按识别,了解详情)", myCanvasWidth - (myCanvasWidth - (myCanvasWidth*0.25)), myCanvasHeight - (myCanvasHeight*0.07))

    
      context.drawImage(that.data.code, myCanvasWidth - 100, myCanvasHeight - (myCanvasHeight*0.13), myCanvasWidth / 6, myCanvasWidth/6); 
      context.draw()

      //定时器作用同上
      setTimeout(function () {
        wx.hideLoading();
        that.setData({
          finishh: true
        })
        //将canvas转换成图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'firstCanvas',
          success: function (res) {
            console.log(res)
            var tempArr = []
            tempArr.push(res.tempFilePath)
            that.setData({
              tempFile: tempArr
            })
          },
          fail: function (res) {
          }
        })
      }, 1000)
    }, 5000)



  },
  data: {
    code:'',
    tempFile: [],
    finishh: false,
    goods:{},
    avatarUrl:'',
    userinfo:{},
    images_url: '',
  },
  onShow() {
    var that=this;
    let goods = wx.getStorageSync('good');
    let userinfo = wx.getStorageSync('userinfo');
    wx.getImageInfo({
      src: goods.images_url,
      success: function (res) {
        console.log(1,3)
        that.setData({
          images_url:res.path,
          goods
        })
        that.creimg();
      }
    })

    wx.getImageInfo({
      src: 'https://ch.10huisp.com'+goods.code,
      success: function (res) {
        console.log(1, 3)
        that.setData({
          code: res.path,
          
        })
      }
    })

    wx.getImageInfo({
      src: userinfo.avatarUrl,
      success: function (res) {
        console.log(1, 3)
        that.setData({
          avatarUrl: res.path,
          userinfo
        })
      }
    })
  },
  preview: function () {
    wx.previewImage({
      urls: this.data.tempFile,
    })
  },
})
