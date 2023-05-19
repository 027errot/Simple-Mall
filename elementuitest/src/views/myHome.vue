<template>
  <div>
    <h2>{{ pageName }}</h2>
    <ul>
      <li v-for="(item, index) in goodsList" :key="item.id" :index="index">
        <router-link :to="'/details/' + item.id">
          <h3 class="title" @click="toDetails(index)">{{ item.goodName }}</h3>
        </router-link>
        <div class="right">
          <p class="describe">{{ item.goodDescribe }}</p>
          <div class="youxia">
            <p class="price">价格：￥{{ item.goodPrice }}</p>
            <button @click="enterToCart(index)">加入购物车</button>
          </div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '首页-商品列表页',
      goodsList: '',
      newGood: '',
      nowGood: '',
      token: ''
    };
  },
  props: ['homeGoodsList', 'Apptoken'],
  methods: {
    enterToCart(index) {
      if (this.token == '') {
        console.log("需要先登录");
        this.$router.replace({ path: '/login' });
      } else {
        console.log('将商品《' + this.goodsList[index].goodName + '》加入购物车');
        this.newGood = this.goodsList[index];
        this.$emit('addNewGood', this.newGood);
        //加购商品的自定义事件，传入当前加购的商品的对象信息
      }
    },
    toDetails(index) {
      console.log('跳转到商品详情页');
      this.nowGood = this.goodsList[index];
      this.$emit('goGoodDetails', this.nowGood);
      //跳转到商品详情页面，传入点击的商品的对象信息
    },
    loadHomeGoodsList() {
      return this.homeGoodsList;
    },
    loadToken() {
      return this.Apptoken;
    }
  },
  mounted() {
    this.goodsList = this.loadHomeGoodsList();
    this.token = this.loadToken();
  }
}
</script>

<style scoped>
ul {
  width: 502px;
  /* background-color: #c8d5d4; */
  padding-left: 0;
  margin: auto;
}

li {
  list-style-type: none;
  background-color: white;
  height: 200px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  display: flex;
}

.right {
 
  height: 200px;
  width: 270px;
}

.title {
  border-right: 1px dashed white;
  border-radius: 15px;
  background-color: rgba(57, 66, 125, 0.9);
  color: white;
  line-height: 200px;
  margin: auto;
  width: 198px;
  height: 198px;
  float: left;
  text-align: center;
  /* margin: 10px 0px 0px 10px; */
  margin-right: 10px;
}

.describe {
  background-color: #F1CCD5;
  margin: 0;
  width: 270px;
  height: 100px;
  border-bottom: 1px dashed white;
  border-radius: 10px;
  color: #656565;
}

.youxai {
  display: inline-block;
  width: 270px;
  height: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.price {
  width: 160px;
  height: 82px;
  margin-top: 10px;
  text-align: center;
  line-height: 100px;
  font-size: larger;
  font-weight: 500;
  color: #656565;
  border: 1px dashed white;
  border-radius: 50%;
}

button {
  background-color: #FDC9B5;
  color: #656565;
  width: 100px;
  height: 61px;
  border: 1px dashed white;
  border-radius: 10px;

  font-size: small;
  /* width: 60px;
  height: 61px;
  display: block;
  float: left; */
  position: relative;
  left: 85px;
  top: -80px;
}
</style>