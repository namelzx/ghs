module.exports = {
  data: {
    way_status:1, //1自提,2物流
    products: [
      {
        id: 11,
        name: "ddd",
        num: 1,
        price: 56
      },
      {
        id: 11,
        name: "ddd",
        num: 2,
        price: 56
      }
    ],

    productsRecom: [],
    qiniuDomain: "https://static.newkr.net/",
    buyerName: "",
    buyerPhone: "",
    buyerText: "",
    addressText:"",
    selectPackageItem: ""
  },
  state: {
    
    is_store:2,//是否允许自提
    switchHeight: false, //订单列表点击高度切换
    needOpenSettingBtn: false,
    totalPrice: 0,
    choosePackageStatus: false,
    emptyIcon: "/imgs/icon-empty-package.png",
    emptyTips: "您还没有可用红包哦~"
  },
  others: {
    pageUrl: "purchasePage"
  }
}