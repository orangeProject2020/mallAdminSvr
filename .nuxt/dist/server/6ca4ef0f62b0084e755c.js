exports.ids=[8],exports.modules={84:function(t,e,l){"use strict";var r=l(5),o=l.n(r),n={async post(t,data){console.log("axios node_env:","production");let e="http://mall.admin.jianpiane.com";console.log("axios domain:",e),t=e+t,console.log("axios url: ",t);let l=await o.a.post(t,data);return console.log("axios status: ",l.status),l.data}};e.a={getUserIdByMobile:async data=>await n.post("/api/user/data/getUserIdByMobile",{mobile:data.mobile}),getListByUserIds:async data=>await n.post("/api/user/data/getListByUserIds",{user_ids:data.user_ids}),getOrderList:async data=>await n.post("/api/mall/order/list",data),cancelOrder:async data=>await n.post("/api/mall/order/cancel",data),updateOrder:async data=>await n.post("/api/mall/order/update",data),paymentCreate:async data=>await n.post("/api/mall/payment/create",data),paymentComplete:async data=>await n.post("/api/mall/payment/complete",data),getPaymentList:async data=>await n.post("/api/mall/payment/list",data),getGoodsList:async data=>(data.business_id=0,await n.post("/api/mall/goods/list",data)),goodsDataCreate:async data=>(data.business_id=0,await n.post("/api/mall/goods/create",data)),goodsDataUpdate:async data=>(data.business_id=0,await n.post("/api/mall/goods/update",data)),categoryDataUpdate:async data=>(data.business_id=0,await n.post("/api/mall/goods/categoryUpdate",data)),getGoodsCategoryList:async data=>(data.business_id=0,await n.post("/api/mall/goods/categorys",data)),getProfitList:async data=>await n.post("/api/mall/profit/list",data),getAssetsList:async data=>await n.post("/api/mall/assets/list",data),getAssetsLogsList:async data=>await n.post("/api/mall/assets/listLogs",data),getWithdrawList:async data=>await n.post("/api/mall/withdraw/list",data),statisticsTodayData:async(data={})=>await n.post("/api/mall/statistics/today",data)}},85:function(t,e,l){"use strict";var r=l(83),o=l.n(r);e.a={formValidata:t=>new Promise((e,l)=>{t.validate(t=>{e(!!t)})}),unLimitTreeLevel(t,e=0){var l=[],r=function(t,e,o){for(var i=0;i<t.length;i++){var n=t[i];if(n.pid==e){n.level=o,n.html="";for(let t=0;t<o;t++)n.html+=" -- ";l.push(n),r(t,n.id,o+1)}}};return r(t,e,0),l},getTimestamp(t){let e=new Date(t);return parseInt(e.getTime()/1e3)},dateFormat(t,e){e=e||"YYYY-MM-DD HH:mm";let l=null;return l=t?new Date(1e3*t):new Date,o()(l).format(e)},dateDisplay(t){let e=parseInt(Date.now()/1e3)-t;if(e<60)return e+"秒前";if(e>=60&&e<3600)return parseInt(e/60).toString()+"分钟前";if(e>=3600&&e<86400)return parseInt(e/3600).toString()+"小时前";if(e>=86400&&e<2592e3)return parseInt(e/3600/24).toString()+"天前";{let e="YYYY-MM-DD HH:mm",l=new Date(1e3*t);return o()(l).format(e)}},monthPlus(t,e=1,l=!0){let r=[31,28,31,30,31,30,31,31,30,31,30,31],o=parseInt(this.dateFormat(t,"YYYY")),n=parseInt(this.dateFormat(t,"MM")),c=parseInt(this.dateFormat(t,"DD"));r[1]=o%4==0&&o/100!=0||o%100==0&&o%400==0?29:28;let d=0;d+=r[n-1]-c;for(let i=0;i<e;i++){(n+=1)>12&&(n=1,o+=1),r[1]=o%4==0&&o/100!=0||o%100==0&&o%400==0?29:28;let t=r[n-1];i==e-1&&(t=t-c<0?t:c),console.log("for days:",t),d+=t}return l?(t=t||parseInt(Date.now()/1e3))+24*d*3600:d}}},86:function(t,e,l){"use strict";l.r(e);var r=l(84),o={head:()=>({title:"账单管理"}),data:()=>({listData:{list:[],page:1,limit:10,count:0,search:""},userList:[],searchUserId:""}),methods:{...l(85).a,async getListData(){let data={};if(data.page=this.listData.page,data.limit=this.listData.limit,this.listData.search){let t=this.listData.search;t.length>20||(11==t.length?data.user_id=this.searchUserId:t.length<11&&(data.id=t))}try{let t=await r.a.getProfitList(data);if(console.log("/getListData dataRet:",t),0!==t.code)throw new Error(t.message);this.listData.count=t.data.count,t.data.rows.forEach(t=>{this.listData.list.push(t)})}catch(t){this.$message.error(t.message||"获取用户数据失败")}},pageChange(t){this.listData.list=[],this.listData.page=t,this.getListData()},async getSearchList(){let t=this.listData.search;if(11==this.listData.search.length){let e=await r.a.getUserIdByMobile({mobile:t});console.log("/getSearchList searchRet:",e),0===e.code&&e.data&&e.data.id?this.searchUserId=e.data.uuid:this.searchUserId=""}else this.searchUserId="";this.listData.page=1,this.listData.list=[],this.getListData()},async getUserList(){let t=[];this.userList=[],this.listData.list.forEach(e=>{t.push(e.user_id)});let e=await r.a.getListByUserIds({user_ids:t});console.log("/getUserList ret:",e),0===e.code&&(this.userList=e.data)}},created(){this.getListData().then(()=>{this.getUserList()}),this.$store.commit("subNavIndexSet","5")}},n=l(2),component=Object(n.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("el-row",{staticClass:"mt-4"},[l("el-col",{attrs:{span:6}},[l("el-input",{attrs:{placeholder:"请输入用户手机号码"},on:{change:t.getSearchList},model:{value:t.listData.search,callback:function(e){t.$set(t.listData,"search",e)},expression:"listData.search"}},[l("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1)],1),t._ssrNode(" "),l("el-table",{attrs:{data:t.listData.list}},[l("el-table-column",{attrs:{label:"ID",prop:"id",width:"50"}}),t._v(" "),l("el-table-column",{attrs:{label:"用户信息"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(t.userList,(function(r){return r.uuid==e.row.user_id?l("span",{staticClass:"text-blue-500"},[t._v(t._s(r.username)+" / "+t._s(r.mobile))]):t._e()}))}}])}),t._v(" "),l("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.dateFormat(e.row.create_time)))]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"分红日期"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.date))]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"金额"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("￥"+t._s((e.row.amount/100).toFixed(2)))]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.type?l("span",[t._v("套餐分红")]):t._e(),t._v(" "),2==e.row.type?l("span",[t._v("平台分红")]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?l("span",[t._v("已结算")]):t._e(),t._v(" "),0==e.row.status?l("span",{staticClass:"text-red-500"},[t._v("未结算")]):t._e()]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"关联订单ID"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("span",{},[t._v(t._s(e.row.order_id))])]}}])})],1),t._ssrNode(" "),l("el-pagination",{staticClass:"mt-4",attrs:{"current-page":t.listData.page,"page-size":t.listData.limit,layout:"prev, pager, next, total, jumper",total:t.listData.count},on:{"current-change":t.pageChange,"prev-click":t.pageChange,"next-click":t.pageChange}})],2)}),[],!1,null,null,"5e167aaa");e.default=component.exports}};