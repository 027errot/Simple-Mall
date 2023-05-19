<template>
  <div>
    <h2>{{ pageName }}</h2>
    <div class="Card" v-if="user != ''">
      <h3>Hi! {{ myuser.name }}</h3>
      <!--这里要在判断是否登录之后（token）展示用户姓名（user.name），且之后要对密码(user.password)进行校验，所以需要获取到登录用户的信息以及token-->
      <div class="changePassword">
        <div class="input">
          <i>输入密码：</i>
          <input type="text" v-model="password" />
        </div>
        <div class="input">
          <i>确认密码：</i>
          <input type="text" v-model="password_2" />
        </div>
      </div>
      <button @click="changePassword()">修改密码</button>
    </div>
    <h3 v-else @click="toLogin()">你还没有登录哦</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '个人中心',
      token: '',
      myuser: '',
      password: '',
      password_2: ''
    };
  },
  props: ['Apptoken', 'user'],
  methods: {
    changePassword() {
      //判断两次密码是否相同
      if (this.password != this.password_2) {
        console.log("两次输入密码不同！");
      } else if (this.password == '') {
        console.log("输入的新密码不能为空")
      } else if ( this.password == this.user.password) {
        console.log("输入的新密码不能与老密码相同");
      } else {
        console.log("新密码为：" + this.password);
        this.$emit("updatePassword", this.password);
      }
    },
    toLogin(){
      this.$router.replace({path:'/login'});
    },
    loadToken() {
      return this.Apptoken;
    },
    loadUser() {
      //console.log(this.user);
      return this.user;
    }
  },
  mounted() {
    this.token = this.loadToken();
    this.myuser = this.loadUser();
  }
}
</script>

<style scoped>
.Card {
  width: 500px;
  height: 309px;
  border: 3px dashed white;
  border-radius: 5px;
  background-color: rgba(57, 66, 125, 0.9);
  margin: auto;
  display: block;
}

h3 {
  /* background-color: antiquewhite; */
  width: 270px;
  margin: 0 70px;
  text-align: left;
  color: white;
}

.changePassword {
  /* background-color: blanchedalmond; */
  /* border-top: 1px dashed rgba(57, 66, 125, 0.9); */
  border-radius: 2px;
  background-color: #F1CCD5;
  width: 360px;
  height: 180px;
  margin: 60px auto;
}

.input>i {
  display: inline-block;
}

.input>input {
  display: inline-block;
  margin: 20px auto;
}

.input {
  float: left;
  margin: 12px 50px;
}

button {
  display: block;
  border-radius: 3px;
  border: 1px solid rgba(57, 66, 125, 0.9);
  width: 100px;
  height: 52px;
  position: relative;
  left: 330px;
  top: -50px;
}
</style>