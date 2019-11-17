<template>
  <div>
    <el-table :data="listData.list">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.cover" style="height:40px" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="title"></el-table-column>
      <el-table-column label="sku" prop="sku_id"></el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>

      <el-table-column label="售卖价格">
        <template slot-scope="scope">
          <span class="text-red-500">￥{{(scope.row.price / 100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="成本">
        <template slot-scope="scope">
          <span class="text-red-500">￥{{(scope.row.price_cost / 100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格">
        <template slot-scope="scope">
          <span class>￥{{(scope.row.price_market / 100).toFixed(2)}}</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input v-model="listData.search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
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
      title: "商品管理"
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
        let dataRet = await apis.getGoodsList(data);
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