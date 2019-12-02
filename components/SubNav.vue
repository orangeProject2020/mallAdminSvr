<template>
  <div>
    <el-menu :default-active="$store.state.subNavIndex" mode="horizontal">
      <el-menu-item index="0">
        <router-link to="/">数据概览</router-link>
      </el-menu-item>
      <el-menu-item index="1">
        <router-link to="/order">订单管理</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/payment">账单管理</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/goods/list">商品管理</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/goods/category">商品分类</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/profit">分红记录</router-link>
      </el-menu-item>
      <el-menu-item index="6">
        <router-link to="/goods/category">提现记录</router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link to="/goods/category">交易流水</router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>