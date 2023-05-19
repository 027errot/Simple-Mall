<template>
  <div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <hello-world msg="Welcome to Your Vue.js App"></hello-world>
    <el-row :gutter="20">
      <!---间隔20px-->
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-row>
            <el-button round>朴素按钮</el-button>
            <el-button type="primary" plain>主要按钮</el-button>
            <el-button type="success" plain disabled>成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" :loading="true" round>主要按钮</el-button>
          <el-button type="primary" icon="el-icon-share"></el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button-group>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
            <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple-light" @change="outputRadionum(radio)">
          <el-radio v-model="radio" label="1">语文</el-radio>
          <el-radio v-model="radio" label="2">数学</el-radio>
          <el-radio v-model="radio" disabled label="3">英语</el-radio>
          <!--选中即修改value为对应的label值，label不可改为value，-->
          <!--value值已经通过v-model绑到了radio了，选择对应的选项后，会将radio的值修改为label的值-->

          <!-- <el-radio-group v-model="radioNum" @change="outputRadionum(radioNum)">
            <el-radio :label="3" value="1">备选项</el-radio>
            <el-radio :label="6" value="2">备选项</el-radio>
            <el-radio :label="9" value="3">备选项</el-radio>
          </el-radio-group> -->

          <!-- <el-radio-group v-model="radio3" size="small">
            <el-radio label="1" border>备选项1</el-radio>
            <el-radio label="2" border disabled>备选项2</el-radio>
          </el-radio-group> -->

          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
            <el-checkbox label="禁用" disabled></el-checkbox>
            <el-checkbox label="选中且禁用" disabled></el-checkbox>
          </el-checkbox-group>

          <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                  </el-checkbox>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
                  </el-checkbox-group> -->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- <el-input placeholder="请输入内容" v-model="input" clearable show-password disabled>
                  </el-input> -->
          <el-input placeholder="Enter" v-model="input" prefix-icon="el-icon-delete-solid" suffix-icon="el-icon-delete">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple-light">
          <el-input placeholder="请输入" type="textarea" v-model="textarea" :autosize="{ minRows: 2, maxRows: 5 }">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6" :offset="3">
        <div class="grid-content bg-purple">
          <el-input placeholder="1-2" v-model="inputPrepend">
            <template slot="prepend">Http://</template>
            <template slot="append"><i class="el-icon-more-outline"></i></template>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10" type="flex" justify="space-around">
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple"></div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple-light"></div>
      </el-col>
    </el-row>
    <!-- <input-self-defined></input-self-defined>
    <input-number></input-number>
    <multi-slider></multi-slider> -->
    <!-- <multi-selectors></multi-selectors>
    <multi-cascader></multi-cascader> -->
    <multi-switchs></multi-switchs>
    <upload></upload>
    <rate-style></rate-style>
    <!-- <multi-time-select></multi-time-select> -->
    <!-- <multi-date-picker></multi-date-picker> -->
  </div>
</template>

<script>
import HelloWorld from './HelloWorld.vue'
//import inputSelfDefined from './inputSelfDefined.vue'
//import inputNumber from './inputNumber.vue'
//import multiSelectors from './multiSelectors.vue'
//import MultiCascader from './multiCascader.vue'
import MultiSwitchs from './multiSwitchs.vue'
//import MultiSlider from './multiSlider.vue'
//import MultiTimeSelect from './multiTimeSelect.vue'
//import MultiDatePicker from './multiDatePicker.vue'
import Upload from './fileUpload.vue'
import RateStyle from './RateStyle.vue'


const cityOptions = ['北京', '上海', '广州', '深圳'];
//v-for遍历这个数组来获取多个选项，并将名称作为label和index

export default {
  name: 'myMain',
  data() {
    return {
      radio: '3',
      radioNum: 6,
      radio3: '2',
      checkList: ["复选框 A", "复选框 C", "选中且禁用"],
      value: "2",

      checkAll: false,
      checkedCities: ['上海', '北京'],    //默认选中的项
      cities: cityOptions,
      isIndeterminate: true,

      input: "",
      textarea: "12",
      inputPrepend: "",
      inputAppend: ""
    }
  },
  methods: {
    handleCheckAllChange(val) {     //val为勾选的项
      this.checkedCities = val ? cityOptions : [];    //若有勾选内容（val为true），设置为全选（当前勾选的项chechedCities同cityOptions数组中内容），否则将勾选项的数组设为空（全不选）
      this.isIndeterminate = false;   //不显示部分勾选时的样式（手动选择全选框，只有可能是全选或全不选，此时不可能出现部分勾选的样式）
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;    //当前勾选的项的个数
      this.checkAll = checkedCount === this.cities.length;    //如果复选框全勾上了就把全选框也勾上
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;   //设置全选框的样式，有选但是没有全选时显示样式
    },
    outputRadionum(value){
      console.log(value);
    }
  },
  components: {
    HelloWorld,
    //inputSelfDefined,
    //inputNumber,
    //multiSelectors,
    //MultiCascader,
    MultiSwitchs,
    //MultiSlider,
    //MultiTimeSelect,
    //MultiDatePicker,
    Upload,
    RateStyle
}
}
</script>