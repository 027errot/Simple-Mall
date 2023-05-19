<template>
  <div>
    <h2>{{ pageName }}</h2>
    <button @click="goBack()">上一级</button>
    <div class="details">
      <div class="top">
        <div class="left">
          <h2>{{ good.goodId }}</h2>
        </div>
        <ul class="right">
          <li>商品名称：{{ good.goodName }}</li>
          <li>单价：{{ good.goodPrice }}</li>
          <li>剩余数量：{{ good.goodCount }}</li>
          <!-- <li>发货地址：{{ good.address }}</li> -->
        </ul>
      </div>
      <p class="describe">商品详情：{{ good.goodDescribe }}</p>
    </div>
    <button @click="enterToCart(good.goodId)">加入购物车</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '商品详情页',
      good: ''
      // good: {
      //   id: 256,
      //   name: '机械键盘',
      //   price: 257,
      //   describe: '达尔优牧马人86键三模',
      //   count: 127,
      //   address: '福建福州'
      // }
    };
  },
  props: ['toDetailsGood', 'Apptoken'],
  methods: {
    goBack() {
      this.$router.push('/');
    },
    enterToCart(index) {
      //判断是否登录，获取token值
      if (this.Apptoken) {
        //加购商品
        console.log("将" + this.good.goodName + "加入购物车");
        this.$emit("addNewGood", this.good);
      } else {
        //跳转到登录页面
        console.log("需要先登录");
        this.$router.replace({ path: '/login' });
      }
      console.log("添加商品跳转页面");
      console.log(index);
    },
    load() {
      return this.toDetailsGood;
    }
  },
  mounted() {
    this.good = this.load();
  }
}
</script>

<style scoped>
h2,
p {
  margin: 0;
  padding: 0;
}

ul {
  margin: 0;
  /* margin-left: 10px; */
  padding: 0 5px;
}

li {
  list-style-type: none;
  background-color: rgba(255, 250, 202, 0.7);
  margin: 13.25px;
  padding: 0 7px;
  /* padding-right: 20px; */
  border-left: 1px dashed #F1CCD5;
  border-radius: 5px;
}

.details {
  width: 500px;
  height: 309px;
  border: 1px solid gray;
  border-radius: 5px;
  margin: auto;
  padding: 10px;
  background-color: white;
}

.top {
  width: 500px;
  height: 202px;
}

.left {
  width: 125px;
  height: 202px;
  border-right: 1px dashed white;
  border-radius: 15px;
  background-color: rgba(57, 66, 125, 0.9);
  color: white;
  text-align: center;
  line-height: 202px;
  float: left;
}

.right {
  width: 350px;
  height: 202px;
  background-color: #F1CCD5;
  color: #656565;
  border-bottom: 1px dashed white;
  border-radius: 10px;

  float: right;
  line-height: 50px;
  text-align: left;
  padding: 0 7px;
}

.describe {
  text-align: left;
  padding: 20px;
  margin-top: 10px;
  background-color: #FDC9B5;
  color: #656565;
  border: 1px dashed white;
  border-radius: 7px;
}
</style>