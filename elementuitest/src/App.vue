<template>
  <div id="app" class="container">
    <el-container v-if="isUser">
      <!--这个el-container的子元素是el-aside和el-container，不包含header和footer，因此里面的子元素aside和container是水平排列-->
      <!--el-container的子元素只能是四者，四者的父元素也只能是container-->
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>

      <el-container>
        <!-- 当el-container容器中包含el-header或el-footer时，全部子元素会垂直排列，否则水平排列 →通过修改direction的值，不含那俩的时候是vertical，包含的时候是horizontal-->
        <!--这个container中包含的是除aside外的三个部分，需要垂直排列，因此再用一个container来装-->
        <el-header>
          <div>
            <myHeader @jsonReady="jsonReady" @toUser="toUser" @toMerchant="toMerchant" @toAdmin="toAdmin"></myHeader>
          </div>
        </el-header>
        <el-main>
          <div>
            <!-- <div class="readLocalText"></div>
            请选择文本文件：<input type="file" id="file" />
            <button @click="readJsonText()">点击读取本地文件</button> -->
            <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
            <div v-if="false">
              <myMain></myMain>
            </div>

            <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
            <!-- 这里的msg在props中有定义过，因此该msg会传入HelloWorld组件作为组件中msg的值展示在组件中 -->
            <div v-if="isGoodsListSend">
              <router-view :toCartGoodsList="goodsList" @addNewGood="addToCart" :toDetailsGood="good"
                @goGoodDetails="goToGoodDetails" :ordersList="ordersList" @addOrder="updateOrderList"
                :homeGoodsList="homeGoodsList" :userDataList="userList" @setToken="setToken" :Apptoken="token"
                :user="user" @addUser="updateUserList" @updatePassword="updatePassword" :merchantDataList="merchantList"
                @toMerchant="toMerchant" @setMerchantToken="setMerchantToken" @addMerchant="updateMerchantList"
                @userChangeState="userChangeState" @updateCart="updateCart" :adminList="adminList"
                @setAdminToken="setAdminToken" @toAdmin="toAdmin">
              </router-view>

              <!-- :newOrderList="newOrderList" :OrderUserData="OrderUserData" :OrderGoodsList="OrderGoodsList" @addOrderUserData="addUserData" @addOrderGoodsList="addGoodsList" -->
              <!--↑是之前的传购物车的商品信息和买家信息给订单页面-->

              <button v-if="token" @click="exit()">退出登录</button>

            </div>
            <!--goodList是传给购物车页面的，购物车页面展示传入的数组对象内容；监听myHome页面（首页）的自定义事件，更新要发给购物车的goodsList-->
            <!--good传给商品详情页面，根据点击的项进入不同商品的详情页面；good是点击的商品的对象信息-->

          </div>
        </el-main>
        <el-footer>
          <myFooter></myFooter>
        </el-footer>
      </el-container>
    </el-container>
    <el-container v-if="isMerchant">
      <el-aside width="200px">
        <merchantAside></merchantAside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view @setMerchantToken="setMerchantToken" :merchantGoodsList="merchantGoodsList"
            :merchantOrdersList="merchantOrdersList" :userList="userList" :merchantDataList="merchantList"
            :adminList="adminList" :goodLastId="goodLastId" :orderLastId="orderLastId"
            @updateGoodsList="updateGoodsList" :merchant_token="merchant_token" :merchant="merchant"
            @updateMerchantPassword="updateMerchantPassword" @merchantChangeState="merchantChangeState">
          </router-view>
          <button v-if="merchant_token" @click="merchantExit()">退出登录</button>
          <button v-else @click="toUser()">退出到前台</button>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
    <el-container v-if="isAdmin">
      <el-aside width="200px">
        <adminAside></adminAside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view :token="admin_token" :userList="userList" :merchantList="merchantList" :adminList="adminList"
            @setAdminToken="setAdminToken" :adminGoodList="adminGoodList" :adminOrderList="adminOrderList"
            @updateAdminGood="updateAdminGood" :goodLastId="goodLastId" @updateAdminOrder="updateAdminOrder"
            :userAccountList="userList" :merchantAccountList="merchantList" @updateUserList="updateUserAccount"
            @updateMerchantList="updateMerchantAccount" :userLastId="userLastId" :merchantLastId="merchantLastId"
            @merchantLastId="merchantLastIdTag" @userLastId="userLastIdTag">
          </router-view>
          <button v-if="admin_token" @click="adminExit()">退出登录</button>
          <button v-else @click="toUser()">退出到前台</button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//User
import Aside from './components/Aside.vue'
import myHeader from './components/myHeader.vue'
import myFooter from './components/myFooter.vue'
import myMain from './components/myMain.vue'

//Merchant
import merchantAside from './components/merchantAside.vue'

//Admin
import adminAside from './components/adminAside.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Aside,
    myHeader,
    myFooter,
    myMain,

    merchantAside,
    adminAside
  },
  data() {
    return {
      isUser: true,
      isMerchant: false,
      isAdmin: false,

      homeGoodsList: [],    //首页商品列表
      goodsList: [],     //购物车商品列表
      //OrderUserData:'',
      //OrderGoodsList:'',
      ordersList: [],   //从本地文件获取到的用户对应的订单列表信息
      //newOrderList: [],    //添加到json中的新增订单内容

      merchantGoodsList: [],     //传给商家页面的商品列表
      merchantOrdersList: [],      //传给商家页面的订单列表

      adminGoodList: [],
      adminOrderList: [],

      pageName: 'App',
      isGoodsListSend: false,   //上传本地数据
      good: '',     //给商品详情页的商品对象
      json: '',
      tag: 0,    //商家操作时用于记录传过来的对象是需要修改还是增加

      //loginTag: 1,    //默认为用户登录
      userList: [],   //用于用户登录注册校验
      merchantList: [],
      adminList: [],
      token: '',      //登录标记
      merchant_token: '',
      admin_token: false,   //管理员比较特殊，只有一个且不可注册，布尔值即可
      user: '',   //用于存储当前登录的用户对象，等等要传给其他界面
      merchant: '',  //存储当前登录的商家对象

      newUserCartList: {    //新用户的购物车列表
        userId: 0,
        CartGoodsList: []
      },
      newUserOrderList: {
        userId: 0
      },

      newMerchantGoodsList: {
        goodId: 0,
        goodName: '',
        goodDescribe: '',
        goodCount: 0,
        goodPrice: 0.0,
        merchantId: 0
      },

      merchant_LastId: 0,    //列表中最后生成的账户id
      user_LastId: 0

    };
  },
  computed: {
    goodLastId() {
      return this.json['Good'][this.json['Good'].length - 1].goodId;
    },
    orderLastId() {
      return this.json['Order'][this.json['Order'].length - 1].orderId;
    },
    userLastId() {
      return this.json['userList'][this.json['userList'].length - 1].userId;
    },
    merchantLastId() {
      return this.json['merchantList'][this.json['merchantList'].length - 1].merchantId;
    }
  },
  methods: {
    //====================================header
    jsonReady(json) {
      this.json = json;
      console.log(this.json);

      // setTimeout(() => {
      //   for (let i = 0; i < this.json['Good'].length; i++) {
      //   this.homeGoodsList[i] = this.json['Good'][i];
      // }     
      // },1000);


      for (let i = 0; i < this.json['Good'].length; i++) {
        this.homeGoodsList[i] = this.json['Good'][i];
      }         //读取首页商品列表
      for (let j = 0; j < this.json['userList'].length; j++) {
        this.userList[j] = this.json['userList'][j];
      }       //用户信息，用于登录注册验证
      for (let i = 0; i < this.json['merchantList'].length; i++) {
        this.merchantList[i] = this.json['merchantList'][i];
      }       //商家账户信息，用于登录注册
      for (let j = 0; j < this.json['admin'].length; j++) {
        this.adminList[j] = this.json['admin'][j];
      }
      //
      //this.adminGoodList.push(this.json['Good']);
      //this.adminOrderList.push(this.json['Order']);


      if (!this.token) {
        this.$router.replace({ path: '/login' });
      }
      this.isGoodsListSend = true;
    },
    //====================================获取token
    setToken(token) {
      this.token = token;
      console.log("当前用户的id为" + this.token);
      //设置当前用户对象    
      //this.user = this.json['userList'][this.token-1];      //直接用等号，浅拷贝，修改this.user的同时也会修改json中的内容，就不用再exit的时候讲数据写回到json
      this.user = { ...this.json['userList'][this.token - 1] };     //深拷贝
      //根据token返回购物车信息
      //console.log(this.json['userList']);   //新数据没有存进来
      for (let i = 0; i < this.json['Cart'].length; i++) {
        if (this.json['Cart'][i].userId == this.token) {
          //这个this.json['Cart'][i].CartGoodsList的数组就是我要的购物车商品列表
          for (let j = 0; j < this.json['Cart'][i].CartGoodsList.length; j++) {
            this.goodsList[j] = this.json['Cart'][i].CartGoodsList[j];
          }
        }
      }

      //获取用户的订单列表
      //this.ordersList.splice(0,this.orderList.length);
      for (let i = 0; i < this.json['Order'].length; i++) {
        if (this.json['Order'][i].userId == this.token) {
          this.ordersList.push(this.json['Order'][i]);
        }
      }
    },

    addToCart(newGood) {    //加入购物车
      let tag = false;  //标记，当前加入的商品的是否与列表中已经存在的商品相同
      for (let i = 0; i < this.goodsList.length; i++) {   //遍历数组看
        if (newGood.goodId == this.goodsList[i].goodId) {    //有相同id
          this.goodsList[i].goodNumber++;
          tag = true;
        }
      }
      if (tag == false) {
        //直接修改传入的数据会使详情页面信息修改
        let goodNumber = 1;
        let newgood = { ...newGood, goodNumber };
        console.log(newgood);
        //newgood.goodCount = 1;    //count仅用于表示商品剩余数量，加入购物车的数量应为number，是用户新加入购物车时的拼接属性
        ////
        this.goodsList.push(newgood);
      }
      this.updateCart();
    },
    updateCart() {
      //写购物车信息
      this.json['Cart'][this.token - 1].CartGoodsList.splice(0, this.json['Cart'][this.token - 1].CartGoodsList.length);
      this.json['Cart'][this.token - 1].CartGoodsList = [...this.goodsList];
    },
    goToGoodDetails(good) {   //根据商品信息跳转到商品详情页面
      console.log('商品id为' + good.goodId);
      this.good = good;
    },
    // addUserData(userDataToOrder){
    //   //接受到数据，用一个值来保存买家信息，然后传给订单页面
    //   this.OrderUserData = userDataToOrder;
    // },
    // addGoodsList(goodsList){
    //   //商品列表信息
    //   this.OrderGoodsList = goodsList;
    // },
    updateOrderList(orderList) {    //更新（增加）订单信息，用于之后将更新后的信息发给订单列表
      let length = this.json['Order'].length   //存储之前的订单列表长度，用于修改订单id
      //orderList.userId = this.token;
      let temp;   //表示拼接上userId之后的新订单
      let userId = this.token;
      for (let i = orderList.length - 1; i >= 0; i--) {

        //遍历所有商品列表，如果id对应，修改该商品的数量 -> 商品余量减少
        for (let j = 0; j < this.json['Good'].length; j++) {
          if (this.json['Good'][j].goodId == orderList[i].goodId) {
            this.json['Good'][j].goodCount -= orderList[i].goodNumber;
            orderList[i].goodCount -= orderList[i].goodNumber;
          }
        }

        let newOrderList = [];
        orderList[i].orderId += length;
        this.ordersList.push(orderList[i]);   //ordersList用于发送给订单页面
        temp = { ...orderList[i], userId };
        newOrderList.push(temp);
        //this.newOrderList.push(orderList[i]);
        this.json['Order'] = [...this.json['Order'], ...newOrderList];
        //newOrderList = [];   //清空新订单数组
        this.updateHomeList();
        this.json['Cart'][this.token - 1].CartGoodsList.splice(0, this.json['Cart'][this.token - 1].CartGoodsList.length);
      }
    },

    updateUserList(newUser) {          ////创建新用户要执行的操作
      this.userList.push(newUser);
      this.json['userList'].push(newUser);      //写入的数据一定要写到json中
      //更新Cart列表，新增注册用户对应的购物车
      //this.newUserCartList.userId = this.userList.length;
      //console.log(this.userList);
      this.newUserCartList.userId = this.userList[this.userList.length - 1].userId;
      this.newUserCartList.CartGoodsList = [...this.goodsList];
      this.json['Cart'].push(this.newUserCartList);
      //更新Order，新增注册用户对应的订单列表→要改
      this.newUserOrderList.userId = this.userList[this.userList.length - 1].userId;
      this.newUserOrderList = { ...this.newUserOrderList.userId, ...this.ordersList };
      this.json['Order'].push(this.newUserOrderList);
    },
    updateMerchantList(newMerchant) {
      this.merchantList.push(newMerchant);
      this.json['merchantList'].push(newMerchant);
      //更新Good列表，新增注册商家对应商品列表
      // this.newMerchantGoodsList.merchantId = this.merchantList.length;
      // this.newMerchantGoodsList
      // this.json['Good'].push(this.newMerchantGoodsList);
      //更新Order列表，新增注册商家对应订单列表
    },
    updatePassword(newpasswd) {     //修改密码
      this.user.password = newpasswd;
      //给json写用户信息
      this.json['userList'][this.token - 1].password = this.user.password;
    },
    updateMerchantPassword(newpasswd) {
      this.merchant.password = newpasswd;
    },

    toUser() {
      console.log("切换到用户登录页面");
      //传给登录页面，说明此时是用户登录，应该匹配userList
      //this.loginTag = tag;
      this.isUser = true;
      this.isMerchant = false;
      this.isAdmin = false;
      this.$router.replace({ path: '/' });
      console.log("???");
    },
    toMerchant() {
      console.log("切换到商家登录页面");
      //this.loginTag = tag;
      this.isUser = false;
      this.isMerchant = true;
      this.isAdmin = false;
      this.exit();
    },
    toAdmin() {
      console.log("切换到管理员页面");
      this.isUser = false;
      this.isMerchant = false;
      this.isAdmin = true;
      this.exit();
    },

    // readJsonText() {    //读取本地文件
    //   //==============================
    //   let reader = new FileReader();
    //   const file = document.getElementById('file').files[0];
    //   reader.readAsText(file);
    //   reader.onloadend = e => {
    //     //原本是用reader.onload = function(e) {...}，但是这样里面的数据不能再外部使用，调用this也没用；改成使用箭头函数不糊改变this的指向，可以使用外部数据
    //     //如果要在内部使用函数要用$this
    //     const content = e.target.result;    //这里文件读取的结果是字符串，要将字符串转为json对象
    //     this.json = JSON.parse(content);      //读取文件之后执行的操作到这里就可以了，其他操作放在别的地方
    //     //console.log(this.json);   //对象
    //     //console.log(this.json['goodsList']);       // 数组
    //     //let data = this.json['goodsList'];
    //     for (let i = 0; i < this.json['HomeGoodsList'].length; i++) {
    //       this.homeGoodsList[i] = this.json['HomeGoodsList'][i];
    //     }         //读取首页商品列表

    //     for(let j = 0 ; j < this.json['userList'].length; j++) {
    //       this.userList[j] = this.json['userList'][j];
    //     }       //用户信息，用于登录注册验证

    //     if(!this.token){
    //       this.$router.replace({path:'/login'});
    //     }

    //   };
    //   //console.log(this.goodsList);
    //   //这里令goodList内容从json文件中取得，但是购物车的数据来自一开始发送的空goodsList，需要再次向购物车发送，或必须执行完上传文件才能执行数据发送
    //   //如果上传文件之前就在购物车页面，购物车页面会显示为空，需要去其他页面然后再返回购物车页面才会显示数据；如果一开始就在其他页面，上传文件之后点击跳转到购物车页面就会直接显示购物车商品列表
    //   this.isGoodsListSend = true;
    // },
    exit() {       //退出登录，清空购物车和订单信息
      //根据token将数据写入this.json
      //写用户信息
      //this.json['userList'][this.token - 1].password = this.user.password;      //这一行如果用浅拷贝没必要，因为this.user直接浅拷贝json中内容，二者会一同变化；但是如果json来自header就需要写回
      // //写购物车信息
      //this.json['Cart'][this.token - 1].CartGoodsList = [...this.goodsList];
      //写订单信息
      //this.json['Order'][this.token - 1].ordersList = [...this.ordersList];
      //this.json['Order'] = [...this.json['Order'], ...this.newOrderList];

      //把json发回给header，因为json的数据来自header
      this.user = '';
      this.token = '';
      //this.newOrderList = [];
      this.goodsList = [];
      this.ordersList = [];
      this.$router.replace({ path: '/login' });
      //只将token发送给了首页，其他的数据都是首页根据登录信息进行判断之后传给购物车和订单页面的
      //token只能改变首页是否能够添加商品，其他页面只接收app页面处理好的数据，所以token的改变对购物车和订单页面没有影响
    },
    merchantExit() {
      //商家退出账号登录
      //将信息写回json
      //console.log(this.json['merchantList'][this.merchant_token-3001]);
      //this.json['merchantList'][this.merchant_token-3001].password = this.merchant.password;
      //this.json['Order'] = [...this.json['Order'],...this.]
      //商家good的json在updateGoodsList用push改过了
      //order更新
      //清空信息
      console.log("传入页面的订单列表");
      console.log(this.merchantOrdersList);
      this.merchant = '';
      this.merchant_token = '';
      this.merchantGoodsList = [];
      this.merchantOrdersList = [];

      //console.log(this.json['Order']);
      //console.log("跳转到登录界面");
      //跳转到登录页面
    },
    adminExit() {
      this.admin_token = false;
      this.adminGoodList = [];
      this.adminOrderList = [];
      //console.log("退出管理员账号登录");
    },
    setAdminToken(token) {
      this.admin_token = token;
      //更新列表
      //写订单和商品数据
      for (let i = 0; i < this.json['Good'].length; i++) {
        this.adminGoodList[i] = this.json['Good'][i];
      }
      console.log(this.adminGoodList);
      for (let i = 0; i < this.json['Order'].length; i++) {
        this.adminOrderList[i] = this.json['Order'][i];
      }
    },
    //=================================================================basic end========================================================================================
    setMerchantToken(token) {
      //商家登录后获取商家id，根据设置的token返回商家应显示的信息
      //console.log(token);
      this.merchant_token = token;
      //设置当前商家对象
      for (let i = 0; i < this.json['merchantList'].length; i++) {
        if (this.json['merchantList'][i].merchantId == token) {
          this.merchant = this.json['merchantList'][i];
          console.log(this.merchant);
        }
      }

      //设置商家商品列表
      for (let i = 0; i < this.json['Good'].length; i++) {
        //console.log(this.json['Good'][i]);
        if (this.json['Good'][i].merchantId == token) {
          this.merchantGoodsList.push(this.json['Good'][i]);
          //console.log("111");
        }
      }
      //console.log(this.merchantGoodsList);

      //设置商家订单列表
      //this.merchantOrdersList.splice(0,this.merchantOrdersList.length);
      for (let i = 0; i < this.json['Order'].length; i++) {
        if (this.json['Order'][i].merchantId == token) {
          this.merchantOrdersList.push(this.json['Order'][i]);
          //console.log("匹配到一个");
        }
      }
      //console.log(this.merchantOrdersList);
      //console.log("根据商家登录的账户显示对应信息");
    },
    userChangeState(order) {
      console.log(order);
      for (let i = 0; i < this.ordersList.length; i++) {
        if (this.ordersList[i].orderId == order.orderId) {
          if (this.orderState == 2)
            this.ordersList[i].orderState = 3;
        }
      }
    },
    merchantChangeState(order) {
      //修改订单状态
      for (let i = 0; i < this.merchantOrdersList; i++) {
        if (this.merchantOrdersList[i].orderId == order.orderId) {
          if (order.orderState == 1) {
            this.merchantOrdersList[i].express = order.express;
            this.merchantOrdersList[i].orderState = 2;
          }
        }
      }
    },
    //=
    updateGoodsList(newGood) {      //更新商家商品列表
      //判断传入的参数，若为对象，则根据id是否存在将该商品对象加入数组或修改；若为数字（ID）则删除该商品
      //修改json，然后由json写回两个List
      if (typeof newGood == typeof {}) {
        //console.log("传入为对象，操作为修改或新增");
        this.tag = 0;
        //判断id是否存在
        for (let i = 0; i < this.json['Good'].length; i++) {
          if (this.json['Good'][i].goodId == newGood.goodId) {
            //有匹配的id，判断传入对象需要修改
            this.json['Good'].splice(i, 1, newGood);    //替换原本下标为i的对象
            this.tag = 1;   //说明有匹配的id（原id存在）
            console.log("修改商品属性");
            //this.merchantGoodsList.length;
            for (let j = 0; j < this.merchantGoodsList.length; j++) {
              if (this.merchantGoodsList[j].goodId == newGood.goodId) {
                this.merchantGoodsList[j] = newGood;
                //再修改一下存入用户购物车的数据
                for (let i = 0; i < this.json['Cart'].length; i++) {
                  for (let j = 0; j < this.json['Cart'][i].CartGoodsList.length; j++) {
                    if (this.json['Cart'][i].CartGoodsList[j].goodId == newGood.goodId) {
                      let number = this.json['Cart'][i].CartGoodsList[j].goodNumber;
                      this.json['Cart'][i].CartGoodsList[j] = newGood;
                      this.json['Cart'][i].CartGoodsList[j].goodNumber = number;
                    }
                  }
                }//有这个商品的购物车全部更新
              }
            }
          }
        }
        //console.log(this.tag);
        //id不存在，新增商品
        if (this.tag == 0) {
          //新增商品
          console.log("新增商品")
          this.json['Good'].push(newGood);    //json修改了，但是商家商品订单不变，需要更新list
          this.merchantGoodsList.push(newGood);   //各改各的
        }
      } else {
        //传入的neGood是当前列表中的商品id，根据id删除数组中对应位置的商品对象
        //==不能根据数组长度，因为删除后长度与id就不一定对应了==
        console.log("根据id删除商品");
        for (let i = 0; i < this.json['Good'].length; i++) {
          if (this.json['Good'][i].goodId == newGood) {
            //获取与id的下标i，删除该下标的对象
            this.json['Good'].splice(i, 1);    //替换原本下标为i的对象
            //list也要修改=>直接循环匹配id修改list||重新写入list=>前者遍历的少
            for (let j = 0; j < this.merchantGoodsList.length; j++) {
              if (this.merchantGoodsList[j].goodId == newGood) {
                this.merchantGoodsList.splice(j, 1);
              }
            }
            //购物车修改
            for (let i = 0; i < this.json['Cart'].length; i++) {
              for (let j = 0; j < this.json['Cart'][i].CartGoodsList.length; j++) {
                if (this.json['Cart'][i].CartGoodsList[j].goodId == newGood) {
                  this.json['Cart'][i].CartGoodsList.splice(j, 1);
                }
              }
            }//有这个商品的购物车全部更新
          }
        }
      }
      this.updateHomeList();
      //更新用户购物车中的商品信息
      // for (let i = 0; i < this.json['Cart'].length; i++) {
      //   for (let j = 0; j < this.json['Cart'][i].CartGoodsList.length; j++) {
      //     if(this.json['Cart'][i].CartGoodsList[j].goodId == newGood.goodId){
      //       this.json['Cart'][i].CartGoodsList[j] = newGood;
      //     }
      //   }
      // }
    },
    updateAdminGood(goodData) {
      console.log("更新管理员商品列表");
      if (typeof goodData == typeof {}) {
        //console.log("需要增加或修改商品");
        if (goodData.goodId == this.goodLastId + 1) {
          console.log("新增商品");
          this.json['Good'].push(goodData);
          this.adminGoodList.push(goodData);
        } else {
          for (let i = 0; i < this.json['Good'].length; i++) {
            if (this.json['Good'][i].goodId == goodData.goodId) {
              console.log("有相同id，更新该商品");
              this.json['Good'].splice(i, 1, goodData);
              this.adminGoodList.splice(i, 1, goodData);
            }
          }
        }
      } else {
        console.log("删除商品");    //从首页和购物车删除
        console.log(goodData);
        for (let i = 0; i < this.json['Good'].length; i++) {
          console.log(this.json['Good'][i]);
          if (this.json['Good'][i].goodId == goodData) {
            this.json['Good'].splice(i, 1);
            this.adminGoodList.splice(i, 1);
          }
        }
        console.log(this.json['Good']);
        console.log(this.adminGoodList);
      }
      this.updateHomeList();
    },
    updateAdminOrder(orderData) {   //更新管理员的编辑更新订单信息
      console.log("编辑订单信息");
      //找到对应的订单
      for (let i = 0; i < this.json['Order'].length; i++) {
        if (this.json['Order'][i].orderId == orderData.orderId) {
          console.log("下面是执行替换，然后打印json和order");
          console.log(this.json['Order'][i]);
          this.json['Order'].splice(i, 1, orderData);   //你有问题
          console.log(orderData);
          this.adminOrderList.splice(i, 1, orderData);
          console.log(this.json['Order']);
          //console.log
        }
      }
      //更新订单信息
    },
    updateUserAccount(data) {
      console.log(data);
      if (typeof data == typeof {}) {
        if (data.userId == this.userLastId + 1) {
          console.log("新增用户账号");
          this.userLastIdTag(this.userLastId);
          if (this.user_LastId >= data.userId) {
            //data.userId +=1;
            this.user_LastId += 1;
            data.userId = this.user_LastId;
            this.updateUserList(data);
            console.log("当前的最大id是" + this.user_LastId);
          } else {
            data.userId = this.user_LastId + 1;
            this.user_LastId++;
            this.updateUserList(data);
          }
        } else {
          console.log("更新用户账号");
          for (let i = 0; i < this.json['userList'].length; i++) {
            if (this.json['userList'][i].userId == data.userId) {
              console.log("有相同id");
              this.json['userList'].splice(i, 1, data);
              this.userList.splice(i, 1, data);
            }
          }
        }
      } else {
        console.log("删除用户");
        for (let i = 0; i < this.json['userList'].length; i++) {
          console.log(this.json['userList'][i]);
          if (this.json['userList'][i].userId == data) {
            this.json['userList'].splice(i, 1);
            this.userList.splice(i, 1);
          }
        }
        //删除该用户账号下的购物车
        for (let i = 0; i < this.json['Cart'].length; i++) {
          if (this.json['Cart'][i].userId == data) {
            this.json['Cart'].splice(i, 1);
          }
        }
      }
    },
    updateMerchantAccount(data) {
      console.log(data);
      if (typeof data == typeof {}) {
        if (data.merchantId == this.merchantLastId + 1) {
          this.merchantLastIdTag(this.merchantLastId);
          console.log("新增商家账号");
          if (this.merchant_LastId >= data.merchantId) {
            this.merchant_LastId += 1;
            data.merchantId = this.merchant_LastId;
            this.updateMerchantList(data);
            //this.merchantLastId++;
            //console.log(this.)
          } else {
            data.merchantId = this.merchant_LastId + 1;
            this.merchant_LastId++;
            this.updateMerchantList(data);
          }
        } else {
          console.log("更新商家账号");
          for (let i = 0; i < this.json['merchantList'].length; i++) {
            if (this.json['merchantList'][i].merchantId == data.merchantId) {
              console.log("有相同id");
              this.json['merchantList'].splice(i, 1, data);
              this.merchantList.splice(i, 1, data);
            }
          }
        }
      } else {
        console.log("删除商家");
        for (let i = 0; i < this.json['merchantList'].length; i++) {
          //console.log(this.json['merchantList'][i]);
          if (this.json['merchantList'][i].merchantId == data) {
            this.json['merchantList'].splice(i, 1);
            this.merchantList.splice(i, 1);
          }
        }
        //删除该商家账号下的商品
        for (let i = this.json['Good'].length - 1; i >= 0; i--) {
          //console.log(this.json['Good'][i]);
          if (this.json['Good'][i].merchantId == data) {

            //console.log("商家id：" + data + ",这是json下标" + i + "项,商家id是" + this.json['Good'][i].merchantId);
            //console.log(this.json['Good'][i]);
            this.json['Good'].splice(i, 1);
            this.adminGoodList.splice(i, 1);
          }
        }
        //删除用户购物车中的商品
        //再修改一下存入用户购物车的数据
        for (let i = this.json['Cart'].length - 1; i >= 0; i--) {
          for (let j = this.json['Cart'][i].CartGoodsList.length - 1; j >= 0; j--) {
            if (this.json['Cart'][i].CartGoodsList[j].merchantId == data) {
              this.json['Cart'][i].CartGoodsList.splice(j, 1);
            }
          }
        }//有这个商品的购物车全部更新
        //订单处理
        this.updateHomeList();
      }
    },
    userLastIdTag(lastId) {
      if (this.user_LastId < lastId) {
        this.user_LastId = lastId;
      }
      console.log("最后值" + this.user_LastId);
    },
    merchantLastIdTag(lastId) {
      if (this.merchant_LastId < lastId) {
        this.merchant_LastId = lastId;
      }
    },
    updateHomeList() {    //更新首页商品信息
      this.homeGoodsList = [];
      for (let i = 0; i < this.json['Good'].length; i++) {
        this.homeGoodsList[i] = this.json['Good'][i];
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  margin: 0px auto;
  width: 1206px;
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

/* .el-header>.options {
  float: right;
} */

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body>.el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
  /* &:last-child {
      margin-bottom: 0;
    } */
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
