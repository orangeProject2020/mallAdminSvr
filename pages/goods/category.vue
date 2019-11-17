<template>
  <div>
    <el-table :data="listData.list">
      <el-table-column label="标识" prop="name"></el-table-column>
      <el-table-column label="分类名称" prop="title"></el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import apis from "@/assets/js/apis";
import utils from "@/assets/js/utils";
export default {
  head() {
    return {
      title: "商品分类"
    };
  },
  data() {
    return {
      listData: {
        list: [],
        page: 1,
        limit: 0,
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
        let dataRet = await apis.getGoodsCategoryList(data);
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