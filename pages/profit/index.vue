<template>
  <div>
    <el-row class="mt-4">
      <el-col :span="6">
        <el-input placeholder="请输入用户手机号码" v-model="listData.search" @change="getSearchList">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
      <el-col :span="18" class="text-right">
        <el-date-picker
          v-model="dateVal"
          type="date"
          placeholder="选择日期"
          @change="dateChange"
          value-format="yyyy-MM-dd"
          class="mr-4"
        ></el-date-picker>
        <el-button
          @click="profitPlatformCheckBtnClick"
          :disabled="profitPlatformCheckBtnDisabled"
          plain
          type="primary"
        >平台每日分红结算</el-button>
        <el-button
          @click="profitUserCheckBtnClick"
          :disabled="profitUserCheckBtnDisabled"
          plain
          type="primary"
        >套餐分红生成</el-button>
        <el-button
          @click="profitUserCloseBtnClick"
          :disabled="profitUserCloseBtnDisabled"
          plain
          type="primary"
        >套餐分红结算</el-button>
      </el-col>
    </el-row>
    <el-table :data="listData.list">
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
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
      <el-table-column label="分红日期">
        <template slot-scope="scope">{{scope.row.date}}</template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">￥{{(scope.row.amount/100).toFixed(2)}}</template>
      </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <span v-if="scope.row.type == 1">套餐分红</span>
          <span v-if="scope.row.type == 2">平台分红</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 1">已结算</span>
          <span v-if="scope.row.status == 0" class="text-red-500">未结算</span>
        </template>
      </el-table-column>
      <el-table-column label="关联订单ID">
        <template slot-scope="scope">
          <span class>{{(scope.row.order_id)}}</span>
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
      searchUserId: "",
      dateVal: "",
      profitPlatformCheckBtnDisabled: false,
      profitUserCheckBtnDisabled: false,
      profitUserCloseBtnDisabled: false
    };
  },
  methods: {
    ...utils,
    async getListData() {
      let data = {};
      data.page = this.listData.page;
      data.limit = this.listData.limit;
      data.date = this.dateVal;
      // data.search = this.listData.search;

      if (this.listData.search) {
        let search = this.listData.search;
        if (search.length > 20) {
          // data.out_trade_no = search;
        } else if (search.length == 11) {
          data.user_id = this.searchUserId;
        } else if (search.length < 11) {
          data.id = search;
        }
      }

      try {
        let dataRet = await apis.getProfitList(data);
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
    getRefreshData() {
      this.listData.list = [];
      this.listData.page = 1;
      this.listData.count = 0;
      this.getListData().then(() => {
        this.getUserList();
      });
    },
    pageChange(page) {
      this.listData.list = [];
      this.listData.page = page;
      this.getListData();
    },
    dateChange() {
      console.log(this.dateVal);
      this.getRefreshData();
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
    },
    async profitPlatformCheckBtnClick() {
      this.pr0fitPlatformCheckBtnDisabled = true;
      try {
        let ret = await apis.profitPlatformCheck({ date: this.dateVal });
        if (ret.code == 0) {
          this.getRefreshData();
        } else {
          throw new Error(ret.message);
        }
      } catch (err) {}
      this.profitPlatformCheckBtnDisabled = false;
    },
    async profitUserCheckBtnClick() {
      this.profitUserCheckBtnDisabled = true;
      try {
        let ret = await apis.profitUserCheck();
        if (ret.code == 0) {
          this.getRefreshData();
        } else {
          throw new Error(ret.message);
        }
      } catch (err) {}
      this.profitUserCheckBtnDisabled = false;
    },
    async profitUserCloseBtnClick() {
      this.profitUserCloseBtnDisabled = true;
      try {
        let ret = await apis.profitUserClose();
        if (ret.code == 0) {
          this.getRefreshData();
        } else {
          throw new Error(ret.message);
        }
      } catch (err) {}
      this.profitUserCloseBtnDisabled = false;
    }
  },
  created() {
    this.getListData().then(() => {
      this.getUserList();
    });

    this.$store.commit("subNavIndexSet", "5");
  }
};
</script>