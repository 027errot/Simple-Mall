<template>
  <div>
    <h2>{{ pageName }}</h2>

    <el-table :data="ordersList" stripe style="width: 100%" v-if="token != ''" :key="tableKey">
      <el-table-column prop="orderId" label="订单id">
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称">
      </el-table-column>
      <el-table-column label="订单总价">
        <template slot-scope="scope">
          {{ toPrice(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column prop="express" label="快递">
      </el-table-column>
      <el-table-column prop="consigneeName" label="收件人">
      </el-table-column>
      <el-table-column prop="consigneePhone" label="收件人电话">
      </el-table-column>
      <el-table-column prop="consigneeAddress" label="收件人地址">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.orderState == 1" @click="deliver(scope.row.orderId)">发货</el-button>
          <el-button v-else-if="scope.row.orderState == 2" disabled>待收货</el-button>
        </template>
      </el-table-column>
    </el-table>

    <h3 v-else @click="$router.replace({ path: '/login' })">请登录商家账户</h3>
  </div>
</template>

<script>

export default {
  data() {
    return {
      pageName: '订单管理',
      tableKey: 0,
      ordersList: []
    }
  },
  props: ["merchantOrdersList", "orderLastId", 'merchant_token'],
  methods: {
    deliver(orderId) {
      console.log(orderId);
      //console.log("输入快递单号后发货该订单");
      this.$prompt('请输入快递单号', '发货', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        //获取对应订单对象
        for (let i = 0; i < this.ordersList.length; i++) {
          if (this.ordersList[i].orderId == orderId) {
            let temp = this.ordersList[i];
            temp.express = value;
            this.$emit("merchantChangeState", temp);
            temp.orderState = 2;
            //this.ordersList[i].express = value;
            //this.ordersList[i].orderState = 2;
            //console.log(this.ordersList[i]);
            //this.tableKey++;
          }
        }

      })
      //发货成功

      //修改订单的状态
    },
    toPrice(order) {
      let countPrice = order.goodNumber * order.goodPrice;
      return countPrice.toFixed(2);
    },
    loadOrdersList() {
      console.log(this.merchantOrdersList);
      return this.merchantOrdersList;
    }

  },
  computed: {
    token() {
      return this.merchant_token;
    }
  },
  mounted() {
    this.ordersList = this.loadOrdersList();
  }
}
</script>