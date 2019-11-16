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
          <el-button type="warning" plain size="small" v-if="scope.row.status == 0">取消</el-button>
          <el-button
            type="danger"
            plain
            size="small"
            v-if="scope.row.status == 0"
            class="text-red-600"
          >付款</el-button>
          <el-button type="text" size="small" v-if="scope.row.status == 1">发货</el-button>
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
    }
  },
  created() {
    this.getList();
  }
};
</script>