<template>
  <div>
    <!-- <h2>{{ pageName }}</h2> -->
    <div v-if="token != ''">
      <el-button style="float: left;" @click="add()"><i class="el-icon-plus"></i> 新增商品</el-button>
      <el-table :data="goodsList" stripe style="width: 100%;margin: auto;" :key="tableKey">
        <el-table-column prop="goodId" label="商品id"></el-table-column>
        <el-table-column prop="goodName" label="商品名称"></el-table-column>
        <el-table-column prop="goodDescribe" label="描述"></el-table-column>
        <el-table-column prop="goodPrice" label="单价"></el-table-column>
        <el-table-column prop="goodCount" label="余量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <!--通过scope获取所选行的内容，scope.row是一个对象-->
            <el-button @click="del(scope.row.goodId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h3 v-else @click="$router.replace({path: '/login'})">请登录商家账户</h3>


    <!--编辑商品属性-->
    <el-dialog title="商品信息编辑" :visible.sync="isEditDialog">
      <el-form :model="nowGood">
        <el-form-item label="商品名称">
          <el-input v-model="nowGood.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品单价">
          <el-input v-model="nowGood.goodPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品余量">
          <el-input v-model="nowGood.goodCount"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品分类">
          <el-input v-model="nowGood.goodSort"></el-input>
        </el-form-item> -->
        <el-form-item label="商品描述">
          <el-input v-model="nowGood.goodDescribe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditDialog = false">取消</el-button>
        <el-button @click="updateNowGood()">确定</el-button>
      </div>
    </el-dialog>

    <!--新增商品信息-->
    <el-dialog title="新增商品" :visible.sync="isAddDialog">
      <el-form :model="newGood">
        <el-form-item label="商品名称">
          <el-input v-model="newGood.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品单价">
          <el-input v-model="newGood.goodPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品余量">
          <el-input v-model="newGood.goodCount"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input v-model="newGood.goodDescribe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAddDialog = false;">取消</el-button>
        <el-button @click="addNewGood()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '商品管理',
      //token: '',
      isEditDialog: false,
      isAddDialog: false,
      tableKey: 0,  //用于刷新商品列表
      goodsList: [],    //商品列表
      nowGood: '',      //点击编辑的商品
      newGood: {        //新增商品
        goodId: '',
        goodName: '',
        goodDescribe: '',
        goodPrice: 0,
        goodCount: 0,
        merchantId:0
      }
    }
  },
  props: ['merchantGoodsList', 'goodLastId','merchant_token'],
  methods: {
    edit(good) {      //编辑商品，出现弹框
      this.isEditDialog = true;
      this.nowGood = { ...good };
    },
    del(goodId) {     //删除商品
      // for (let i = 0; i < this.goodsList.length; i++) {
      //   if (this.goodsList[i].goodId == goodId) {
      //     this.goodsList.splice(i, 1);
      //     this.$emit("updateGoodsList", goodId);
      //   }
      // }
      this.$emit("updateGoodsList",goodId);
    },
    add() {     //增加商品，出现弹框
      this.isAddDialog = true;
    },

    updateNowGood() {     //修改商品信息
      // for (let i = 0; i < this.goodsList.length; i++) {
      //   if (this.goodsList[i].goodId == this.nowGood.goodId) {
      //     this.goodsList[i] = this.nowGood;
      //   }
      // }
      this.$emit("updateGoodsList",this.nowGood);
      //更新列表，要实现数据的动态绑定
      this.isEditDialog = false;
      this.tableKey += 1;    //更新商品列表结束后，更新key的值，实现表格刷新
      //但是一直往上加的话tablekey会很大，改成在0 1之间变换
    },
    addNewGood() {       //增加商品
      //this.newGood.goodId = Number(this.goodsList[this.goodsList.length-1].goodId)+1+'';
      //this.goodsList[this.goodsList.length-1]为最新添加的一位，即当前新增商品，该商品还没有定义id
      this.newGood.goodId = this.goodLastId + 1;
      this.newGood.merchantId = this.merchant_token;
      let temp = { ...this.newGood };
      //console.log(temp);
      //this.goodsList.push(temp);
      this.$emit("updateGoodsList", temp);
      this.newGood = {
        goodId: '',
        goodName: '',
        goodDescribe: '',
        goodPrice: 0,
        goodCount: 0
      };
      this.isAddDialog = false;
    },
    loadGoodsList() {      //加载商品列表
      return this.merchantGoodsList;
    }
  },
  computed:{
    token(){
      return this.merchant_token;
    }
  },
  mounted() {
    this.goodsList = this.loadGoodsList();
  }
}
</script>