<template>
  <div>
    <el-menu :default-active="$store.state.subNavIndex" mode="horizontal">
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
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>