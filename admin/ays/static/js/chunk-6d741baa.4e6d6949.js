(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d741baa"],{"7cdf":function(t,e,n){var r=n("5ca1");r(r.S,"Number",{isInteger:n("9c12")})},"7f14":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",{staticClass:"form-container",attrs:{shadow:"never"}},[n("el-form",{ref:"orderSettingForm",attrs:{model:t.orderSetting,rules:t.rules,"label-width":"150px"}},[n("el-form-item",{attrs:{label:"平台手续费："}},[n("el-input",{staticClass:"input-width",model:{value:t.orderSetting.poundage,callback:function(e){t.$set(t.orderSetting,"poundage",e)},expression:"orderSetting.poundage"}},[n("template",{slot:"append"},[t._v("%")])],2),t._v(" "),n("span",{staticClass:"note-margin"},[t._v("商家商品签收扣除,订单总价百分比")])],1),t._v(" "),n("el-form-item",{attrs:{label:"正常订单超过："}},[n("el-input",{staticClass:"input-width",model:{value:t.orderSetting.normalOrderOvertime,callback:function(e){t.$set(t.orderSetting,"normalOrderOvertime",e)},expression:"orderSetting.normalOrderOvertime"}},[n("template",{slot:"append"},[t._v("分")])],2),t._v(" "),n("span",{staticClass:"note-margin"},[t._v("未付款，订单自动关闭")])],1),t._v(" "),n("el-form-item",{attrs:{label:"发货超过："}},[n("el-input",{staticClass:"input-width",model:{value:t.orderSetting.confirmOvertime,callback:function(e){t.$set(t.orderSetting,"confirmOvertime",e)},expression:"orderSetting.confirmOvertime"}},[n("template",{slot:"append"},[t._v("天")])],2),t._v(" "),n("span",{staticClass:"note-margin"},[t._v("未收货，订单自动完成")])],1),t._v(" "),n("el-form-item",{attrs:{label:"测试支付模块"}},[n("el-switch",{model:{value:t.orderSetting.pay,callback:function(e){t.$set(t.orderSetting,"pay",e)},expression:"orderSetting.pay"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"订单完成超过：",prop:"commentOvertime"}},[n("el-input",{staticClass:"input-width",model:{value:t.orderSetting.commentOvertime,callback:function(e){t.$set(t.orderSetting,"commentOvertime",e)},expression:"orderSetting.commentOvertime"}},[n("template",{slot:"append"},[t._v("天")])],2),t._v(" "),n("span",{staticClass:"note-margin"},[t._v("自动五星好评")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.confirm("orderSettingForm")}}},[t._v("提交")])],1)],1)],1)},i=[],a=(n("c5f6"),n("7cdf"),n("b775"));function o(){return Object(a["a"])({url:"/admin/Config/GetConfigByInfo",method:"get"})}function s(t){return Object(a["a"])({url:"/admin/Config/PostDataByUpdate",method:"post",data:t})}var l={id:null,poundage:0,normalOrderOvertime:0,confirmOvertime:0,finishOvertime:0,commentOvertime:0},c={name:"orderSetting",data:function(){return{orderSetting:Object.assign({},l),rules:{}}},created:function(){this.getDetail()},methods:{confirm:function(t){var e=this;this.$refs[t].validate((function(t){if(!t)return e.$message({message:"提交参数不合法",type:"warning"}),!1;e.$confirm("是否要提交修改?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){s(e.orderSetting).then((function(t){e.$message({type:"success",message:"提交成功!",duration:1e3})}))}))}))},getDetail:function(){var t=this;o().then((function(e){t.orderSetting=e.data,1===t.orderSetting.pay?t.orderSetting.pay=!0:t.orderSetting.pay=!1}))}}},m=c,d=(n("cf28"),n("2877")),u=Object(d["a"])(m,r,i,!1,null,"359bd8c6",null);e["default"]=u.exports},"7ff6":function(t,e,n){},"9c12":function(t,e,n){var r=n("d3f4"),i=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&i(t)===t}},cf28:function(t,e,n){"use strict";var r=n("7ff6"),i=n.n(r);i.a}}]);