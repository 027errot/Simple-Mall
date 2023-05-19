<template>
  <div>
    <h2>basic</h2>
    <el-menu :default-openeds="['2']">

      <el-submenu v-for="(item, index) in navName" :key="index" :index="item.name">
        <!-- 若写成:index="index+''"，则加上''是为了让index是一个String类型 -->
        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
        <el-menu-item-group>
          <router-link :to="item.url">
            <el-menu-item :index="item.icon" :label="item.name">{{ item.name }}</el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <!-- <router-link tag="a" target="_blank" to="/admin">商家登录</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      navName: [
        {
          title: '个人中心',
          name: '信息修改',
          icon: 'el-icon-user-solid',
          url: '/mySelf'
        },
        {
          title: '首页',
          name: '首页',
          icon: 'el-icon-star-off',
          url: '/'
        },{
          title: '购物车',
          name: '购物车',
          icon: 'el-icon-shopping-cart-1',
          url: '/myCart'
        }, 
        {
          title: '订单中心',
          name: '我的订单',
          icon: 'el-icon-s-goods',
          url: '/myOrder'
        },
        {
          title: '设置',
          name: '设置',
          icon: 'el-icon-setting',
          url: '/mySetting'
        }
      ]
    };
  }
}
</script>

<style scoped>
</style>