// components/header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    city:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toCity(){
        wx.navigateTo({
          url: '/pages/location/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
    },

  }
})
