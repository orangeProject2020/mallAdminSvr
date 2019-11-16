<template>
  <div class="mt-4">
    <el-table :data="list" border style="width: 100%">
      <el-table-column label="订单号" prop="order_no"></el-table-column>
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
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.items" border style="width: 100%">
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
          <el-button type="primary" plain size="small" v-if="scope.row.status == 1">发货</el-button>
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
      limit: 5,
      count: 0
    };
  },
  methods: {
    ...utils,
    async getList() {
      let data = {};
      data.page = this.page;
      data.limit = this.limit;

      let listRet = await apis.getOrderList(data);
      console.log("/getList ret", listRet);
      this.list = listRet.data.rows;
      this.count = listRet.data.count;
    },
    pageChange(currentPage) {
      console.log("/pageChange:", currentPage);
      this.page = currentPage;
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
    }
  },
  created() {
    this.getList();
  }
};
</script>