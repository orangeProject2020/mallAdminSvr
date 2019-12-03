<template>
  <div>
    <el-row class="mt-4">
      <el-col :span="6">
        <el-input placeholder="请输入用户手机号码" v-model="listData.search" @change="getSearchList">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="listData.list">
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="UID" prop="uuid"></el-table-column>
      <el-table-column label="用户信息">
        <template slot-scope="scope">
          <span
            v-for="user in userList"
            v-if="user.uuid == scope.row.user_id"
            class="text-blue-500"
          >{{ user.username }} / {{ user.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额">
        <template slot-scope="scope">￥{{ (scope.row.amount / 100).toFixed(2) }}</template>
      </el-table-column>
      <el-table-column label="领取时间">
        <template slot-scope="scope">
          {{
          dateFormat(scope.row.create_time)
          }}
        </template>
      </el-table-column>
      <el-table-column label="提交审核时间">
        <template slot-scope="scope">
          {{
          scope.row.apply_time ? dateFormat(scope.row.apply_time) : "-"
          }}
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == -1" class="text-gray-500">审核不通过</span>
          <span v-if="scope.row.status == 0">提现卡领取</span>
          <span v-if="scope.row.status == 1" class="text-red-500">未审核</span>
          <span v-if="scope.row.status == 2" class="text-green-500">已完成</span>
        </template>
      </el-table-column>
      <el-table-column align="right" fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status == 1"
            type="danger"
            size="mini"
            plain
            @click="withdrawAuditCancelBtnCkick(scope.row)"
          >审核不通过</el-button>
          <el-button
            v-if="scope.row.status == 1"
            type="success"
            size="mini"
            plain
            @click="withdrawAuditConfirmBtnClick(scope.row)"
          >审核通过</el-button>
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
      title: "提现管理"
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
        let dataRet = await apis.getWithdrawList(data);
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
    getRefreshList() {
      this.listData.list = [];
      this.listData.count = 0;
      this.getListData().then(() => {
        this.getUserList();
      });
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
    async withdrawAuditCancelBtnCkick(item) {
      let data = {
        id: item.id,
        status: -1,
        remark: ""
      };
      try {
        let res = await this.$prompt("请输入审核不通过理由", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
        console.log("/withdrawAuditCancelBtnCkick:", res);
        data.remark = res.value;
      } catch (err) {
        return;
      }

      if (!data.remark) {
        this.$message.error("请输入不通过理由");
        return;
      }

      try {
        let auditRet = await apis.withdrawAudit(data);
        if (auditRet.code === 0) {
          this.$message("提交成功");
          this.getRefreshList();
        } else {
          throw new Error(auditRet.message);
        }
      } catch (err) {
        this.$message.error(err.message || err);
      }
    },
    async withdrawAuditConfirmBtnClick(item) {
      let data = {
        id: item.id,
        status: 2,
        remark: ""
      };
      try {
        let res = await this.$confirm("审核通过，提现到用户支付宝?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        console.log("/withdrawAuditCancelBtnCkick:", res);

        if (res !== "confirm") {
          return;
        }
      } catch (err) {
        return;
      }

      try {
        let auditRet = await apis.withdrawAudit(data);
        if (auditRet.code === 0) {
          this.$message("提交成功");
          this.getRefreshList();
        } else {
          throw new Error(auditRet.message);
        }
      } catch (err) {
        this.$message.error(err.message || err);
      }
    }
  },
  created() {
    this.getListData().then(() => {
      this.getUserList();
    });

    this.$store.commit("subNavIndexSet", "6");
  }
};
</script>
