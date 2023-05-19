<template>
  <div>
    <div class="block">
      <span class="demonstration">默认</span>
      <el-slider v-model="value1" show-input></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2" :step="10" show-stops show-input></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">双向</span>
      <el-slider v-model="value3" :show-tooltip="true" range :max="50"></el-slider>
    </div>
    <div class="block">
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip" show-input disabled></el-slider>
    </div>
    <div class="block" style="margin-bottom: 30px;">
      <span class="demonstration">mark</span>
      <el-slider v-model="value5" :marks="marks"></el-slider>
    </div>
      <el-tooltip placement="top">
  <div slot="content">多行信息<br/>第二行信息</div>
  <el-button>Top center</el-button>
</el-tooltip>
  </div>
</template>

<script>

export default {
  data() {
    return {
      value1: 0,
      value2: 50,
      value3: [12,36],
      value4: 48,
      value5: 42,
      marks:{
        8:"markA",
        16:"markB",
        32:'markC',
        57:'markD',
        77:{
          style:{
            color: '#1989FA'
          },
          label: this.$createElement('strong', '77%')
        }
      }
    }
  },
  methods: {
    formatTooltip(val) {
      return val / 100;
    }
  }
}
</script>

<style>
    .item {
      width: 400px;
      text-align: center;
      margin: 4px;
    }
</style>