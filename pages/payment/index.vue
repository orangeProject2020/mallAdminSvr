<template>
  <div>
    <el-table :data="listData.list">
      <el-table-column label="账单号" prop="out_trade_no"></el-table-column>
      <el-table-column label="支付时间">
        <template slot-scope="scope">{{dateFormat(scope.row.update_time)}}</template>
      </el-table-column>
      <el-table-column label="账单金额">
        <template slot-scope="scope">￥{{(scope.row.total/100).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column label="支付金额">
        <template slot-scope="scope">
          <span class="text-red-500">￥{{(scope.row.amount/100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_method == 0">线下支付</span>
          <span v-if="scope.row.pay_method == 1">微信支付</span>
          <span v-if="scope.row.pay_method == 2">支付宝</span>
        </template>
      </el-table-column>
      <el-table-column label="用户id">
        <template slot-scope="scope">
          <span class>{{(scope.row.user_id)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账单ids">
        <template slot-scope="scope">
          <span class>{{(scope.row.order_ids)}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listData.page"
      :page-size="listData.limit"
      layout="prev, pager, next, total, jumper"
      :total="listData.count"
      class="mt-4"
      @current-change="pageChange"
      @prev-click="pageChange"
      @next-click="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
import apis from "@/assets/js/apis";
import utils from "@/assets/js/utils";
export default {
  head() {
    return {
      title: "账单管理"
    };
  },
  data() {
    return {
      listData: {
        list: [],
        page: 1,
        limit: 1,
        count: 0,
        search: ""
      }
    };
  },
  methods: {
    ...utils,
    async getListData() {
      let data = {};
      data.page = this.listData.page;
      data.limit = this.listData.limit;
      data.search = this.listData.search;

      try {
        let dataRet = await apis.getPaymentList(data);
        console.log("/getListData dataRet:", dataRet);
        if (dataRet.code === 0) {
          this.listData.count = dataRet.data.count;
          dataRet.data.rows.forEach(item => {
            this.listData.list.push(item);
          });
        } else {
          throw new Error(dataRet.message);
        }
      } catch (err) {
        this.$message.error(err.message || "获取用户数据失败");
      }
    },
    pageChange(page) {
      this.listData.list = [];
      this.listData.page = page;
      this.getListData();
    }
  },
  created() {
    this.getListData();
  }
};
</script>