<template>
  <div>
    <h2>{{ pageName }}</h2>
    <div v-if="token">
      <el-button style="float: left;" @click="add()"><i class="el-icon-plus"></i> 新增商家账号</el-button>
      <el-table :data="merchantList" height="70vh" border style="width: 100%">
        <el-table-column prop="merchantId" label="商家id" width="180">
        </el-table-column>
        <el-table-column prop="merchantName" label="商家名称" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="del(scope.row.merchantId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h3 v-else @click="$router.replace({path: '/login'})">未登录管理员</h3>

    <!--编辑商家属性-->
    <el-dialog title="商家信息编辑" :visible.sync="isEditDialog">
      <el-form :model="nowMerchant">
        <el-form-item label="商家名称">
          <el-input v-model="nowMerchant.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="nowMerchant.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditDialog = false">取消</el-button>
        <el-button @click="updateNowMerchant()">确定</el-button>
      </div>
    </el-dialog>

    <!--增加商家账号-->
    <el-dialog title="新增商品" :visible.sync="isAddDialog">
      <el-form :model="newMerchant">
        <el-form-item label="用户名">
          <el-input v-model="newMerchant.merchantName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newMerchant.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isAddDialog = false;">取消</el-button>
        <el-button @click="addNewMerchant()">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pageName: '商家账号管理',
      isEditDialog: false,
      isAddDialog: false,
      tableKey: 0,
      merchantList: [],
      nowMerchant: '',
      newMerchant: {
        merchantId: '',
        merchantName: '',
        merchantPhone: '',
        password: '',
      }
    }
  },
  props: ["merchantAccountList", "merchantLastId", "token"],
  methods: {
    loadMerchantList() {
      return this.merchantAccountList
    },
    add() {
      this.isAddDialog = true;
    },
    edit(merchant) {
      this.nowMerchant = merchant;
      console.log("编辑商家账号信息");
      this.isEditDialog = true;
    },

    del(merchantId) {
      console.log("删除该商家");
      console.log(merchantId);
      if(merchantId == this.merchantAccountList[this.merchantAccountList.length - 1].merchantId){
        this.$emit("merchantLastId",merchantId);
      }
      this.$emit("updateMerchantList", merchantId);
    },
    updateNowMerchant() {
      //编辑，
      this.$emit("updateMerchantList", this.nowMerchant);
      this.isEditDialog = false;
      this.tableKey += 1;
    },
    addNewMerchant() {
      this.newMerchant.merchantId = this.merchantLastId + 1;
      let temp = { ...this.newMerchant };
      this.$emit("updateMerchantList", temp);
      this.newMerchant = {
        merchantId: '',
        merchantName: '',
        merchantPhone: '',
        password: '',
      };
      this.isAddDialog = false;
    }
  },
  mounted() {
    this.merchantList = this.loadMerchantList();
  }
}
</script>