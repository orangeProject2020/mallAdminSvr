<template>
  <div>
    <el-row class="mt-4">
      <el-col :span="6">
        <el-input placeholder="请输入单号或者用户手机号码" v-model="listData.search" @change="getSearchList">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="listData.list">
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="账单号" prop="out_trade_no"></el-table-column>
      <el-table-column label="用户信息">
        <template slot-scope="scope">
          <span
            v-for="user in userList"
            v-if="user.uuid == scope.row.user_id"
            class="text-blue-500"
          >{{user.username}} / {{user.mobile}}</span>
        </template>
      </el-table-column>
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
      <el-table-column label="订单IDS">
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
        limit: 10,
        count: 0,
        search: ""
      },
      userList: [],
      searchUserId: ""
    };
  },
  methods: {
    ...utils,
    async getListData() {
      let data = {};
      data.page = this.listData.page;
      data.limit = this.listData.limit;
      data.search = this.listData.search;

      if (this.listData.search) {
        let search = this.listData.search
        if (search.length > 20) {
          data.out_trade_no = search;
        } else if (search.length == 11) {
          data.user_id = this.searchUserId;
        } else if (search.length < 11) {
          data.payment_id = search;
        }
      }

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
    },
    async getSearchList() {
      
      let search = this.listData.search;
      if (this.listData.search.length == 11) {
        // 通过phone找用户user_id
        let searchRet = await apis.getUserIdByMobile({ mobile: search });
        console.log("/getSearchList searchRet:", searchRet);
        if (searchRet.code === 0 && searchRet.data && searchRet.data.id) {
          this.searchUserId = searchRet.data.uuid;
        } else {
          this.searchUserId = "";
        }
      } else {
        this.searchUserId = "";
      }

      this.listData.page = 1;
      this.listData.list = [];
      this.getListData();
    },
    async getUserList() {
      let userIds = [];
      this.userList = [];
      this.listData.list.forEach(item => {
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
    this.getListData().then(() => {
      this.getUserList();
    });

    this.$store.commit("subNavIndexSet", "2");
  }
};
</script>