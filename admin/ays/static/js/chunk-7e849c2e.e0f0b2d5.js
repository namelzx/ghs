(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e849c2e"],{"09f4":function(t,e,i){"use strict";i.d(e,"a",(function(){return l})),Math.easeInOutQuad=function(t,e,i,n){return t/=n/2,t<1?i/2*t*t+e:(t--,-i/2*(t*(t-2)-1)+e)};var n=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function a(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function o(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,i){var l=o(),s=t-l,r=20,c=0;e="undefined"===typeof e?500:e;var u=function t(){c+=r;var o=Math.easeInOutQuad(c,l,s,e);a(o),c<e?n(t):i&&"function"===typeof i&&i()};u()}},4227:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[t.showSearch?i("div",{staticClass:"filter-container"},[i("el-form",{staticClass:"form-inline",attrs:{inline:!0,model:t.listQuery}},[i("el-form-item",{attrs:{label:""}},[i("el-input",{attrs:{placeholder:"名称",clearable:"",size:"small"},model:{value:t.listQuery.title,callback:function(e){t.$set(t.listQuery,"title",e)},expression:"listQuery.title"}})],1),t._v(" "),i("el-form-item",[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.handleFilter}},[t._v("搜索")])],1)],1)],1):t._e(),t._v(" "),i("el-row",{staticStyle:{"margin-bottom":"10px"}},[i("el-col",{attrs:{xs:24,sm:24,lg:24}},[i("el-tooltip",{attrs:{content:"添加",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"success",icon:"el-icon-plus",circle:""},on:{click:t.handleCreate}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"搜索",placement:"top"}},[i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search",circle:""},on:{click:function(e){t.showSearch=!t.showSearch}}})],1)],1)],1),t._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],key:t.tableKey,staticStyle:{width:"100%"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{label:"城市名称",fixed:"left","min-width":"150px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"级别",width:"110px",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(e.row.grade))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",fixed:"right",align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.handleUpdate(e.row)}}},[t._v("\n          修改\n        ")]),t._v(" "),i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.handleModifyStatus(e.row,"deleted")}}},[t._v("\n          删除\n        ")])]}}])})],1),t._v(" "),i("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}}),t._v(" "),i("el-dialog",{attrs:{title:t.textMap[t.dialogStatus],visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[i("el-form",{ref:"dataForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:t.rules,model:t.temp,"label-position":"left","label-width":"120px"}},[i("el-form-item",{attrs:{label:"城市名称"}},[i("el-input",{model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}})],1)],1),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("\n        取消\n      ")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(e){"create"===t.dialogStatus?t.createData():t.updateData()}}},[t._v("\n        确定\n      ")])],1)],1),t._v(" "),i("el-dialog",{attrs:{visible:t.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(e){t.dialogPvVisible=e}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.pvData,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{prop:"key",label:"Channel"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),t._v(" "),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogPvVisible=!1}}},[t._v("Confirm")])],1)],1)],1)},a=[],o=(i("ac4d"),i("8a81"),i("ac6a"),i("c591")),l=i("6724"),s=(i("ed08"),i("333d")),r=i("5b4d"),c={name:"ComplexTable",components:{Pagination:s["a"],Upload:r["a"]},directives:{waves:l["a"]},filters:{statusFilter:function(t){var e={1:"启用",2:"禁用",deleted:"danger"};return e[t]},typeFilter:function(t){return calendarTypeKeyValue[t]}},data:function(){return{showSearch:!1,tableKey:0,list:[],total:0,listLoading:!0,listQuery:{page:1,limit:20,importance:void 0,title:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],statusOptions:["published","draft","deleted"],showReviewer:!1,temp:{id:void 0,name:""},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"Edit",create:"Create"},StatusMap:[{index:2,name:"禁用"},{index:1,name:"启用"}],HomeMap:[{index:2,name:"不展示"},{index:1,name:"展示"}],dialogPvVisible:!1,pvData:[],rules:{name:[{required:!0,message:"名称必须输入",trigger:"blur"}]},downloadLoading:!1}},created:function(){this.getList()},methods:{handelIco:function(t){console.log(t),this.temp.ico=t},getList:function(){var t=this;this.listLoading=!0,Object(o["b"])(this.listQuery).then((function(e){t.list=e.data.data,console.log(t.list),t.total=e.data.total,setTimeout((function(){t.listLoading=!1}),1500)}))},handleFilter:function(){this.listQuery.page=1,this.getList()},handleModifyStatus:function(t,e){var i=this;Object(o["c"])(t.id).then((function(e){var n=i.list.indexOf(t);i.list.splice(n,1),i.$message({type:"success",message:e.msg})}))},handleCreate:function(){var t=this;this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},createData:function(){var t=this;this.$refs["dataForm"].validate((function(e){e&&Object(o["d"])(t.temp).then((function(e){t.list.unshift(e.data),t.dialogFormVisible=!1,t.$notify({title:"Success",message:"Created Successfully",type:"success",duration:2e3})}))}))},handleUpdate:function(t){var e=this;this.temp=t,this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},updateData:function(){var t=this;this.$refs["dataForm"].validate((function(e){if(e){var i=Object.assign({},t.temp);Object(o["d"])(i).then((function(){var e=!0,i=!1,n=void 0;try{for(var a,o=t.list[Symbol.iterator]();!(e=(a=o.next()).done);e=!0){var l=a.value;if(l.id===t.temp.id){var s=t.list.indexOf(l);t.list.splice(s,1,t.temp);break}}}catch(r){i=!0,n=r}finally{try{e||null==o.return||o.return()}finally{if(i)throw n}}t.dialogFormVisible=!1,t.$notify({title:"Success",message:"Update Successfully",type:"success",duration:2e3})}))}}))},handleDelete:function(t){this.$notify({title:"Success",message:"Delete Successfully",type:"success",duration:2e3});var e=this.list.indexOf(t);this.list.splice(e,1)},handleFetchPv:function(t){var e=this;fetchPv(t).then((function(t){e.pvData=t.data.pvData,e.dialogPvVisible=!0}))}}},u=c,d=i("2877"),m=Object(d["a"])(u,n,a,!1,null,null,null);e["default"]=m.exports},6724:function(t,e,i){"use strict";i("8d41");var n="@@wavesContext";function a(t,e){function i(i){var n=Object.assign({},e.value),a=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),o=a.ele;if(o){o.style.position="relative",o.style.overflow="hidden";var l=o.getBoundingClientRect(),s=o.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(l.width,l.height)+"px",o.appendChild(s)),a.type){case"center":s.style.top=l.height/2-s.offsetHeight/2+"px",s.style.left=l.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(i.pageY-l.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(i.pageX-l.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=a.color,s.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=i:t[n]={removeHandle:i},i}var o={bind:function(t,e){t.addEventListener("click",a(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",a(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},l=function(t){t.directive("waves",o)};window.Vue&&(window.waves=o,Vue.use(l)),o.install=l;e["a"]=o},"88e7":function(t,e,i){"use strict";i("7f7f"),i("3b2b"),i("a481");var n={dateFormat:function(t,e){var i={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds(),"q+":Math.floor((t.getMonth()+3)/3),"S+":t.getMilliseconds()};for(var n in/(y+)/i.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length))),i)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1===RegExp.$1.length?i[n]:("00"+i[n]).substr((""+i[n]).length)));return e}},a=i("9b15");e["a"]={randomString:function(t){for(var e=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],i="",n=0;n<t;n++){var a=Math.ceil(35*Math.random());i+=e[a]}return i},createOssClient:function(){return new Promise((function(t,e){var i=new a({region:"oss-cn-beijing",accessKeyId:"LTAI4G7m7lF5SkXU",accessKeySecret:"PbcsuZTY2CMVPjr1K2DGzMejeotVTI",bucket:"kedand"});t(i)}))},ossUploadFile:function(t){var e=t.file,i=this;return new Promise((function(a,o){var l=n.dateFormat(new Date,"yyyyMMdd"),s=n.dateFormat(new Date,"yyyyMMddhhmmss"),r=i.randomString(4),c=e.name.substr(e.name.indexOf(".")),u="video/"+l+"/"+s+"_"+r+c;i.createOssClient().then((function(i){i.multipartUpload(u,e,{progress:function(e){var i={};i.percent=Math.floor(100*e),t.onProgress(i)}}).then((function(i){if(a({name:e.name,url:i.name}),200===i.res.statusCode)return t.onSuccess(i),i;t.onError("上传失败")}),(function(e){t.onError("上传失败"),o(e)}))}))}))}}},"8d41":function(t,e,i){},c591:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return l})),i.d(e,"d",(function(){return s}));var n=i("b775");function a(t){return Object(n["a"])({url:"admin/city/GetDataByList",method:"get",params:t})}function o(t){return Object(n["a"])({url:"admin/city/GetIdByDel",method:"get",params:{id:t}})}function l(t){return Object(n["a"])({url:"tools/Citytools/City",method:"get",params:{pid:t}})}function s(t){return Object(n["a"])({url:"admin/city/PostDataBySave",method:"post",data:t})}}}]);