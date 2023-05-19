<template>
<div>
  <el-input-number v-model="num" @change="handleChange" :min="30" :max="648" :precision="2" :step="0.68" step-strictly label="描述文字" size="medium" :disabled="false"></el-input-number>
</div>
</template>

<script>
  export default {
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    }
  };
</script>