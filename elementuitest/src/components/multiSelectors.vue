<template>
  <div>
    <el-select v-model="value1" multiple collapse-tags placeholder="请选择">
      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"
        :disabled="item.disabled">
        <span style="float: left">{{ item.label }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
        <!-- 两个span用于显示自定义备选项 -->
      </el-option>
    </el-select>

    <el-select v-model="value2" filterable placeholder="请选择">
      <el-option-group v-for="group in options2" :key="group.key" :label="group.label">
        <el-option v-for="item in group.options" :key="item.key" :label="item.label" :value="item.label"></el-option>
      </el-option-group>
    </el-select>

    <el-select v-model="value3" multiple filterable remote reserve-keyword placeholder="请输入关键词"
      :remote-method="remoteMethod" :loading="loading">
      <!-- 输入值发生改变时调用remote-methid的方法 -->
      <el-option v-for="item in options3" :key="item.key" :label="item.label" :value="item.value">
      <!-- 当el-option是用v-for渲染时，要添加key为唯一标识符 -->
      </el-option>
    </el-select>
  </div>
</template>

<script>
// for (let i = 1;i <= 5;i ++) {
 
//   setTimeout(function timer() {
 
//       console.log(i)
 
//   },i * 1000)
 
// }

export default {
  data() {
    return {
      options1: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',

      options2: [{
        label: '热门城市',
        options: [{
          label: '北京',
          value: 'Beijing'
        }, {
          label: '上海',
          value: 'Shanghia'
        }]
      }, {
        label: '城市名',
        options: [{
          label: '成都',
          value: 'Chengdu'
        }, {
          label: '深圳',
          value: 'Shenzhen'
        }, {
          label: '广州',
          value: 'Guangzhou'
        }, {
          label: '大连',
          value: 'Dalian'
        }]
      }],
      value2: '',

      options3: [],   //过滤后展示出的选项列表
      value3: [],
      list: [],   //完整列表，即states中内容
      loading: false,
      states: ["Alabama", "Alaska", "Arizona",
        "Arkansas", "California", "Colorado",
        "Connecticut", "Delaware", "Florida",
        "Georgia", "Hawaii", "Idaho", "Illinois",
        "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland",
        "Massachusetts", "Michigan", "Minnesota",
        "Mississippi", "Missouri", "Montana",
        "Nebraska", "Nevada", "New Hampshire",
        "New Jersey", "New Mexico", "New York",
        "North Carolina", "North Dakota", "Ohio",
        "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina",
        "South Dakota", "Tennessee", "Texas",
        "Utah", "Vermont", "Virginia",
        "Washington", "West Virginia", "Wisconsin",
        "Wyoming"]
    }
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` ,key: `key:${item}`};
    });
    //做提前定义，states数组中的每个元素只有一个名称，但是需要value及label，这里通过map将名称作为每个元素的value和label
    //map函数作用：根据指定的函数对序列进行映射→以参数序列中的每一个元素分别调用指定函数，并将调用后的结果返回并保存
  },
  methods: {
    remoteMethod(query) {   //传入参数query为输入值
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options3 = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options3 = [];
      }
    }
  }
}
</script>