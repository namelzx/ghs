(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d23775c"],{fae0:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{attrs:{title:"订单跟踪",visible:t.visible,"before-close":t.handleClose,width:"40%"},on:{"update:visible":function(e){t.visible=e}}},[i("el-steps",{attrs:{direction:"vertical",active:6,"finish-status":"success",space:"50px"}},t._l(t.courlist,(function(t){return i("el-step",{key:t.status,attrs:{title:t.status,description:t.time}})})),1)],1)},s=[],a=[{name:"订单已提交，等待付款",time:"2017-04-01 12:00:00 "},{name:"订单付款成功",time:"2017-04-01 12:00:00 "},{name:"在北京市进行下级地点扫描，等待付款",time:"2017-04-01 12:00:00 "},{name:"在分拨中心广东深圳公司进行卸车扫描，等待付款",time:"2017-04-01 12:00:00 "},{name:"在广东深圳公司进行发出扫描",time:"2017-04-01 12:00:00 "},{name:"到达目的地网点广东深圳公司，快件将很快进行派送",time:"2017-04-01 12:00:00 "},{name:"订单已签收，期待再次为您服务",time:"2017-04-01 12:00:00 "}],l={name:"LogisticsDialog",props:{value:Boolean,courlist:{type:Array,default:[]}},data:function(){return{logisticsList:Object.assign({},a)}},computed:{visible:{get:function(){return this.value},set:function(t){this.value=t}}},methods:{emitInput:function(t){this.$emit("input",t)},handleClose:function(){this.emitInput(!1)}}},u=l,o=i("2877"),c=Object(o["a"])(u,n,s,!1,null,null,null);e["default"]=c.exports}}]);