<template>
  <div>
    <h2>{{ pageName }}</h2>
    <h3 v-if="Apptoken == ''" @click="toLogin()">你还没有登录哦</h3>
    <table v-else-if="ordersList != ''">
      <thead>
        <th>订单编号</th>
        <th>商家编号</th>
        <th>商品名称</th>
        <th>商品单价</th>
        <th>商品数量</th>
        <th>商品总价</th>
        <th>收货人姓名</th>
        <th>收货人电话</th>
        <th>收货地址</th>
        <th>备注</th>
        <th>快递</th>
        <th>订单状态</th>
        <th>操作</th>
      </thead>
      <tr v-for="(item, index) in ordersList" :key="item.id" :label="index">
        <td class="orderId">
          <div>{{ item.orderId }}</div>
        </td>
        <td>{{ item.merchantId }}</td>
        <td>{{ item.goodName }}</td>
        <td>{{ item.goodPrice }}</td>
        <td>{{ item.goodNumber }}</td>
        <td>{{ multiPrice(index) }}</td>
        <td>{{ item.consigneeName }}</td>
        <td>{{ item.consigneePhone }}</td>
        <td>{{ item.consigneeAddress }}</td>
        <td>{{ item.consigneeRemark }}</td>
        <td>{{ item.express }}</td>
        <td>{{ orderstate(index) }}</td>
        <td>
          <button v-if="item.orderState == 1" disabled>待发货</button>
          <button v-if="item.orderState == 2" @click="receipt(item)">确认收货</button>
        </td>
      </tr>
    </table>
    <div v-else>你还没有订单哦</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '订单',
      //newOrder: '',   //新的订单信息，内容由userData和goodList组成
      //ordersList: ''      //存储父组件发送来的订单信息
      //userData: '',    //存储父组件传来的新的用户信息
      //goodsList: ''    //存储父组件传来的新的商品列表
    };
  },
  //props: ['OrderUserData', 'OrderGoodsList', 'newOrderList'],
  props: ['ordersList', 'Apptoken'],
  methods: {
    multiPrice(index) {    //计算同种商品总价
      let price = this.ordersList[index].goodPrice * this.ordersList[index].goodNumber;
      return price.toFixed(2);
    },
    orderstate(index){
      if(this.ordersList[index].orderState == 1){
        return '待发货'
      }else if(this.ordersList[index].orderState ==2){
        return '待收货'
      }else {
        return '订单完成'
      }
    },
    toLogin() {
      this.$router.replace({ path: '/login' });
    },
    // loadUserData() {
    //   return this.OrderUserData;
    // },
    // loadGoodsList() {
    //   return this.OrderGoodsList;
    // },
    // loadNewOrder() {
    //   return this.newOrderList;
    // },
    // loadOrdersList() {
    //   //console.log(this.OrdersList);
    //   return this.OrdersList;    //是个数组
    // },
    // addNewOrder() {
    //   console.log("增加新订单");
    //   for (let i = 0; i < this.newOrder.length; i++) {
    //     this.ordersList.unshift(this.newOrder[i]);
    //   }
    //   return this.ordersList;
    // }
    receipt(order){
      this.$emit("userChangeState",order);
      order.orderState = 3;   //确认收获
    },
  },
  // mounted() {
  //   //this.userData = this.loadUserData();
  //   //this.goodsList = this.loadGoodsList();
  //   //this.newOrder = this.loadNewOrder();
  //   this.ordersList = this.loadOrdersList();
  //   //this.ordersList = this.addNewOrder();   //这个由App.vue实现
  // }
}
</script>

<style scoped>
table {
  border: 1px solid #F1CCD5;
  box-shadow: 0 0 10px #F1CCD5;
  text-align: center;
  margin: 0 auto;
  border-collapse: collapse;
}

table tr {
  /* border-button: 1px solid #ccc; */
  border-left: 1px solid rgb(223, 215, 179);
  border-right: 1px solid rgb(223, 215, 179);
  border-bottom: 1px dashed rgb(57, 66, 125);
  background-color: white;
}

thead {
  background-color: rgb(57, 66, 125);
}

thead th {
  padding: 0 5px;
  margin: 0;
  border: 0;
  color: rgb(223, 215, 179);
  font-size: small;
  font-weight: 270;
}

.orderId {
  border-bottom: 1px dashed white;
}

.orderId div {
  border: 1px solid #F1CCD5;
  background-color: #F1CCD5;
  border-radius: 100%;
  line-height: 44px;
  width: 40px;
  height: 40px;
  margin: auto;
}
</style>

<!-- 点击购物车页面的结算，将信息发送到订单页面并加入订单列表 -->