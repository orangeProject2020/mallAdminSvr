<template>
  <div>
    <el-table :data="listData.list">
      <el-table-column label="标识" prop="name"></el-table-column>
      <el-table-column label="分类名称" prop="title"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" class="text-gray-500">禁用</span>
          <span v-if="scope.row.status == 1" class="text-green-500">正常</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-button size="mini" type="primary" @click="categorAddBtnClick">添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="categorUpdateBtnClick(scope.row)"
          >查看 / 编辑</el-button>
          <el-button size="mini" type="danger" @click="categoryDeleteBtnClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="商品分类添加 / 编辑" :visible.sync="dialogCategoryUpdateVisible">
      <el-form
        :model="categoryData"
        label-width="100px"
        :rules="rulesCategoryUpdate"
        ref="formCategoryUpdate"
      >
        <el-form-item label="分类标识" prop="name">
          <el-input v-model="categoryData.name"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="title">
          <el-input v-model="categoryData.title"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="categoryData.sort" :min="0" label></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="categoryData.status" :label="1">正常</el-radio>
          <el-radio v-model="categoryData.status" :label="0">禁用</el-radio>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsUpdateVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="categoryInfoUpdate"
          :disabled="categoryInfoUpdateBtn.disabled"
        >确定</el-button>
      </div>
    </el-dialog>
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
      },
      categoryData: {
        id: 0,
        name: "",
        title: "",
        status: 0,
        sort: 0
      },
      rulesCategoryUpdate: {},
      dialogCategoryUpdateVisible: false,
      categoryInfoUpdateBtn: {
        disabled: false
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
    },
    async getListRefresh() {
      this.listData.list = [];
      this.listData.count = 0;
      this.getListData();
    },
    categorAddBtnClick() {
      this.categoryData = {
        id: 0,
        name: "",
        title: "",
        status: 0,
        sort: 0
      };

      this.dialogCategoryUpdateVisible = true;
    },
    categorUpdateBtnClick(item) {
      Object.keys(this.categoryData).forEach(key => {
        if (item.hasOwnProperty(key)) {
          this.categoryData[key] = item[key];
        }
      });

      this.dialogCategoryUpdateVisible = true;
    },
    async categoryDeleteBtnClick(item) {
      try {
        let confirm = await this.$confirm(
          "此操作将永久删除该分类, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );
        console.log("/categoryDeleteBtnClick confirm", confirm);
        if (confirm !== "confirm") {
          return;
        }
      } catch (err) {
        console.error("/categoryDeleteBtnClick err:", err.message || err);
        return;
      }

      let data = Object.assign({}, item);
      data.status = -1;
      try {
        let updateRet = await apis.categoryDataUpdate(data);

        if (updateRet.code !== 0) {
          throw new Error(updateRet.message);
        }

        this.$message.success("更新商品数据成功");
        this.getListRefresh();
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async categoryInfoUpdate() {
      let valid = await this.$refs.formCategoryUpdate.validate();
      console.log("/categoryInfoUpdate valid:", valid);
      if (valid !== true) {
        return;
      }

      let data = Object.assign({}, this.categoryData);
      console.log("/goodsInfoUpdate data:", data);
      this.categoryInfoUpdateBtn.disabled = true;
      try {
        let updateRet = await apis.categoryDataUpdate(data);
        if (updateRet.code !== 0) {
          throw new Error(updateRet.message);
        }

        this.$message.success("更新商品分类数据成功");
        this.getListRefresh();
      } catch (err) {
        this.$message.error(err.message);
      }

      this.categoryInfoUpdateBtn.disabled = false;
      this.dialogCategoryUpdateVisible = false;
    }
  },
  created() {
    this.getListData();
  }
};
</script>