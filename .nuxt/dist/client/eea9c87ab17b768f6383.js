(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{312:function(e,t,r){"use strict";r(55);var o,n,l,c,d,m,f,v,h,_,j,k,D=r(5),y=r(41),w=r.n(y),x={post:(o=Object(D.a)(regeneratorRuntime.mark((function e(t,data){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("axios node_env:","production"),r="http://mall.admin.jianpiane.com",console.log("axios domain:",r),t=r+t,console.log("axios url: ",t),e.next=7,w.a.post(t,data);case 7:return o=e.sent,console.log("axios status: ",o.status),e.abrupt("return",o.data);case 10:case"end":return e.stop()}}),e)}))),function(e,t){return o.apply(this,arguments)})};t.a={getOrderList:(k=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/mall/order/list",data);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(e){return k.apply(this,arguments)}),cancelOrder:(j=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/mall/order/cancel",data);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(e){return j.apply(this,arguments)}),paymentCreate:(_=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/mall/payment/create",data);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(e){return _.apply(this,arguments)}),paymentComplete:(h=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/mall/payment/complete",data);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(e){return h.apply(this,arguments)}),getPaymentList:(v=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.post("/api/mall/payment/list",data);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)}))),function(e){return v.apply(this,arguments)}),getGoodsList:(f=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data.business_id=0,e.next=3,x.post("/api/mall/goods/list",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(e){return f.apply(this,arguments)}),goodsDataCreate:(m=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data.business_id=0,e.next=3,x.post("/api/mall/goods/create",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(e){return m.apply(this,arguments)}),goodsDataUpdate:(d=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data.business_id=0,e.next=3,x.post("/api/mall/goods/update",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(e){return d.apply(this,arguments)}),categoryDataUpdate:(c=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data.business_id=0,e.next=3,x.post("/api/mall/goods/categoryUpdate",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(e){return c.apply(this,arguments)}),getGoodsCategoryList:(l=Object(D.a)(regeneratorRuntime.mark((function e(data){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data.business_id=0,e.next=3,x.post("/api/mall/goods/categorys",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(e){return l.apply(this,arguments)}),statisticsTodayData:(n=Object(D.a)(regeneratorRuntime.mark((function e(){var data,t,r=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return data=r.length>0&&void 0!==r[0]?r[0]:{},e.next=3,x.post("/api/mall/statistics/today",data);case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)}))),function(){return n.apply(this,arguments)})}},440:function(e,t,r){"use strict";r(122),r(123),r(15);var o=r(311),n=r.n(o);t.a={formValidata:function(e){return new Promise((function(t,r){e.validate((function(e){t(!!e)}))}))},unLimitTreeLevel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=[],o=0,n=function e(t,o,n){for(var i=0;i<t.length;i++){var l=t[i];if(l.pid==o){l.level=n,l.html="";for(var c=0;c<n;c++)l.html+=" -- ";r.push(l),e(t,l.id,n+1)}}};return n(e,t,o),r},getTimestamp:function(e){var t=new Date(e);return parseInt(t.getTime()/1e3)},dateFormat:function(e,t){t=t||"YYYY-MM-DD HH:mm";var r=null;return r=e?new Date(1e3*e):new Date,n()(r).format(t)},dateDisplay:function(e){var t=parseInt(Date.now()/1e3)-e;if(t<60)return t+"秒前";if(t>=60&&t<3600)return parseInt(t/60).toString()+"分钟前";if(t>=3600&&t<86400)return parseInt(t/3600).toString()+"小时前";if(t>=86400&&t<2592e3)return parseInt(t/3600/24).toString()+"天前";var r=new Date(1e3*e);return n()(r).format("YYYY-MM-DD HH:mm")},monthPlus:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=[31,28,31,30,31,30,31,31,30,31,30,31],n=parseInt(this.dateFormat(e,"YYYY")),l=parseInt(this.dateFormat(e,"MM")),c=parseInt(this.dateFormat(e,"DD"));o[1]=n%4==0&&n/100!=0||n%100==0&&n%400==0?29:28;var d=0,m=o[l-1]-c;d+=m;for(var i=0;i<t;i++){(l+=1)>12&&(l=1,n+=1),o[1]=n%4==0&&n/100!=0||n%100==0&&n%400==0?29:28;var f=o[l-1];i==t-1&&(f=f-c<0?f:c),console.log("for days:",f),d+=f}return r?(e=e||parseInt(Date.now()/1e3))+24*d*3600:d}}},441:function(e,t,r){var map={"./af":313,"./af.js":313,"./ar":314,"./ar-dz":315,"./ar-dz.js":315,"./ar-kw":316,"./ar-kw.js":316,"./ar-ly":317,"./ar-ly.js":317,"./ar-ma":318,"./ar-ma.js":318,"./ar-sa":319,"./ar-sa.js":319,"./ar-tn":320,"./ar-tn.js":320,"./ar.js":314,"./az":321,"./az.js":321,"./be":322,"./be.js":322,"./bg":323,"./bg.js":323,"./bm":324,"./bm.js":324,"./bn":325,"./bn.js":325,"./bo":326,"./bo.js":326,"./br":327,"./br.js":327,"./bs":328,"./bs.js":328,"./ca":329,"./ca.js":329,"./cs":330,"./cs.js":330,"./cv":331,"./cv.js":331,"./cy":332,"./cy.js":332,"./da":333,"./da.js":333,"./de":334,"./de-at":335,"./de-at.js":335,"./de-ch":336,"./de-ch.js":336,"./de.js":334,"./dv":337,"./dv.js":337,"./el":338,"./el.js":338,"./en-SG":339,"./en-SG.js":339,"./en-au":340,"./en-au.js":340,"./en-ca":341,"./en-ca.js":341,"./en-gb":342,"./en-gb.js":342,"./en-ie":343,"./en-ie.js":343,"./en-il":344,"./en-il.js":344,"./en-nz":345,"./en-nz.js":345,"./eo":346,"./eo.js":346,"./es":347,"./es-do":348,"./es-do.js":348,"./es-us":349,"./es-us.js":349,"./es.js":347,"./et":350,"./et.js":350,"./eu":351,"./eu.js":351,"./fa":352,"./fa.js":352,"./fi":353,"./fi.js":353,"./fo":354,"./fo.js":354,"./fr":355,"./fr-ca":356,"./fr-ca.js":356,"./fr-ch":357,"./fr-ch.js":357,"./fr.js":355,"./fy":358,"./fy.js":358,"./ga":359,"./ga.js":359,"./gd":360,"./gd.js":360,"./gl":361,"./gl.js":361,"./gom-latn":362,"./gom-latn.js":362,"./gu":363,"./gu.js":363,"./he":364,"./he.js":364,"./hi":365,"./hi.js":365,"./hr":366,"./hr.js":366,"./hu":367,"./hu.js":367,"./hy-am":368,"./hy-am.js":368,"./id":369,"./id.js":369,"./is":370,"./is.js":370,"./it":371,"./it-ch":372,"./it-ch.js":372,"./it.js":371,"./ja":373,"./ja.js":373,"./jv":374,"./jv.js":374,"./ka":375,"./ka.js":375,"./kk":376,"./kk.js":376,"./km":377,"./km.js":377,"./kn":378,"./kn.js":378,"./ko":379,"./ko.js":379,"./ku":380,"./ku.js":380,"./ky":381,"./ky.js":381,"./lb":382,"./lb.js":382,"./lo":383,"./lo.js":383,"./lt":384,"./lt.js":384,"./lv":385,"./lv.js":385,"./me":386,"./me.js":386,"./mi":387,"./mi.js":387,"./mk":388,"./mk.js":388,"./ml":389,"./ml.js":389,"./mn":390,"./mn.js":390,"./mr":391,"./mr.js":391,"./ms":392,"./ms-my":393,"./ms-my.js":393,"./ms.js":392,"./mt":394,"./mt.js":394,"./my":395,"./my.js":395,"./nb":396,"./nb.js":396,"./ne":397,"./ne.js":397,"./nl":398,"./nl-be":399,"./nl-be.js":399,"./nl.js":398,"./nn":400,"./nn.js":400,"./pa-in":401,"./pa-in.js":401,"./pl":402,"./pl.js":402,"./pt":403,"./pt-br":404,"./pt-br.js":404,"./pt.js":403,"./ro":405,"./ro.js":405,"./ru":406,"./ru.js":406,"./sd":407,"./sd.js":407,"./se":408,"./se.js":408,"./si":409,"./si.js":409,"./sk":410,"./sk.js":410,"./sl":411,"./sl.js":411,"./sq":412,"./sq.js":412,"./sr":413,"./sr-cyrl":414,"./sr-cyrl.js":414,"./sr.js":413,"./ss":415,"./ss.js":415,"./sv":416,"./sv.js":416,"./sw":417,"./sw.js":417,"./ta":418,"./ta.js":418,"./te":419,"./te.js":419,"./tet":420,"./tet.js":420,"./tg":421,"./tg.js":421,"./th":422,"./th.js":422,"./tl-ph":423,"./tl-ph.js":423,"./tlh":424,"./tlh.js":424,"./tr":425,"./tr.js":425,"./tzl":426,"./tzl.js":426,"./tzm":427,"./tzm-latn":428,"./tzm-latn.js":428,"./tzm.js":427,"./ug-cn":429,"./ug-cn.js":429,"./uk":430,"./uk.js":430,"./ur":431,"./ur.js":431,"./uz":432,"./uz-latn":433,"./uz-latn.js":433,"./uz.js":432,"./vi":434,"./vi.js":434,"./x-pseudo":435,"./x-pseudo.js":435,"./yo":436,"./yo.js":436,"./zh-cn":437,"./zh-cn.js":437,"./zh-hk":438,"./zh-hk.js":438,"./zh-tw":439,"./zh-tw.js":439};function o(e){var t=n(e);return r(t)}function n(e){if(!r.o(map,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return map[e]}o.keys=function(){return Object.keys(map)},o.resolve=n,e.exports=o,o.id=441},444:function(e,t,r){"use strict";r.r(t);r(121),r(40),r(82),r(29),r(15),r(81),r(177),r(55);var o=r(5),n=r(56),l=r(312);function c(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}var d,m,f,v,h,_={head:function(){return{title:"商品管理"}},data:function(){return{listData:{list:[],page:1,limit:10,count:0,search:""},categorys:[],dialogGoodsUpdateVisible:!1,goodsInfoUpdateBtn:{disabled:!1},formGoodsData:{id:0,title:"",category_id:"",description:"",sku_id:"",stock:0,sales:0,price:0,price_cost:0,price_market:0,is_recommend:0,is_new:0,type_sub:0,package_level:0,package_profit:0,sort:0,thumb:"",cover:"",pics:[],status:0},fileListThumb:[],fileListCover:[],rulesFormGoodsUpdate:{title:[{required:!0,message:"请输入活商品名称",trigger:"blur"}],category_id:[{required:!0,message:"请选择商品分类",trigger:"change"}],sku_id:[{required:!0,message:"请输入商品货号",trigger:"blur"}]},packageLevels:[{id:0,title:"不是套餐"},{id:1,title:"A级"},{id:2,title:"B级"}],uploadSingleAction:"http://api.jianpiane.com/upload/single"}},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(source,!0).forEach((function(t){Object(n.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):c(source).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},r(440).a,{getListData:(h=Object(o.a)(regeneratorRuntime.mark((function e(){var data,t,r=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(data={}).page=this.listData.page,data.limit=this.listData.limit,data.search=this.listData.search,e.prev=4,e.next=7,l.a.getGoodsList(data);case 7:if(t=e.sent,console.log("/getListData dataRet:",t),0!==t.code){e.next=14;break}this.listData.count=t.data.count,t.data.rows.forEach((function(e){r.listData.list.push(e)})),e.next=15;break;case 14:throw new Error(t.message);case 15:e.next=20;break;case 17:e.prev=17,e.t0=e.catch(4),this.$message.error(e.t0.message||"获取用户数据失败");case 20:case"end":return e.stop()}}),e,this,[[4,17]])}))),function(){return h.apply(this,arguments)}),getListRefresh:(v=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.listData.list=[],this.listData.count=0,this.getListData();case 3:case"end":return e.stop()}}),e,this)}))),function(){return v.apply(this,arguments)}),getLsitSearch:function(){this.listData.list=[],this.listData.count=0,this.listData.page=1,this.getListData()},getCategorys:(f=Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.getGoodsCategoryList({limit:0,status:1});case 2:t=e.sent,this.categorys=t.data.rows;case 4:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)}),pageChange:function(e){this.listData.list=[],this.listData.page=e,this.getListData()},goodsUpdateBtnClick:function(e){var t=this;console.log("/goodsUpdateBtnClick item:",e),Object.keys(this.formGoodsData).forEach((function(r){e.hasOwnProperty(r)&&(r.indexOf("price")>-1||"package_profit"==r?t.formGoodsData[r]=parseFloat((e[r]/100).toFixed(2)):t.formGoodsData[r]=e[r])})),this.fileListThumb=e.thumb?[{name:"",url:e.thumb}]:[],this.fileListCover=e.cover?[{name:"",url:e.cover}]:[],console.log("/goodsUpdateBtnClick formGoodsData:",this.formGoodsData),this.dialogGoodsUpdateVisible=!0},goodsAddBtnClick:function(){this.formGoodsData={id:0,title:"",category_id:"",description:"",sku_id:"",stock:0,sales:0,price:0,price_cost:0,price_market:0,is_recommend:0,is_new:0,type_sub:0,package_level:0,package_profit:0,sort:0,thumb:"",cover:"",pics:[],status:0},this.dialogGoodsUpdateVisible=!0},goodsDeleteBtnClick:(m=Object(o.a)(regeneratorRuntime.mark((function e(t){var r,data,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.$confirm("此操作将永久删除该商品, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"});case 3:if(r=e.sent,console.log("/goodsDeleteBtnClick confirm",r),"confirm"===r){e.next=7;break}return e.abrupt("return");case 7:e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(0),console.error("/goodsDeleteBtnClick err:",e.t0.message||e.t0),e.abrupt("return");case 13:return(data=Object.assign({},t)).status=-1,e.prev=15,e.next=18,l.a.goodsDataUpdate(data);case 18:if(0===(o=e.sent).code){e.next=21;break}throw new Error(o.message);case 21:this.$message.success("更新商品数据成功"),this.getListRefresh(),e.next=28;break;case 25:e.prev=25,e.t1=e.catch(15),this.$message.error(e.t1.message);case 28:case"end":return e.stop()}}),e,this,[[0,9],[15,25]])}))),function(e){return m.apply(this,arguments)}),goodsInfoUpdate:(d=Object(o.a)(regeneratorRuntime.mark((function e(){var t,data,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.$refs.formGoodsUpdate.validate();case 2:if(t=e.sent,console.log("/goodsInfoUpdate valid:",t),!0===t){e.next=6;break}return e.abrupt("return");case 6:if((data=Object.assign({},this.formGoodsData)).price=parseInt(100*data.price),data.price_cost=parseInt(100*data.price_cost),data.price_market=parseInt(100*data.price_cost),data.package_profit=parseInt(100*data.package_profit),data.thumb=this.fileListThumb.length?this.fileListThumb[0].url:"",data.cover=this.fileListCover.length?this.fileListCover[0].url:"",console.log("/goodsInfoUpdate data:",data),this.goodsInfoUpdateBtn.disabled=!0,e.prev=15,!data.id){e.next=22;break}return e.next=19,l.a.goodsDataUpdate(data);case 19:r=e.sent,e.next=25;break;case 22:return e.next=24,l.a.goodsDataCreate(data);case 24:r=e.sent;case 25:if(0===r.code){e.next=27;break}throw new Error(r.message);case 27:this.$message.success("更新商品数据成功"),this.getListRefresh(),e.next=34;break;case 31:e.prev=31,e.t0=e.catch(15),this.$message.error(e.t0.message);case 34:this.goodsInfoUpdateBtn.disabled=!1,this.dialogGoodsUpdateVisible=!1;case 36:case"end":return e.stop()}}),e,this,[[15,31]])}))),function(){return d.apply(this,arguments)}),handlePreviewThumb:function(e,t){console.log("/handlePreview file:",e),console.log("/handlePreview fileList:",t)},handleRemoveThumb:function(e){console.log("/handleRemove file:",e)},handSuccessThumb:function(e,t,r){console.log("/handSuccessThumb res:",e),console.log("/handSuccessThumb file:",t),console.log("/handSuccessThumb list:",r),this.fileListThumb=[{name:t.name,url:e.data.url}]},handlePreviewCover:function(e,t){console.log("/handlePreviewCover file:",e),console.log("/handlePreviewCover fileList:",t)},handleRemoveCover:function(e){console.log("/handleRemoveCover file:",e)},handSuccessCover:function(e,t,r){console.log("/handSuccessCover res:",e),console.log("/handSuccessCover file:",t),console.log("/handSuccessCover list:",r),this.fileListCover=[{name:t.name,url:e.data.url}]}}),created:function(){this.getListData(),this.getCategorys()}},j=r(16),component=Object(j.a)(_,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("el-table",{attrs:{data:e.listData.list}},[r("el-table-column",{attrs:{prop:"id"}},[r("template",{slot:"header"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.goodsAddBtnClick}},[e._v("添加")])],1)],2),e._v(" "),r("el-table-column",{attrs:{label:"sku",prop:"sku_id"}}),e._v(" "),r("el-table-column",{attrs:{label:"图片"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticStyle:{height:"40px"},attrs:{src:e.row.thumb||e.row.cover}})]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"商品名称",prop:"title"}}),e._v(" "),r("el-table-column",{attrs:{label:"分类"},scopedSlots:e._u([{key:"default",fn:function(t){return e._l(e.categorys,(function(o){return o.id==t.row.category_id?r("span",[e._v(e._s(o.title))]):e._e()}))}}])}),e._v(" "),r("el-table-column",{attrs:{label:"库存",prop:"stock"}}),e._v(" "),r("el-table-column",{attrs:{label:"销量",prop:"sales"}}),e._v(" "),r("el-table-column",{attrs:{label:"售卖价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{staticClass:"text-red-500"},[e._v("￥"+e._s((t.row.price/100).toFixed(2)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"成本"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{staticClass:"text-red-500"},[e._v("￥"+e._s((t.row.price_cost/100).toFixed(2)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"市场价格"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",{},[e._v("￥"+e._s((t.row.price_market/100).toFixed(2)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"推荐"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.is_recommend?r("span",[r("i",{staticClass:"el-icon-check"})]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"新品"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.is_new?r("span",[r("i",{staticClass:"el-icon-check"})]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"套餐"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.package_level>0?r("span",e._l(e.packageLevels,(function(o){return o.id==t.row.package_level?r("span",{key:o.id},[e._v(e._s(o.title))]):e._e()})),0):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"排序",prop:"sort"}}),e._v(" "),r("el-table-column",{attrs:{label:"状态",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.status?r("span",{staticClass:"text-gray-500"},[e._v("未上架")]):e._e(),e._v(" "),1==t.row.status?r("span",{staticClass:"text-green-500"},[e._v("已上架")]):e._e()]}}])}),e._v(" "),r("el-table-column",{attrs:{align:"right",width:"240"},scopedSlots:e._u([{key:"header",fn:function(t){return[r("el-input",{staticClass:"inline-block",attrs:{size:"mini",placeholder:"输入关键字搜索"},on:{change:e.getLsitSearch},model:{value:e.listData.search,callback:function(t){e.$set(e.listData,"search",t)},expression:"listData.search"}})]}},{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(r){return e.goodsUpdateBtnClick(t.row)}}},[e._v("查看 / 编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(r){return e.goodsDeleteBtnClick(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),r("el-pagination",{staticClass:"mt-4",attrs:{"current-page":e.listData.page,"page-size":e.listData.limit,layout:"prev, pager, next, total, jumper",total:e.listData.count},on:{"current-change":e.pageChange,"prev-click":e.pageChange,"next-click":e.pageChange}}),e._v(" "),r("el-dialog",{attrs:{title:"商品添加 / 编辑",visible:e.dialogGoodsUpdateVisible},on:{"update:visible":function(t){e.dialogGoodsUpdateVisible=t}}},[r("el-form",{ref:"formGoodsUpdate",attrs:{model:e.formGoodsData,"label-width":"100px",rules:e.rulesFormGoodsUpdate}},[r("el-form-item",{attrs:{label:"商品名称",prop:"title"}},[r("el-input",{model:{value:e.formGoodsData.title,callback:function(t){e.$set(e.formGoodsData,"title",t)},expression:"formGoodsData.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"商品分类",prop:"category_id"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formGoodsData.category_id,callback:function(t){e.$set(e.formGoodsData,"category_id",t)},expression:"formGoodsData.category_id"}},e._l(e.categorys,(function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"上架状态"}},[r("el-radio",{attrs:{label:1},model:{value:e.formGoodsData.status,callback:function(t){e.$set(e.formGoodsData,"status",t)},expression:"formGoodsData.status"}},[e._v("已上架")]),e._v(" "),r("el-radio",{attrs:{label:0},model:{value:e.formGoodsData.status,callback:function(t){e.$set(e.formGoodsData,"status",t)},expression:"formGoodsData.status"}},[e._v("未上架")])],1),e._v(" "),r("el-form-item",{attrs:{label:"商品描述"}},[r("el-input",{attrs:{type:"textarea",rows:2,placeholder:"请输入内容"},model:{value:e.formGoodsData.description,callback:function(t){e.$set(e.formGoodsData,"description",t)},expression:"formGoodsData.description"}})],1),e._v(" "),r("div",{staticClass:"flex flex-wrap"},[r("el-form-item",{staticClass:"flex-1",attrs:{label:"货号",prop:"sku_id"}},[r("el-input",{model:{value:e.formGoodsData.sku_id,callback:function(t){e.$set(e.formGoodsData,"sku_id",t)},expression:"formGoodsData.sku_id"}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"库存"}},[r("el-input-number",{attrs:{min:-1,label:"-1代表无限库存"},model:{value:e.formGoodsData.stock,callback:function(t){e.$set(e.formGoodsData,"stock",t)},expression:"formGoodsData.stock"}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"销售量"}},[r("el-input-number",{attrs:{min:0,label:""},model:{value:e.formGoodsData.sales,callback:function(t){e.$set(e.formGoodsData,"sales",t)},expression:"formGoodsData.sales"}})],1)],1),e._v(" "),r("div",{staticClass:"flex flex-wrap"},[r("el-form-item",{staticClass:"flex-1",attrs:{label:"售卖价格"}},[r("el-input-number",{attrs:{precision:2},model:{value:e.formGoodsData.price,callback:function(t){e.$set(e.formGoodsData,"price",t)},expression:"formGoodsData.price"}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"成本价格"}},[r("el-input-number",{attrs:{precision:2},model:{value:e.formGoodsData.price_cost,callback:function(t){e.$set(e.formGoodsData,"price_cost",t)},expression:"formGoodsData.price_cost"}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"市场价格"}},[r("el-input-number",{attrs:{precision:2},model:{value:e.formGoodsData.price_market,callback:function(t){e.$set(e.formGoodsData,"price_market",t)},expression:"formGoodsData.price_market"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"是否推荐"}},[r("el-radio",{attrs:{label:1},model:{value:e.formGoodsData.is_recommend,callback:function(t){e.$set(e.formGoodsData,"is_recommend",t)},expression:"formGoodsData.is_recommend"}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0},model:{value:e.formGoodsData.is_recommend,callback:function(t){e.$set(e.formGoodsData,"is_recommend",t)},expression:"formGoodsData.is_recommend"}},[e._v("否")])],1),e._v(" "),r("el-form-item",{attrs:{label:"是否新品"}},[r("el-radio",{attrs:{label:1},model:{value:e.formGoodsData.is_new,callback:function(t){e.$set(e.formGoodsData,"is_new",t)},expression:"formGoodsData.is_new"}},[e._v("是")]),e._v(" "),r("el-radio",{attrs:{label:0},model:{value:e.formGoodsData.is_new,callback:function(t){e.$set(e.formGoodsData,"is_new",t)},expression:"formGoodsData.is_new"}},[e._v("否")])],1),e._v(" "),r("el-form-item",{attrs:{label:"男用or女用"}},[r("el-radio",{attrs:{label:0},model:{value:e.formGoodsData.type_sub,callback:function(t){e.$set(e.formGoodsData,"type_sub",t)},expression:"formGoodsData.type_sub"}},[e._v("无")]),e._v(" "),r("el-radio",{attrs:{label:1},model:{value:e.formGoodsData.type_sub,callback:function(t){e.$set(e.formGoodsData,"type_sub",t)},expression:"formGoodsData.type_sub"}},[e._v("男用")]),e._v(" "),r("el-radio",{attrs:{label:2},model:{value:e.formGoodsData.type_sub,callback:function(t){e.$set(e.formGoodsData,"type_sub",t)},expression:"formGoodsData.type_sub"}},[e._v("女用")])],1),e._v(" "),r("div",{staticClass:"flex flex-wrap"},[r("el-form-item",{staticClass:"flex-1",attrs:{label:"套餐等级"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formGoodsData.package_level,callback:function(t){e.$set(e.formGoodsData,"package_level",t)},expression:"formGoodsData.package_level"}},e._l(e.packageLevels,(function(e){return r("el-option",{key:e.id,attrs:{label:e.title,value:e.id}})})),1)],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"赠送分红限额"}},[r("el-input-number",{attrs:{min:0,label:"",precision:2},model:{value:e.formGoodsData.package_profit,callback:function(t){e.$set(e.formGoodsData,"package_profit",t)},expression:"formGoodsData.package_profit"}})],1),e._v(" "),r("el-form-item",{staticClass:"flex-1",attrs:{label:"排序"}},[r("el-input-number",{attrs:{min:0,label:""},model:{value:e.formGoodsData.sort,callback:function(t){e.$set(e.formGoodsData,"sort",t)},expression:"formGoodsData.sort"}})],1),e._v(" "),r("div",{staticClass:"flex flex-wrap"},[r("el-form-item",{attrs:{label:"封面缩略图"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:e.uploadSingleAction,"on-preview":e.handlePreviewThumb,"on-remove":e.handleRemoveThumb,"on-success":e.handSuccessThumb,"file-list":e.fileListThumb,"list-type":"picture",multiple:!1,name:"photo"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png/gif文件，且不超过500kb")])],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"封面大图"}},[r("el-upload",{staticClass:"upload-demo",attrs:{action:e.uploadSingleAction,"on-preview":e.handlePreviewCover,"on-remove":e.handleRemoveCover,"on-success":e.handSuccessCover,"file-list":e.fileListCover,"list-type":"picture",multiple:!1,name:"photo"}},[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")]),e._v(" "),r("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png/gif文件，且不超过500kb")])],1)],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogGoodsUpdateVisible=!1}}},[e._v("取 消")]),e._v(" "),r("el-button",{attrs:{type:"primary",disabled:e.goodsInfoUpdateBtn.disabled},on:{click:e.goodsInfoUpdate}},[e._v("确 定")])],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports}}]);