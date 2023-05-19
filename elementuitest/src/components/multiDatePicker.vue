<template>
<div>
  <div class="block">
    <span>默认</span>
    <el-date-picker v-model="value1" type="week" format="第WW周" placeholder="选择日期"></el-date-picker>
  </div>

  <div class="block">
    <span>带禁止日期</span>
    <el-date-picker v-model="value2" type="date" placeholder="选择日期2" align="right" :picker-options="pickerOption"></el-date-picker>
  </div>
</div>
</template>

<script>
export default{
  data(){
    return{
      value1: '',
      value2:'',

      pickerOption: {
        disabledDate(time){
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '昨天',
          onClick(picker){
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick',date);
            //$emit用于子组件触发父组件的自定义事件
            //触发的自定义事件名称为'pick' ，date会默认传入作为pick事件的参数
          }
        },{
          text: '今天',
          onClick(picker){
            picker.$emit('pick',new Date());
          }
        },{
          text: '明天',
          onClick(picker){
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24);
            picker.$emit('pick',date);
          }
        }]
      }
    };
  }
}
</script>