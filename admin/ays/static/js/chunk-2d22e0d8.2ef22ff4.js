(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22e0d8"],{f9b1:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-dropdown",{attrs:{"show-timeout":100,trigger:"click"}},[n("el-button",{attrs:{plain:""}},[e._v("\n    "+e._s(e.comment_disabled?"Comment: closed":"Comment: opened")+"\n    "),n("i",{staticClass:"el-icon-caret-bottom el-icon--right"})]),e._v(" "),n("el-dropdown-menu",{staticClass:"no-padding",attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",[n("el-radio-group",{staticStyle:{padding:"10px"},model:{value:e.comment_disabled,callback:function(t){e.comment_disabled=t},expression:"comment_disabled"}},[n("el-radio",{attrs:{label:!0}},[e._v("\n          Close comment\n        ")]),e._v(" "),n("el-radio",{attrs:{label:!1}},[e._v("\n          Open comment\n        ")])],1)],1)],1)],1)},l=[],a={props:{value:{type:Boolean,default:!1}},computed:{comment_disabled:{get:function(){return this.value},set:function(e){this.$emit("input",e)}}}},d=a,s=n("2877"),i=Object(s["a"])(d,o,l,!1,null,null,null);t["default"]=i.exports}}]);