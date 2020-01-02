<template>
  <div>
    <el-table :data="listData.list">
      <el-table-column prop="id">
        <template slot="header">
          <el-button type="primary" size="mini" @click="goodsAddBtnClick">添加</el-button>
        </template>
      </el-table-column>
      <el-table-column label="sku" prop="sku_id"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.thumb || scope.row.cover " style="height:40px" />
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="title"></el-table-column>
      <el-table-column label="分类">
        <template slot-scope="scope">
          <span v-for="item in categorys" v-if="item.id == scope.row.category_id">{{ item.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="stock"></el-table-column>
      <el-table-column label="销量" prop="sales"></el-table-column>
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
      <el-table-column label="推荐">
        <template slot-scope="scope">
          <span v-if="scope.row.is_recommend == 1">
            <i class="el-icon-check"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="新品">
        <template slot-scope="scope">
          <span v-if="scope.row.is_new == 1">
            <i class="el-icon-check"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="套餐">
        <template slot-scope="scope">
          <span v-if="scope.row.package_level > 0">
            <span
              v-for="item in packageLevels"
              v-if="item.id == scope.row.package_level"
              :key="item.id"
            >{{item.title}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort"></el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0" class="text-gray-500">未上架</span>
          <span v-if="scope.row.status == 1" class="text-green-500">已上架</span>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="listData.search"
            size="mini"
            placeholder="输入关键字搜索"
            class="inline-block"
            @change="getLsitSearch"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="goodsUpdateBtnClick(scope.row)"
          >查看 / 编辑</el-button>
          <el-button size="mini" type="danger" @click="goodsDeleteBtnClick(scope.row)">删除</el-button>
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

    <el-dialog title="商品添加 / 编辑" :visible.sync="dialogGoodsUpdateVisible">
      <el-form
        :model="formGoodsData"
        label-width="100px"
        :rules="rulesFormGoodsUpdate"
        ref="formGoodsUpdate"
      >
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="formGoodsData.title"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="formGoodsData.category_id" placeholder="请选择">
            <el-option
              v-for="item in categorys"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-radio v-model="formGoodsData.status" :label="1">已上架</el-radio>
          <el-radio v-model="formGoodsData.status" :label="0">未上架</el-radio>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="formGoodsData.description"
          ></el-input>
        </el-form-item>
        <div class="flex flex-wrap">
          <el-form-item label="货号" class="flex-1" prop="sku_id">
            <el-input v-model="formGoodsData.sku_id"></el-input>
          </el-form-item>
          <el-form-item label="库存" class="flex-1">
            <el-input-number v-model="formGoodsData.stock" :min="-1" label="-1代表无限库存"></el-input-number>
          </el-form-item>
          <el-form-item label="销售量" class="flex-1">
            <el-input-number v-model="formGoodsData.sales" :min="0" label></el-input-number>
          </el-form-item>
        </div>

        <div class="flex flex-wrap">
          <el-form-item label="售卖价格" class="flex-1">
            <el-input-number v-model="formGoodsData.price" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="成本价格" class="flex-1">
            <el-input-number v-model="formGoodsData.price_cost" :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="市场价格" class="flex-1">
            <el-input-number v-model="formGoodsData.price_market" :precision="2"></el-input-number>
          </el-form-item>
        </div>

        <el-form-item label="是否推荐">
          <el-radio v-model="formGoodsData.is_recommend" :label="1">是</el-radio>
          <el-radio v-model="formGoodsData.is_recommend" :label="0">否</el-radio>
        </el-form-item>

        <el-form-item label="是否新品">
          <el-radio v-model="formGoodsData.is_new" :label="1">是</el-radio>
          <el-radio v-model="formGoodsData.is_new" :label="0">否</el-radio>
        </el-form-item>

        <el-form-item label="男用or女用">
          <el-radio v-model="formGoodsData.type_sub" :label="0">无</el-radio>
          <el-radio v-model="formGoodsData.type_sub" :label="1">男用</el-radio>
          <el-radio v-model="formGoodsData.type_sub" :label="2">女用</el-radio>
        </el-form-item>

        <div class="flex flex-wrap">
          <el-form-item label="套餐等级" class="flex-1">
            <el-select v-model="formGoodsData.package_level" placeholder="请选择">
              <el-option
                v-for="item in packageLevels"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="赠送分红限额" class="flex-1">
            <el-input-number v-model="formGoodsData.package_profit" :min="0" label :precision="2"></el-input-number>
          </el-form-item>
          <el-form-item label="排序" class="flex-1">
            <el-input-number v-model="formGoodsData.sort" :min="0" label></el-input-number>
          </el-form-item>
          <div class="flex flex-wrap">
            <el-form-item label="封面缩略图">
              <el-upload
                class="upload-demo"
                :action="uploadSingleAction"
                :on-preview="handlePreviewThumb"
                :on-remove="handleRemoveThumb"
                :on-success="handSuccessThumb"
                :file-list="fileListThumb"
                list-type="picture"
                :multiple="false"
                name="photo"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="封面大图">
              <el-upload
                class="upload-demo"
                :action="uploadSingleAction"
                :on-preview="handlePreviewCover"
                :on-remove="handleRemoveCover"
                :on-success="handSuccessCover"
                :file-list="fileListCover"
                list-type="picture"
                :multiple="false"
                name="photo"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogGoodsUpdateVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="goodsInfoUpdate"
          :disabled="goodsInfoUpdateBtn.disabled"
        >确 定</el-button>
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
      title: "商品管理"
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
      categorys: [],
      dialogGoodsUpdateVisible: false,
      goodsInfoUpdateBtn: {
        disabled: false
      },
      formGoodsData: {
        id: 0,
        title: "",
        category_id: "",
        description: "",
        sku_id: "",
        stock: 0,
        sales: 0,
        price: 0.0,
        price_cost: 0.0,
        price_market: 0.0,
        is_recommend: 0,
        is_new: 0,
        type_sub: 0,
        package_level: 0,
        package_profit: 0,
        sort: 0,
        thumb: "",
        cover: "",
        pics: [],
        status: 0
      },
      fileListThumb: [],
      fileListCover: [],
      rulesFormGoodsUpdate: {
        title: [
          { required: true, message: "请输入活商品名称", trigger: "blur" }
        ],
        category_id: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        sku_id: [{ required: true, message: "请输入商品货号", trigger: "blur" }]
      },
      packageLevels: [
        { id: 0, title: "不是套餐" },
        { id: 1, title: "A级" },
        { id: 2, title: "B级" },
        { id: 3, title: "C级" },
        { id: 4, title: "D级" }
      ],
      uploadSingleAction: process.env.uploadSingleAction
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
    async getListRefresh() {
      this.listData.list = [];
      this.listData.count = 0;

      this.getListData();
    },
    getLsitSearch() {
      this.listData.list = [];
      this.listData.count = 0;
      this.listData.page = 1;

      this.getListData();
    },
    async getCategorys() {
      let categoryRet = await apis.getGoodsCategoryList({
        limit: 0,
        status: 1
      });
      this.categorys = categoryRet.data.rows;
    },
    pageChange(page) {
      this.listData.list = [];
      this.listData.page = page;
      this.getListData();
    },
    goodsUpdateBtnClick(item) {
      console.log("/goodsUpdateBtnClick item:", item);
      // this.formGoodsData = item;
      Object.keys(this.formGoodsData).forEach(key => {
        if (item.hasOwnProperty(key)) {
          if (key.indexOf("price") > -1 || key == "package_profit") {
            this.formGoodsData[key] = parseFloat((item[key] / 100).toFixed(2));
          } else {
            this.formGoodsData[key] = item[key];
          }
        }
      });

      this.fileListThumb = item.thumb ? [{ name: "", url: item.thumb }] : [];
      this.fileListCover = item.cover ? [{ name: "", url: item.cover }] : [];
      console.log("/goodsUpdateBtnClick formGoodsData:", this.formGoodsData);
      this.dialogGoodsUpdateVisible = true;
    },
    goodsAddBtnClick() {
      this.formGoodsData = {
        id: 0,
        title: "",
        category_id: "",
        description: "",
        sku_id: "",
        stock: 0,
        sales: 0,
        price: 0.0,
        price_cost: 0.0,
        price_market: 0.0,
        is_recommend: 0,
        is_new: 0,
        type_sub: 0,
        package_level: 0,
        package_profit: 0.0,
        sort: 0,
        thumb: "",
        cover: "",
        pics: [],
        status: 0
      };
      this.dialogGoodsUpdateVisible = true;
    },
    async goodsDeleteBtnClick(item) {
      try {
        let confirm = await this.$confirm(
          "此操作将永久删除该商品, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        );
        console.log("/goodsDeleteBtnClick confirm", confirm);
        if (confirm !== "confirm") {
          return;
        }
      } catch (err) {
        console.error("/goodsDeleteBtnClick err:", err.message || err);
        return;
      }

      let data = Object.assign({}, item);
      data.status = -1;
      try {
        let updateRet = await apis.goodsDataUpdate(data);

        if (updateRet.code !== 0) {
          throw new Error(updateRet.message);
        }

        this.$message.success("更新商品数据成功");
        this.getListRefresh();
      } catch (err) {
        this.$message.error(err.message);
      }
    },
    async goodsInfoUpdate() {
      let valid = await this.$refs.formGoodsUpdate.validate();
      console.log("/goodsInfoUpdate valid:", valid);
      if (valid !== true) {
        return;
      }
      let data = Object.assign({}, this.formGoodsData);
      data.price = parseInt(data.price * 100);
      data.price_cost = parseInt(data.price_cost * 100);
      data.price_market = parseInt(data.price_market * 100);
      data.package_profit = parseInt(data.package_profit * 100);
      data.thumb = this.fileListThumb.length ? this.fileListThumb[0].url : "";
      data.cover = this.fileListCover.length ? this.fileListCover[0].url : "";
      console.log("/goodsInfoUpdate data:", data);
      this.goodsInfoUpdateBtn.disabled = true;
      try {
        let updateRet;
        if (data.id) {
          updateRet = await apis.goodsDataUpdate(data);
        } else {
          updateRet = await apis.goodsDataCreate(data);
        }

        if (updateRet.code !== 0) {
          throw new Error(updateRet.message);
        }

        this.$message.success("更新商品数据成功");
        this.getListRefresh();
      } catch (err) {
        this.$message.error(err.message);
      }

      this.goodsInfoUpdateBtn.disabled = false;
      this.dialogGoodsUpdateVisible = false;
    },
    handlePreviewThumb(file, fileList) {
      console.log("/handlePreview file:", file);
      console.log("/handlePreview fileList:", fileList);
    },
    handleRemoveThumb(file) {
      console.log("/handleRemove file:", file);
    },
    handSuccessThumb(res, file, list) {
      console.log("/handSuccessThumb res:", res);
      console.log("/handSuccessThumb file:", file);
      console.log("/handSuccessThumb list:", list);

      this.fileListThumb = [
        {
          name: file.name,
          url: res.data.url
        }
      ];
    },
    handlePreviewCover(file, fileList) {
      console.log("/handlePreviewCover file:", file);
      console.log("/handlePreviewCover fileList:", fileList);
    },
    handleRemoveCover(file) {
      console.log("/handleRemoveCover file:", file);
    },
    handSuccessCover(res, file, list) {
      console.log("/handSuccessCover res:", res);
      console.log("/handSuccessCover file:", file);
      console.log("/handSuccessCover list:", list);

      this.fileListCover = [
        {
          name: file.name,
          url: res.data.url
        }
      ];
    }
  },
  created() {
    this.getListData();
    this.getCategorys();

    this.$store.commit("subNavIndexSet", "3");
  }
};
</script>