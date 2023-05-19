<template>
  <div>
    <el-time-select v-model="value0" :picker-option="{
      start: '09:30',
      step: '00:30',
      end: '18:30'
    }" placeholder="请选择固定时间"></el-time-select>

    <el-time-picker v-model="value1" :picker-option="{ selectableRange: '12:00:00 - 18:30:00' }" placeholder="请选择任意时间"
      arrow-control></el-time-picker>

    <el-time-select v-model="value2" :picker-option="{
      start: '12:30',
      step: '00:10',
      end: '18:30',
      minTime: value0
    }" placeholder="请输入固定时间2（>固定时间1）"></el-time-select>


    <el-time-picker is-range v-model="value4" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
      placeholder="选择时间范围">
    </el-time-picker>
    <el-time-picker is-range arrow-control v-model="value5"  placeholder="选择时间范围">
    </el-time-picker>

  </div>
</template>

<script>
export default {
  data() {
    return {
      value0: '',
      value1: new Date(2016, 9, 10, 18, 40),
      value2: '',
      value3: new Date(2016, 9, 10, 18, 40),
      value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    };
  }
}
</script>