<template>
  <div>
    <h2>{{ pageName }}</h2>
    <div v-if="token">
    <el-button style="float: left;" @click="add()"><i class="el-icon-plus"></i> 新增商品</el-button>
    <el-table :data="goodList" border style="width: 100%" :key="tableKey">
      <el-table-column prop="goodId" label="商品id" width="180">
      </el-table-column>
      <el-table-column prop="goodName" label="商品名称" width="180">
      </el-table-column>
      <el-table-column prop="goodDescribe" label="商品描述">
      </el-table-column>
      <el-table-column prop="goodPrice" label="商品单价">
      </el-table-column>
      <el-table-column prop="goodCount" label="商品余量">
      </el-table-column>
      <el-table-column prop="merchantId" label="商家id">
      </el-table-column>
      <el-table-column prop="goodDescribe" label="商品描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <!--通过scope获取所选行的内容，scope.row是一个对象-->
          <el-button @click="del(scope.row.goodId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>

    <h3 v-else @click="$router.replace({path: '/login'})">未登录管理员</h3>

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
        <el-form-item label="商家id">
          <el-input v-model="newGood.merchantId"></el-input>
        </el-form-item>
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

    <button @click="show()">打印数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '管理员商品管理',
      isEditDialog: false,
      isAddDialog: false,
      tableKey: 0,
      goodList: [],
      nowGood: '',
      newGood: {
        goodId: '',
        goodName: '',
        goodDescribe: '',
        goodPrice: 0,
        goodCount: 0,
        merchantId: 0
      }
    }
  },
  props: ["adminGoodList","goodLastId","token"],
  methods: {
    show() {
      console.log(this.adminGoodList);
    },
    add() {
      this.isAddDialog = true;
    },
    edit(good) {
      console.log("编辑")
      console.log(good);
      this.nowGood = good;
      this.isEditDialog = true;
    },
    del(goodId) {
      console.log("删除");
      this.$emit("updateAdminGood", goodId);
    },
    updateNowGood() {
      //编辑，
      this.$emit("updateAdminGood", this.nowGood);
      this.isEditDialog = false;
      this.tableKey += 1;
    },
    addNewGood() {       //增加商品
      //this.newGood.goodId = Number(this.goodsList[this.goodsList.length-1].goodId)+1+'';
      //this.goodsList[this.goodsList.length-1]为最新添加的一位，即当前新增商品，该商品还没有定义id
      this.newGood.goodId = this.goodLastId + 1;
      let temp = { ...this.newGood };
      //console.log(temp);
      //this.goodsList.push(temp);
      this.$emit("updateAdminGood", temp);
      this.newGood = {
        goodId: '',
        goodName: '',
        goodDescribe: '',
        goodPrice: 0,
        goodCount: 0,
        merchantId: 0
      };
      this.isAddDialog = false;
    },
    loadGoodList() {
      console.log(this.adminGoodList);
      return this.adminGoodList
    }
  },
  mounted() {
    this.goodList = this.loadGoodList();
  }
}
</script>