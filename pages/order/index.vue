<template>
  <div class="mt-4">
    <el-row>
      <el-col :span="12">
        <el-input placeholder="请输入订单号或者用户手机号码" v-model="search" @change="getSearchList">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="12" class="text-right">
        <el-select v-model="statusVal" placeholder="请选择" @change="statusChange">
          <el-option
            v-for="item in statusOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column label="订单号" prop="order_no"></el-table-column>
      <el-table-column label="用户信息">
        <template slot-scope="scope">
          <span
            v-for="user in userList"
            v-if="user.uuid == scope.row.user_id"
            class="text-blue-500"
          >{{user.username}} / {{user.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{dateFormat(scope.row.create_time)}}</template>
      </el-table-column>
      <el-table-column label="订单金额">
        <template slot-scope="scope">
          <span class="text-red-600">￥{{(scope.row.total / 100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="50">
        <template slot-scope="scope">{{ scope.row.items.length}}</template>
      </el-table-column>
      <el-table-column type="expand" label="商品">
        <template slot-scope="props">
          <el-table :data="props.row.items" style="width: 100%">
            <el-table-column label="商品图片">
              <template slot-scope="scope">
                <img :src="scope.row.cover" width="30" height="30" />
              </template>
            </el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="成本">
              <template slot-scope="scope">
                <span class>￥{{(scope.row.price_cost / 100).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="单价">
              <template slot-scope="scope">
                <span class="text-red-600">￥{{(scope.row.price / 100).toFixed(2)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="购买数量" prop="num"></el-table-column>
            <el-table-column label="价格">
              <template slot-scope="scope">
                <span class="text-red-600">￥{{(scope.row.total / 100).toFixed(2)}}</span>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column label="地址">
        <template slot-scope="scope">
          <div v-html="showAddress(scope.row.address)"></div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" class="text-red-600">未付款</span>
          <span v-if="scope.row.status == 1" class="text-orange-600">待发货</span>
          <span v-if="scope.row.status == 2" class="text-blue-600">待收货</span>
          <span v-if="scope.row.status == 3">已完成</span>
          <span v-if="scope.row.status == -1">已取消</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="warning"
            plain
            size="small"
            v-if="scope.row.status == 0"
            @click="orderCancel(scope.row)"
          >取消订单</el-button>
          <el-button
            type="danger"
            plain
            size="small"
            v-if="scope.row.status == 0"
            class="text-red-600"
            @click="orderComplete(scope.row)"
          >确认付款</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            v-if="scope.row.status == 1"
            @click="orderExpressBtnClick(scope.row)"
          >发货信息填写</el-button>
          <el-button
            type="primary"
            plain
            size="small"
            v-if="scope.row.status == 2"
            @click="orderExpressBtnClick(scope.row)"
          >发货信息修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      layout="prev, pager, next, total, jumper"
      :total="count"
      class="mt-4"
      @current-change="pageChange"
      @prev-click="pageChange"
      @next-click="pageChange"
    ></el-pagination>

    <el-dialog title="商品发货" :visible.sync="dialogExpressUpdateVisible">
      <el-form
        :model="expressData"
        label-width="100px"
        :rules="rulesExpressData"
        ref="formExpressUpdate"
      >
        <el-form-item label="物流公司" prop="company">
          <el-input v-model="expressData.company"></el-input>
        </el-form-item>
        <el-form-item label="物流单号" prop="no">
          <el-input v-model="expressData.no"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogExpressUpdateVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="orderExpressInfoUpdate"
          :disabled="orderExpressInfoUpdateBtn.disabled"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utils from "@/assets/js/utils";
import apis from "@/assets/js/apis";
export default {
  head() {
    return {
      title: "订单管理"
    };
  },
  data() {
    return {
      list: [],
      page: 1,
      limit: 10,
      count: 0,
      statusVal: "",
      search: "",
      searchUserId: "",
      userList: [],
      statusOptions: [
        {
          id: "",
          name: "所有"
        },
        {
          id: 0,
          name: "未付款"
        },
        {
          id: 1,
          name: "待发货"
        },
        {
          id: 2,
          name: "待收货"
        },
        {
          id: 3,
          name: "已完成"
        },
        {
          id: -1,
          name: "已取消"
        }
      ],
      dialogExpressUpdateVisible: false,
      orderExpressInfoUpdateBtn: {
        disabled: false
      },
      expressOrder: {},
      expressData: {},
      rulesExpressData: {
        company: [
          { required: true, message: "请输入物流公司名称", trigger: "blur" }
        ],
        no: [{ required: true, message: "请输入物流单号", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...utils,
    async getList() {
      let data = {};
      data.page = this.page;
      data.limit = this.limit;
      if (this.statusVal !== "") {
        data.status = this.statusVal;
      }

      if (this.search) {
        if (this.search.length > 20) {
          data.order_no = this.search;
        } else if (this.search.length == 11) {
          data.user_id = this.searchUserId;
        } else if (this.search.length < 11) {
          data.order_id = this.search;
        }
      }

      let listRet = await apis.getOrderList(data);
      console.log("/getList ret", listRet);
      this.list = listRet.data.rows;
      this.count = listRet.data.count;
    },
    async getSearchList() {
      let search = this.search;
      if (this.search.length == 11) {
        // 通过phone找用户user_id
        let searchRet = await apis.getUserIdByMobile({ mobile: this.search });
        console.log("/getSearchList searchRet:", searchRet);
        if (searchRet.code === 0 && searchRet.data && searchRet.data.id) {
          this.searchUserId = searchRet.data.uuid;
        } else {
          this.searchUserId = "";
        }
      } else {
        this.searchUserId = "";
      }

      this.page = 1;
      this.getList();
    },
    pageChange(currentPage) {
      console.log("/pageChange:", currentPage);
      this.page = currentPage;
      this.getList();
    },
    statusChange() {
      console.log("/statusChange:", this.statusVal);
      this.page = 1;
      this.getList();
    },
    orderCancel(order) {
      let cancelData = {};
      cancelData.id = order.id;
      cancelData.user_id = order.user_id;
      cancelData.cancel_reason = "后台取消";

      this.$confirm("是否将该订单设置为取消状态, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let cancelRet = await apis.cancelOrder(cancelData);
          console.log("/orderCancel cancelRet:", cancelRet);
          if (cancelRet.code == 0) {
            order.status = -1;
            this.$message({
              type: "success",
              message: "取消成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: cancelData.message
            });
          }
        })
        .catch(() => {});
    },
    orderComplete(order) {
      this.$confirm("是否确认该订单已支付, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let orderCompleteRet = await this.orderCompleteSubmit(order);
          console.log("/orderComplete orderCompleteRet:", orderCompleteRet);
          if (orderCompleteRet.code == 0) {
            order.status = 1;
            this.$message({
              type: "success",
              message: "确认成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: orderCompleteRet.message
            });
          }
        })
        .catch(() => {});
    },
    async orderCompleteSubmit(order) {
      let paymentCreateData = {
        user_id: order.user_id,
        order_ids: [order.id],
        total: order.total,
        amount: order.total,
        score: 0,
        pay_type: 0,
        pay_method: 0,
        balance: 0,
        coupon: 0,
        user_coupon_id: 0,
        remark: "后台生成"
      };

      let paymentCreateRet = await apis.paymentCreate(paymentCreateData);
      console.log("/orderCompleteSubmit paymentCreateRet:", paymentCreateRet);
      if (paymentCreateRet.code) {
        return paymentCreateRet;
      }

      let outTradeNo = paymentCreateRet.data.out_trade_no;
      let paymentCompleteData = {
        user_id: order.user_id,
        out_trade_no: outTradeNo,
        remark: "后台确认"
      };
      let paymentCompleteRet = await apis.paymentComplete(paymentCompleteData);
      console.log(
        "/orderCompleteSubmit paymentCompleteRet:",
        paymentCompleteRet
      );
      return paymentCreateRet;
    },
    orderExpressBtnClick(item) {
      this.expressOrder = item;
      let expressInfo = item.express_info ? JSON.parse(item.express_info) : {};
      this.expressData = Object.assign({}, expressInfo);
      this.dialogExpressUpdateVisible = true;
    },
    async orderExpressInfoUpdate() {
      this.orderExpressInfoUpdateBtn.disabled = true;
      let data = {
        order_id: this.expressOrder.id,
        user_id: this.expressOrder.user_id,
        express_info: JSON.stringify(this.expressData)
      };

      try {
        let ret = await apis.updateOrder(data);
        if (ret.code == 0) {
          this.$message("更新物流信息成功");
          this.getList();
        } else {
          throw new Error(ret.message);
        }
      } catch (err) {
        this.$message.error(err.message || err);
      }

      this.dialogExpressUpdateVisible = false;
      this.orderExpressInfoUpdateBtn.disabled = false;
    },
    showAddress(jsonStr) {
      let addressObj = jsonStr ? JSON.parse(jsonStr) : {};
      if (!addressObj || !addressObj.id || addressObj.id <= 0) {
        return "-";
      }
      let str = "";
      str += `<p>${addressObj.name} / ${addressObj.tel} / ${addressObj.postalCode}</p>`;
      str += `<p class="text-gray-500 text-xl">${addressObj.province}/${addressObj.city}/${addressObj.county} / ${addressObj.address}</p>`;
      return str;
    },
    async getUserList() {
      let userIds = [];
      this.user_id = [];
      this.list.forEach(item => {
        userIds.push(item.user_id);
      });

      let ret = await apis.getListByUserIds({ user_ids: userIds });
      console.log("/getUserList ret:", ret);
      if (ret.code === 0) {
        this.userList = ret.data;
      }
    }
  },
  created() {
    this.getList().then(() => {
      this.getUserList();
    });
  }
};
</script>