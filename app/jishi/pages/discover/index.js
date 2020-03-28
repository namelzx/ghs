// pages/discover/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['精选', '话题'],
    curIndex: 0,
    topic: [
      // {
      //   id: 1,
      //   name: '#杯子好看，喝水都甜#',
      //   desc: '天气逐渐转凉，大家一定要多喝热水，赶紧给自己入手一个好看的杯子吧！',
      //   num: '10',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '7892'
      // },
      // {
      //   id: 2,
      //   name: '#中年秃头少女自救指南#',
      //   desc: '比90后已经买入30大关更可怕的是，中年90后少女已经开始脱发了！',
      //   num: '9',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '4300'
      // },
      // {
      //   id: 3,
      //   name: '#日日煮至于你的胃部空虚症！#',
      //   desc: '冬天来啦，美少女们终于可以换上暖暖萌萌的厚衣服，把肉肉都藏起来啦！也就意味着，少女们的胃部空虚症有救啦！日日煮的所有小零食奉上！',
      //   num: '13',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '4325'
      // },
      // {
      //   id: 4,
      //   name: '#这个冬天就要暖暖哒，过冬好物推荐#',
      //   desc: '天气渐渐转凉了，寒风无情该如何保暖呢？今天给大家推荐这些好物绝对让整个冬天都暖洋洋的！',
      //   num: '15',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '6879'
      // },
      // {
      //   id: 5,
      //   name: '#一生比住的民宿，这张卡都给你包了！#',
      //   desc: '忙碌而快节奏的生活，神经都是紧绷的，可当真正的假期来临，有整日握着手机。人啊，都是很挑剔的。想逃离都市，又依赖都市，找个不远不近的民宿度假当然是个不错的选择～',
      //   num: '10',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '4128'
      // },
      // {
      //   id: 6,
      //   name: '#双11来袭，券后第二件半价，抢选购！#',
      //   desc: '双11优惠来袭！以下这些好货券后第二件搬家！多买多省，第二件最低价至5.5元，荃湾不要错过噢！',
      //   num: '16',
      //   imgUrl: '../../static/img/topic.png',
      //   view: '6049'
      // }
    ],
    fitList: [
      // {
      //   id: 1,
      //   title: '睡觉也要瘦，全靠关晓彤同款ISDG夜间酵素',
      //   imgUrl: '../../static/img/fit1.jpg',
      //   topic: '#90后养生之道#',
      //   view: '3505',
      //   like: 47
      // },
      // {
      //   id: 2,
      //   title: '稳坐C位的纸巾：洁柔粉face系列',
      //   imgUrl: '../../static/img/fit2.jpg',
      //   topic: '',
      //   view: '2614',
      //   like: 26
      // },
      // {
      //   id: 3,
      //   title: '超温柔双眸养成记，眼霜和他一样重要！',
      //   imgUrl: '../../static/img/fit3.jpg',
      //   topic: '双11来袭，券后第二件半价！',
      //   view: '2169',
      //   like: 42
      // },
      // {
      //   id: 4,
      //   title: '珀莱雅黑海盐泡泡SPA面膜',
      //   imgUrl: '../../static/img/fit4.jpg',
      //   topic: '',
      //   view: '3505',
      //   like: 43
      // },
      // {
      //   id: 5,
      //   title: '时髦不臃肿，这件羊羔毛外套十级推荐',
      //   imgUrl: '../../static/img/fit5.jpg',
      //   topic: '双11来袭，券后第二件半价！',
      //   view: '9681',
      //   like: 35
      // },
      // {
      //   id: 6,
      //   title: '超级中草这款维E胶囊哦，超有用～',
      //   imgUrl: '../../static/img/fit6.jpg',
      //   topic: '90后养生之道',
      //   view: '5335',
      //   like:'1.6w'
      // },
      
    ]
  },

  clickTabs(e) {
    let {
      index
    } = e.currentTarget.dataset
    this.setData({
      curIndex: index
    })
  },

  clickToTopic(e) {
    let {
      id
    } = e.currentTarget.dataset
    console.log(id)
  },
  clickToFit (e) {
    let {
      id
    } = e.currentTarget.dataset
    console.log(id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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