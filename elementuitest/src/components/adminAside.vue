<template>
  <div>
    <h2>{{ pageName }}</h2>
    <el-menu>
      <el-submenu v-for="(item, index) in list" :key="index" :index="item.name">
        <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
          <i class="item.icon"></i>
          <el-menu-item :label="item.label" v-for="(children, index) in item.children" :key="index">
            <router-link :to="children.url" label="item.name" > {{ children.label }}</router-link>
          </el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: 'Admin',
      list: [
        {
          name: '账户管理',
          icon: 'el-icon-user',
          children: [
            {
              label: '用户账号管理',
              url: '/admin/adminAccount/User',
            }, {
              label: '商家账号管理',
              url: '/admin/adminAccount/Merchant'
            }
          ]
        }, {
          name: '商品管理',
          icon: 'el-icon-goods',
          children: [
            {
              label: '商品信息管理',
              url: '/admin/adminGood'
            }
          ]
        }, {
          name: '订单管理',
          icon: 'el-icon-s-order',
          children: [
            {
              label: '订单信息管理',
              url: '/admin/adminOrder'
            }
          ]
        },
      ]
    }
  },
  filters: {
    second(value) {
      if (value) {
        return value;
      } else {
        return value.children
      }
    }
  }
}
</script>