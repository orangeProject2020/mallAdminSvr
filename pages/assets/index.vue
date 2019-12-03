<template>
  <div>
    <el-row class="mt-4">
      <el-col :span="6">
        <el-input
          placeholder="请输入用户手机号码"
          v-model="listData.search"
          @change="getSearchList"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
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
            >{{ user.username }} / {{ user.mobile }}</span
          >
        </template>
      </el-table-column>

      <el-table-column label="分红剩余金额">
        <template slot-scope="scope"
          >￥{{ (scope.row.balance / 100).toFixed(2) }}</template
        >
      </el-table-column>
      <el-table-column label="平台分红积分剩余">
        <template slot-scope="scope"
          >￥{{ (scope.row.profit / 100).toFixed(2) }}</template
        >
      </el-table-column>
      <el-table-column label="平台分红开始日期">
        <template slot-scope="scope">{{ scope.row.profit_date }}</template>
      </el-table-column>
      <el-table-column label="分红等级" prop="profit_level"> </el-table-column>
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
      title: "用户资产"
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

      if (this.listData.search) {
        let search = this.listData.search;
        if (search.length > 20) {
        } else if (search.length == 11) {
          data.user_id = this.searchUserId;
        } else if (search.length < 11) {
          data.id = search;
        }
      }

      try {
        let dataRet = await apis.getAssetsList(data);
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

    this.$store.commit("subNavIndexSet", "7");
  }
};
</script>
