<template>
  <div>
    <h2>{{ pageName }}</h2>
    <h3 v-if="Apptoken == ''" @click="toLogin()">你还没有登录哦</h3>
    <div v-else-if="goodsList != ''">
      <table>
        <thead>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>商品描述</th>
          <th>数量</th>
          <!-- 这里的数量是在购物车中的数量 -->
          <th>价格</th>
          <th>操作</th>
        </thead>
        <tr v-for="(item, index) in goodsList" :key="item.goodId" :index="index + ''">
          <td class="goodId">
            <div>{{ item.goodId }}</div>
          </td>
          <td>{{ item.goodName }}</td>
          <td>{{ item.goodDescribe }}</td>
          <td>
            <button @click="decreCount(index)">-</button>
            <!--这里获取到的index是v-for循环出的goodList数组的下标，以此传到方法中获取对应的count-->
            <!--如果这里写item.index，获取到的就是数组对象中的index，但是数组对象中没有index（有也行，但是不合理）-->
            {{ item.goodNumber }}
            <button @click="increCount(index)">+</button>
          </td>
          <td>￥{{ item.goodPrice }}</td>
          <td><button @click="remove(index)">移除</button></td>
        </tr>

      </table>
      <div style="display: block;width: 350px;height: 100px;margin: auto;">
        <h3>总价：{{ toPrice }}</h3>
        <!-- <button @click="addGood(data)">点击添加商品</button> -->
        <button class="settle" @click="settleAccounts()">结算</button>
      </div>
      <div v-if="isOrder == true">
        请输入收货人姓名：<input type="text" id="name" />
        请输入收货人电话：<input type="text" id="phone" />
        请输入收货地址：<input type="text" id="address">
        请输入备注：<input type="textarea" id="remark">
        <button @click="setOrder()">确认生成订单</button>
      </div>
    </div>
    <h3 v-else>购物车为空</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '购物车',
      goodsList: [],
      isOrder: false,   //是否出现输入框填入用户信息
      userData: {
        consigneeName: '',
        consigneePhone: '',
        consigneeAddress: '',
        consigneeRemark: '',
      },
      orderData: {
        express: '',
        orderState: 0,
      },
      orderList: []   //新订单列表
    };
  },
  props: ['toCartGoodsList', 'Apptoken'],
  computed: {
    toPrice() {
      let totalPrice = 0;
      //const listLength = Object.keys(this.goodsList).length
      for (let i = 0; i < this.goodsList.length; i++) {
        totalPrice += this.goodsList[i].goodNumber * this.goodsList[i].goodPrice;
      }
      return totalPrice.toFixed(2);
    }
  },
  methods: {
    increCount(index) {
      this.goodsList[index].goodNumber++;
    },
    decreCount(index) {
      this.goodsList[index].goodNumber--;
      if (this.goodsList[index].goodNumber == 0)
        this.remove(index);
    },
    remove(index) {
      console.log(this.goodsList);
      this.goodsList.splice(index, 1);
      console.log(this.goodsList);
      this.$emit("updateCart", true);
    },
    addGood(good) {
      let tag = false;  //标记，当前加入的商品的是否与列表中已经存在的商品相同

      for (let i = 0; i < this.goodsList.length; i++) {   //遍历数组看
        if (good.id == this.goodsList[i].goodId) {    //有相同id
          this.goodsList[i].goodNumber++;
          tag = true;
        }
      }

      if (tag == false) {
        this.goodsList.push(good);
      }

      this.$emit("updateCart", true);
    },
    toLogin() {
      this.$router.replace({ path: '/login' });
    },
    loadAll() {
      return this.toCartGoodsList;
    },
    settleAccounts() {   //点击后可输入买家信息
      //console.log('结算购物车并生成订单');
      this.isOrder = true;
    },
    setOrder() {    //拼接信息生成订单，并将新生成的订单发出
      //存储填入的信息到userData对象中
      this.userData.consigneeName = document.getElementById("name").value;
      this.userData.consigneePhone = document.getElementById("phone").value;
      this.userData.consigneeAddress = document.getElementById("address").value;
      this.userData.consigneeRemark = document.getElementById("remark").value;

      //订单状态与快递，快递等待商家填写，订单状态默认为1
      //0订单不存在； 1订单生成，等待发货； 2订单已发货，等待收货； 3订单已确认收货（订单完成）； 看后续添加商品评价，3确认收货待评价，4评价成功商家可回复，5订单完成
      this.orderData.orderState = '1';

      //将商品信息存入订单列表，然后给列表增加买家信息→这个会是浅拷贝，形成bug
      let orderId = 0;
      for (let i = 0; i < this.goodsList.length; i++) {
        //this.goodsList[i].goodId = this.goodsList[i].id;    //用good来存储原本来自商品列表的商品id
        //this.orderList[i] = copy(this.goodsList[i]);
        orderId = i + 1;
        this.goodsList[i].goodCount -= this.goodsList[i].goodNumber;
        //console.log(this.goodsList[i]);
        //console.log(this.goodsList[i]);
        let temp = { ...this.goodsList[i], ...this.userData, ...this.orderData, orderId };   //对象拼接,temp用于存储拼接的对象
        this.orderList.unshift(temp);   //将该对象存入订单列表

        //this.orderList[i] = this.goodsList[i];    //这里是浅拷贝，两个数组指向的地址相同，因此修改goods的id也会修改order的id
        //this.orderList.unshift(this.goodsList[i]);
      }
      //将对象与商品列表信息发送给订单页面

      // this.$emit("addOrderUserData", this.userData);   //对象
      // this.$emit("addOrderGoodsList", this.goodsList);   //数组
      //要发送两个数据，用两个emit  用个屁

      this.$emit("addOrder", this.orderList);//订单列表
      //console.log(this.orderList);

      //清空购物车信息
      //this.goodsList = '';
      //this.userData = '';
      //this.orderList = '';
      this.goodsList.splice(0, this.goodsList.length);
    }
  },
  mounted() {
    this.goodsList = this.loadAll();
  }
}
</script>

<style>
thead {
  background-color: rgb(57, 66, 125);
}

thead th {
  padding: 0 5px;
  margin: 10px;
  border: 0;
  color: rgb(223, 215, 179);
  font-size: small;
  font-weight: 270;
}

table {
  border: 1px solid #F1CCD5;
  box-shadow: 0 0 10px #F1CCD5;
  text-align: center;
  position: relative;
  margin: auto;
  border-collapse: collapse;
  min-width: 1000px;
}

table tr {
  /* border-button: 1px solid #ccc; */
  border-left: 1px solid rgb(223, 215, 179);
  border-right: 1px solid rgb(223, 215, 179);
  border-bottom: 1px dashed rgb(57, 66, 125);
  background-color: white;
}

.goodId {
  border-bottom: 1px dashed white;
}

.goodId div {
  border: 1px solid #F1CCD5;
  background-color: #F1CCD5;
  border-radius: 100%;
  line-height: 44px;
  width: 40px;
  height: 40px;
  margin: auto;
}

h3 {
  display: block;
  float: left;
}

.settle {
  display: block;
  width: 86px;
  height: 60px;
  float: right;
  margin-top: 20px;
}
</style>