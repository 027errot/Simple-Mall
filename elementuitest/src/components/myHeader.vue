<template>
  <div class="header-container">
    <div class="readLocalText">
      请选择文本文件：<input type="file" id="file" />
      <button @click="readJsonText()">点击读取本地文件</button>
      <!-- //在这里上传文件之后，要将内容传给main中的内容；当前组件的父组件为app.vue，因此可以将文件内容传到app.vue之后使用 -->
    </div>

    <div class="options">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser()">用户</el-dropdown-item>
          <el-dropdown-item @click.native="toMerchant()">商家</el-dropdown-item>
          <el-dropdown-item @click.native="toAdmin()">管理</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <i class="el-icon-table-lamp"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>下拉1</el-dropdown-item>
          <el-dropdown-item>下拉2</el-dropdown-item>
          <el-dropdown-item>下拉3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pageName: 'header',

      json: '',    //存储文件读取出的数据
    }
  },
  methods: {
    readJsonText() {    //读取本地文件
      if (!document.getElementById('file').files[0]) {
        console.log('先上传文件')
        return
      }
      //==============================
      let reader = new FileReader();
      const file = document.getElementById('file').files[0];
      reader.readAsText(file);
      reader.onloadend = e => {
        //原本是用reader.onload = function(e) {...}，但是这样里面的数据不能再外部使用，调用this也没用；改成使用箭头函数不糊改变this的指向，可以使用外部数据
        //如果要在内部使用函数要用$this
        const content = e.target.result;    //这里文件读取的结果是字符串，要将字符串转为json对象
        this.json = JSON.parse(content);      //读取文件之后执行的操作到这里就可以了，其他操作放在别的地方
        //console.log(this.json);   //对象
        //console.log(this.json['goodsList']);       // 数组
        //let data = this.json['goodsList'];

        this.$emit("jsonReady", this.json);
        //this.$router.replace({path:'/myHome'});
        console.log(this.json);
        // for (let i = 0; i < this.json['HomeGoodsList'].length; i++) {
        //   this.homeGoodsList[i] = this.json['HomeGoodsList'][i];
        // }         //读取首页商品列表

        // for(let j = 0 ; j < this.json['userList'].length; j++) {
        //   this.userList[j] = this.json['userList'][j];
        // }       //用户信息，用于登录注册验证

        // if(!this.token){
        //   this.$router.replace({path:'/login'});
        // }

      };
      //console.log(this.goodsList);
      //这里令goodList内容从json文件中取得，但是购物车的数据来自一开始发送的空goodsList，需要再次向购物车发送，或必须执行完上传文件才能执行数据发送
      //如果上传文件之前就在购物车页面，购物车页面会显示为空，需要去其他页面然后再返回购物车页面才会显示数据；如果一开始就在其他页面，上传文件之后点击跳转到购物车页面就会直接显示购物车商品列表
      //this.isGoodsListSend = true;
    },

    toUser(){
      this.$emit("toUser",1);
      this.$router.replace({path: '/'});
      //切换到用户界面
    },
    toMerchant(){
      this.$emit("toMerchant",2);
      this.$router.replace({path: '/merchant/merchantGoods'});
      //console.log("切换到商家登录界面");
    },
    toAdmin(){
      this.$emit("toAdmin",3);
      this.$router.replace({path: '/admin/admin'});
    }
  }
}
</script>

<style>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 960px;
}

.readLocalText {
  float: left;
}

.options {
  float: right;
}
</style>