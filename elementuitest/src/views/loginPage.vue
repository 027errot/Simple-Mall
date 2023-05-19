<template>
  <div class="backgroud">
    <div class="loginCard">
      <h2>{{ loginName }}{{ pageName }}</h2>
      <div class="input">
        <div class="input-name">
          <p>用户名：</p>
          <input type="text" label="username" required v-model="userName" />
        </div>
        <div class="input-passwd">
          <p>密码：</p>
          <input type="password" label="userpassword" required v-model="userPassword" />
        </div>
      </div>
      <div class="radio">
        <label>用户<input type="radio" name="login" label="用户" v-model="loginName" value="用户" /></label>
        <label>商家<input type="radio" name="login" label="商家" v-model="loginName" value="商家" /></label>
        <label>管理员<input type="radio" name="login" label="管理员" v-model="loginName" value="管理员" /></label>
      </div>
      <div class="button">
        <button @click="login()">登录</button>
        <button @click="register()">注册</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pageName: '登录页面',
      loginName: '',
      userName: '',
      userPassword: '',
      userList: [],
      merchantList: [],
      token: ''   //token用于匹配登录者的id
    };
  },
  props: ["userDataList","merchantDataList","adminList"],
  methods: {
    register() {
      this.$router.replace({ path: '/register' });
    },
    login() {
      if (this.loginName == '用户') {
        for (let i = 0; i < this.userDataList.length; i++) {
          if (this.userName == this.userList[i].name && this.userPassword == this.userList[i].password) {
            this.token = this.userList[i].userId;   //设置token
          }
        }
        if (this.token) {
          console.log("登录成功！");
          //跳转到首页
          this.$emit("setToken", this.token);
          this.$router.replace({ path: '/' });
        } else {
          console.log("登录失败！");
        }
      }else if(this.loginName == '商家') {
        for (let i = 0; i < this.merchantDataList.length; i++) {
          if (this.userName == this.merchantList[i].merchantName && this.userPassword == this.merchantList[i].password) {
            this.token = this.merchantList[i].merchantId;   //设置merchantToken
          }
        }
        console.log(this.merchantDataList);
        if(this.token) {
          console.log("商家登录成功！");
          //发送token到商家页面
          this.$emit("setMerchantToken",this.token);
          //因为三种账户的token值互斥，所以一次只会发送一个token，可用同一个值存储，触发不同的自定义事件
          this.$emit("toMerchant",true);
          this.$router.replace({path: '/merchant/merchantGoods'});
        } else {
          console.log("商家登录失败！");
        }
      }else if(this.loginName == '管理员'){
        console.log(this.adminList);
        for(let i =0;i<this.adminList.length;i++){
          if(this.userName == this.adminList[i].name && this.userPassword == this.adminList[i].password){
            this.$emit("setAdminToken",true);
            this.$emit("toAdmin",true);
            console.log("管理员登录成功！");
            this.$router.replace({path: '/admin/adminGood'});
          }
        }
      }


    },
    loadUserList() {
      return this.userDataList;
    },
    loadMerchantList(){
      // console.log("============");
      // console.log(this.merchantDataList);
      return this.merchantDataList;
    }
  },
  mounted() {
    this.userList = this.loadUserList();
    this.merchantList = this.loadMerchantList();
  }
}
</script>

<style scoped>
/* .backgroud{
  background-color: rgb(0, 124, 103);
  height: 60vh;
} */

h2 {
  margin: 0;
}

.loginCard {
  background-color: rgba(111, 222, 33, 0.7);
  width: 500px;
  height: 309px;
  margin: auto;
  border-radius: 3%;
  display: flex;
  flex-direction: column;
}

.input {
  /* background-color: beige; */
  display: inline-block;
  margin: 0 auto;
  width: 300px;
  height: 130px;
}

.input p {
  float: left;
  margin: auto;
  padding-left: 20px;
}

.input input {
  float: right;
  margin: 20px auto;
}

.input>div {
  float: left;
  width: 270px;
}

.radio {
  /* background-color: rgba(249,204,157,0.9); */
  width: 300px;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

.button {
  /* background-color: antiquewhite; */
  width: 300px;
  margin: auto;
}

.button>button {
  width: 120px;
  height: 30px;
  margin: auto 15px;
}
</style>