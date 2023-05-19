<template>
  <div>
    <h2>{{ pageName }}</h2>
    <el-menu>
      <el-submenu v-for="(item, index) in list" :key="index" :index="item.name">
        <template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
        <router-link :to="item.url" label="item.name">
          <i class="item.icon"></i>
          <el-menu-item :label="item.label">{{ item.label }}</el-menu-item>
        </router-link>
      </el-submenu>

    </el-menu>
    <!-- <button @click="$router.replace({path: '/login'})">退出到前台</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: "Merchant",
      list: [
        {
          name: '信息管理',
          url: '/merchant/merchantSelf',
          icon: 'el-icon-picture-outline-round',
          label: '修改个人信息'
        },
        {
          name: '商品管理',
          url: '/merchant/merchantGoods',
          icon: 'el-icon-help',
          label: '我的商品'
        },
        {
          name: '订单管理',
          url: '/merchant/merchantOrder',
          icon: 'el-icon-document-copy',
          label: '我的订单'
        }
      ]
    }
  }
}
</script>

<style>
</style>