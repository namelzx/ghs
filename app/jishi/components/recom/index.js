// components/recom/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recom: {
      type: Array,
      default: []
    }
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
    clickToRecom(e) {
      let {
        id
      } = e.currentTarget.dataset
      console.log(id)
      wx.navigateTo({
        url: '/pages/details/index?id='+id,
      })
    }
  }
})