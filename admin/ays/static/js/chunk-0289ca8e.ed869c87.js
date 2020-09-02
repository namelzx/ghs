(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0289ca8e"],{f6a3:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container"},[n("el-card",{staticClass:"operate-container",attrs:{shadow:"never"}},[n("i",{staticClass:"el-icon-tickets"}),e._v(" "),n("span",[e._v("发货列表")])]),e._v(" "),n("div",{staticClass:"table-container"},[n("el-table",{ref:"deliverOrderTable",staticStyle:{width:"100%"},attrs:{data:e.list,border:""}},[n("el-table-column",{attrs:{label:"订单编号",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.out_trade_no))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"收货人",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.buyerName))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"手机号码",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.mobile))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"收货地址",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.addressText))]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"配送方式",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-select",{attrs:{placeholder:"请选择物流公司",size:"small"},model:{value:t.row.deliveryCompany,callback:function(n){e.$set(t.row,"deliveryCompany",n)},expression:"scope.row.deliveryCompany"}},e._l(e.companyOptions,(function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物流单号",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-input",{attrs:{size:"small"},model:{value:t.row.deliverySn,callback:function(n){e.$set(t.row,"deliverySn",n)},expression:"scope.row.deliverySn"}})]}}])})],1),e._v(" "),n("div",{staticStyle:{"margin-top":"15px","text-align":"center"}},[n("el-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确定")])],1)],1)],1)},l=[],r=n("f8b7"),o={name:"DeliverOrderList",data:function(){return{list:[],page:0,companyOptions:[{label:"同城配送",value:"TC"},{label:"顺丰",value:"SFEXPRESS"},{label:"韵达",value:"YUNDA"},{label:"百世快递",value:"HTKY"},{label:"申通",value:"STO"},{label:"中通",value:"ZTO"},{label:"圆通",value:"YTO"},{label:"天天快递",value:"TTKDEX"}]}},created:function(){this.list=this.$route.query.list,this.page=this.$route.query.page,console.log(this.list)},methods:{cancel:function(){this.$router.back()},confirm:function(){var e=this;this.$confirm("是否要进行发货操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){Object(r["g"])(e.list[0]).then((function(t){e.$message({type:"success",message:"发货成功!"}),e.$router.push({path:"/order/index",query:{page:e.page}})}))})).catch((function(){e.$message({type:"info",message:"已取消发货"})}))}}},i=o,u=n("2877"),s=Object(u["a"])(i,a,l,!1,null,null,null);t["default"]=s.exports},f8b7:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return r})),n.d(t,"g",(function(){return o})),n.d(t,"d",(function(){return i})),n.d(t,"c",(function(){return u}));var a=n("b775");function l(e){return Object(a["a"])({url:"/admin/Order/GetDataByList",method:"get",params:e})}function r(e){return Object(a["a"])({url:"/admin/Order/GetIdByDetails",method:"get",params:{id:e}})}function o(e){return Object(a["a"])({url:"/admin/Order/deliveryOrder",method:"post",data:e})}function i(e){return Object(a["a"])({url:"/admin/Order/PostDataByRefund",method:"post",data:e})}function u(e){return Object(a["a"])({url:"/admin/Order/GetQueryBydownload",method:"get",params:e})}}}]);