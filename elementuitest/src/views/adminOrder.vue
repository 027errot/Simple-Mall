<template>
  <div>
    <h2>{{ pageName }}</h2>

    <el-table :data="orderList" border style="width: 100%" v-if="token" :key="tableKey">
      <el-table-column prop="orderId" label="订单id" width="80">
      </el-table-column>
      <el-table-column prop="userId" label="买家id">
      </el-table-column>
      <el-table-column prop="merchantId" label="商家id">
      </el-table-column>
      <el-table-column prop="goodId" label="商品id" width="80">
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称" width="80">
      </el-table-column>
      <el-table-column prop="goodNumber" label="商品数量">
      </el-table-column>
      <el-table-column prop="goodPrice" label="商品单价">
      </el-table-column>
      <el-table-column label="订单价格">
        <template slot-scope="scope">{{ toPrice(scope.row) }}</template>
      </el-table-column>
      <el-table-column prop="consigneeName" label="收货人">
      </el-table-column>
      <el-table-column prop="consigneePhone" label="收货人电话" width="120">
      </el-table-column>
      <el-table-column prop="consigneeAddress" label="收货地址">
      </el-table-column>
      <el-table-column prop="consigneeRemark" label="备注">
      </el-table-column>
      <el-table-column prop="express" label="快递">
      </el-table-column>
      <el-table-column prop="orderState" label="订单状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <!--通过scope获取所选行的内容，scope.row是一个对象-->
        </template>
      </el-table-column>
    </el-table>
    <h3 v-else @click="$router.replace({path: '/login'})">未登录管理员</h3>

    <!--编辑订单属性-->
    <el-dialog title="订单信息编辑" :visible.sync="isEditDialog">
      <el-form :model="nowOrder">
        <el-form-item label="商品名称">
          <el-input v-model="nowOrder.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品单价">
          <el-input v-model="nowOrder.goodPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品余量">
          <el-input v-model="nowOrder.goodCount"></el-input>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="totalPrice"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品分类">
          <el-input v-model="nowGood.goodSort"></el-input>
        </el-form-item> -->
        <el-form-item label="收货人">
          <el-input v-model="nowOrder.consigneeName"></el-input>
        </el-form-item>
        <el-form-item label="收货电话">
          <el-input v-model="nowOrder.consigneePhone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="nowOrder.consigneeAddress"></el-input>
        </el-form-item>
        <el-form-item label="快递">
          <el-input v-model="nowOrder.express"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-input v-model="nowOrder.orderState"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditDialog = false">取消</el-button>
        <el-button @click="updateNowOrder()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  data() {
    return {
      pageName: '管理员订单管理',
      tableKey: 0,
      isEditDialog: false,
      nowOrder: '',
      orderList: []
    }

  },
  // computed:{
  //   toPrice(order){
  //     let price = order.goodCount * order.goodPrice;
  //     return price.toFixed(2);
  //   }
  // },
  props: ["adminOrderList","token"],
  methods: {
    toPrice(order) {
      let price = order.goodNumber * order.goodPrice;
      return price.toFixed(2);
    },
    edit(order) {
      //console.log(order);
      this.nowOrder = order;
      this.isEditDialog = true;
    },
    updateNowOrder() {
      //发送事件
      //console.log(this.nowOrder);
      this.$emit("updateAdminOrder",this.nowOrder);
      this.isEditDialog = false;
      this.tableKey += 1;
    },
    loadOrderList() {
      //console.log(this.adminOrderList);
      return this.adminOrderList
    }
  },
  computed: {
    totalPrice() {
      let total = this.nowOrder.goodNumber * this.nowOrder.goodPrice;
      return total.toFixed(2);
    }
  },
  mounted() {
    this.orderList = this.loadOrderList();
  }
}
</script>