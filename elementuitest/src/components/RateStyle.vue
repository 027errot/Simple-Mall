<template>
  <div>
    <el-rate v-model="value" show-text :texts="texts">
    </el-rate>
  </div>
</template>

<script>
export default {
    data() {
      return {
        value: null,
        texts: ['11','22','33']
      }
    }
  }
</script>