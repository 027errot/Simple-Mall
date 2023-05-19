<template>
  <div class="registerCard">
    <h2>{{ registerName }}{{ pageName }}</h2>
    <div class="input">
      <div class="input-name">
        <p>用户名：</p>
        <input type="text" label="username" required v-model="userName" />
      </div>
      <div class="input-passwd">
        <p>密码：</p>
        <input type="text" label="userpassword" required v-model="userPassword" />
      </div>
      <div class="input-passwd">
        <p>确认密码：</p>
        <input type="text" label="userpassword-2" required v-model="userPassword_2" />
      </div>
    </div>
    <div class="radio">
      <label>用户<input type="radio" name="login" label="用户" v-model="registerName" value="用户" /></label>
      <label>商家<input type="radio" name="login" label="商家" v-model="registerName" value="商家" /></label>
      <label>管理员<input type="radio" name="login" label="管理员" v-model="registerName" value="管理员"
          disabled /></label>
    </div>
    <div class="button">
      <button @click="goBack()">返回到登录页面</button>
      <button @click="register()">注册</button>
    </div>
    <!-- <el-alert title="不可以注册管理员！" type="warning">
    </el-alert> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '注册页面',
      registerName: '用户',
      userName: '',
      userPassword: '',
      userPassword_2: '',
      userList: [],
      merchantList: [],
      newUser: {
        name: '',
        password: '',
        userId: ''
      },
      newMerchant: {
        merchantId: 0,
        merchantName: "",
        merchantPhone: "",
        password: ""
      },
      msg: '',
      isAdmin: false
    };
  },
  props: ["userDataList", "merchantDataList"],
  methods: {
    register() {
      console.log("注册新用户");

      if (this.registerName == '用户') {
        this.isAdmin = false;
        let tag = 0;
        for (let i = 0; i < this.userList.length; i++) {
          if (this.userName == this.userList[i].name) {
            this.msg = "该用户名已被注册！";
            console.log(this.msg);
            tag = 1;
          }
        }
        if (tag == 0) {
          //判断输入的格式是否正确
          if (this.userName && this.userPassword && this.userPassword_2) {
            if (this.userPassword != this.userPassword_2) {
              //两次的密码输入不一样
              this.msg = "请输入相同的密码！";
              console.log(this.msg);
              //open();
            } else {
              //console.log("开始新增用户");
              //将内容写入用户列表
              this.newUser.name = this.userName;
              this.newUser.password = this.userPassword;
              this.newUser.userId = this.userList.length + 1;
              //console.log("新用户信息写完，准备发送");
              //console.log(this.newUser);
              //this.userList.push(this.newUser);
              //将新的用户列表返回
              this.$emit("addUser", this.newUser);      //将新的用户信息发送给App.vue
              console.log("注册成功！");
              //console.log(this.newUser);
              //返回到用户登录界面
              this.$router.replace({ path: '/login' });
            }
          } else {
            console.log("输入不可为空！");
          }
        }

      } else if (this.registerName == '商家') {
        this.isAdmin = false;
        let tag = 0;
        for (let i = 0; i < this.merchantList.length; i++) {
          if (this.userName == this.merchantList[i].merchantName) {
            this.msg = "该用户名已被注册！";
            console.log(this.msg);
            tag = 1;
          }
        }
        if (tag == 0) {
          //判断输入的格式是否正确
          if (this.userName && this.userPassword && this.userPassword_2) {
            if (this.userPassword != this.userPassword_2) {
              //两次的密码输入不一样
              this.msg = "请输入相同的密码！";
              console.log(this.msg);
              //open();
            } else {
              //将内容写入用户列表
              this.newMerchant.merchantName = this.userName;
              this.newMerchant.password = this.userPassword;
              this.newMerchant.merchantId = this.merchantList.length + 1;
              //console.log(this.newUser);
              //this.userList.push(this.newUser);
              //将新的用户列表返回
              this.$emit("addMerchant", this.newMerchant);      //将新的用户信息发送给App.vue
              console.log("注册成功！");
              console.log(this.newMerchant);
              //返回到用户登录界面
              this.$router.replace({ path: '/login' });
            }
          } else {
            console.log("输入不可为空！");
          }
        }
      }




    },
    goBack() {
      this.$router.replace({ path: '/login' });
    },
    open() {
      this.$message({
        showClose: true,
        message: this.msg,
        type: 'warning'
      })
    },
    readInput() {
      //判断输入
    },
    loadUserList() {
      return this.userDataList;
    },
    loadMerchantList() {
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
h2 {
  margin: 0;
}

.registerCard {
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
  width: 320px;
  height: 150px;
  line-height: 50px;
}

.input p {
  float: left;
  margin: auto;
  padding-left: 20px;
}

.input input {
  float: right;
  margin: 15px auto;
}

.input>div {
  float: left;
  width: 300px;
}

/* .input-name {
  float: left;
  width: 270px;
}

.input-passwd {
  float: left;
  width: 270px;
} */
.radio {
  /* background-color: rgba(249,204,157,0.9); */
  width: 300px;
  margin: auto;
  display: flex;
  justify-content: space-around;
}

.button {
  /* background-color: antiquewhite; */
  width: 320px;
  margin: auto;
}

.button>button {
  width: 120px;
  height: 30px;
  margin: 10px 15px;
  position: relative;
  top: -10px;
}
</style>