// components/shopgoods/index.js
let base_url = 'https://ch.10huisp.com/';
import Toast from '../../vant-weapp/dist/toast/toast';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:Array,
    base_show:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    imagePath:'',
    hbHidden:false,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    mainPrice(price, discountPrice) {
      if (!discountPrice) {
        //如果折扣价不存在
        return price
      } else {
        return discountPrice
      }
    },
    slashedPrice(price, discountPrice) {
      if (discountPrice) {
        //如果折扣价存在
        return price
      } else {
        return
      }
    },
    handelTourl(e){
      var that=this;

      Toast.loading({
        mask: true,
        message: '生成中...',
        duration: 100000000000
      });
      let item = e.currentTarget.dataset.item
      wx.getImageInfo({
        src: item.images_url,
        success: function (res) {
          item.path = res.path


          wx.getImageInfo({
            src: base_url + item.code,
            success: function (res) {
              item.code = res.path

              that.triggerEvent('handelhaibai', item)
            }
          })
        }
      })


     
     
     
    },

    /**
       * 当前商品选中事件
       */
    handleselectList(e) {
      // //获取当前的下标
      const index = e.currentTarget.dataset.index;
      // //获取是否选中状态
      const selected = this.data.list[index].selected;
      // //默认全选的复选框是选中的
      // this.selectAllStatus = true;
      let selectAllStatus = false;
      // //true --- false之间的切换
      this.data.list[index].selected = !selected;
      let llength=0;
      var data = this.data.list
      for (let i = 0; i < data.length;i++){
        if (data[i].selected===true){
          llength++
        }
      }
      
      if (data.length === llength+1){
        selectAllStatus = true
      }
      this.triggerEvent('inselect', selectAllStatus);
      this.triggerEvent('inlist', this.data.list);

    },

    //编辑商品
     headEdit(e) {
       const id = e.currentTarget.dataset.id;
       console.log(id,"id")
       wx.navigateTo({
         url: '/pages/product/index?id='+ id,
       })
     }
  }
  
})
