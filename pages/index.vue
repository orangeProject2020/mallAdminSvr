<template>
  <div>
    <el-row class="rounded bg-indigo-600 text-white mt-4">
      <el-col :span="12">
        <div class="p-4">
          <div class="text-6xl">今日:</div>
          <div class="mt-4">
            <el-row class="text-center">
              <el-col :span="4">
                <div>未付款</div>
                <div class="text-5xl">{{todayData.create}}</div>
              </el-col>
              <el-col :span="4">
                <div>已付款</div>
                <div class="text-5xl">{{todayData.payment}}</div>
              </el-col>
              <el-col :span="4">
                <div>已发货</div>
                <div class="text-5xl">{{todayData.complete}}</div>
              </el-col>
              <el-col :span="4">
                <div>已完成</div>
                <div class="text-5xl">{{todayData.finish}}</div>
              </el-col>
              <el-col :span="4">
                <div>已取消</div>
                <div class="text-5xl">{{todayData.cancel}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="p-4">
          <div class="text-6xl">总计:</div>
          <div class="mt-4">
            <el-row class="text-center">
              <el-col :span="4">
                <div>未付款</div>
                <div class="text-5xl">{{totalData.create}}</div>
              </el-col>
              <el-col :span="4">
                <div>已付款</div>
                <div class="text-5xl">{{totalData.payment}}</div>
              </el-col>
              <el-col :span="4">
                <div>已发货</div>
                <div class="text-5xl">{{totalData.complete}}</div>
              </el-col>
              <el-col :span="4">
                <div>已完成</div>
                <div class="text-5xl">{{totalData.finish}}</div>
              </el-col>
              <el-col :span="4">
                <div>已取消</div>
                <div class="text-5xl">{{totalData.cancel}}</div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="text-center p-4 mt-8">
      <el-col :span="12">
        <div class="inline-block border-b p-4">
          <span class="text-gray-500">今日成交金额</span>
        </div>
        <div class="text-red-700 text-6xl">￥{{(paymentData.today / 100).toFixed(2)}}</div>
      </el-col>
      <el-col :span="12">
        <div class="inline-block border-b p-4">
          <span class="text-gray-500">总成交金额</span>
        </div>
        <div class="text-red-700 text-6xl">￥{{(paymentData.total / 100).toFixed(2)}}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import apis from "@/assets/js/apis";
export default {
  head() {
    return {
      title: "数据概览"
    };
  },
  data() {
    return {
      todayData: {
        create: 0,
        payment: 0,
        complete: 0,
        finish: 0,
        cancel: 0
      },
      totalData: {
        create: 0,
        payment: 0,
        complete: 0,
        finish: 0,
        cancel: 0
      },
      paymentData: {
        today: 0,
        total: 0
      }
    };
  },
  computed: {},
  async fetch({ store, params }) {},
  methods: {
    async getStatisticsTodayData() {
      let statisticsTodayRet = await apis.statisticsTodayData();
      console.log(
        "/getStatisticsTodayData getStatisticsTodayData:",
        statisticsTodayRet
      );
      if (statisticsTodayRet.code === 0) {
        let statisticsTodayData = statisticsTodayRet.data;
        this.todayData.create = statisticsTodayData.count_create;
        this.todayData.payment = statisticsTodayData.count_payment;
        this.todayData.complete = statisticsTodayData.count_complete;
        this.todayData.finish = statisticsTodayData.count_finish;
        this.todayData.cancel = statisticsTodayData.count_cancel;
        this.totalData.create = statisticsTodayData.total_create;
        this.totalData.payment = statisticsTodayData.total_payment;
        this.totalData.complete = statisticsTodayData.total_complete;
        this.totalData.finish = statisticsTodayData.total_finish;
        this.totalData.cancel = statisticsTodayData.total_cancel;
        this.paymentData.today = statisticsTodayData.payment_count;
        this.paymentData.total = statisticsTodayData.payment_total;
      }
    }
  },
  created() {
    this.getStatisticsTodayData();
    this.$store.commit("subNavIndexSet", "0");
  }
};
</script>