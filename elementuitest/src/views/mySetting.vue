<template>
  <div>
    <h2>{{ pageName }}</h2>
    <button @click="loginMerchant()">点击进行商家登录</button>
    <!-- <button>点击进行管理员登录</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '设置',
      isMerchant:true
    }
  },
  methods:{
    loginMerchant(){
      console.log("进行商家登录");
      //将isUser置为false，将isMerchant置为true，切换到商家页面
      this.$emit("changeToMerchant",true);
    }
  }
}
</script>