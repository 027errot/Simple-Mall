<template>
  <div>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949">
    </el-switch>

    <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费">
    </el-switch>
    <el-switch style="display: inline" v-model="value2" active-color="#13ce66" inactive-color="#ff4949"
      active-text="按月付费" inactive-text="按年付费">
    </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      value1: true,
      value2: true
    }
  }
};
</script>

<style>
.el-switch{
  margin-right: 70px;
}
</style>