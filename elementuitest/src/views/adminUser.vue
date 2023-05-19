<template>
  <div>
    <h2>{{ pageName }}</h2>
    <div v-if="token">
      <el-button style="float: left;" @click="add()"><i class="el-icon-plus"></i> 新增用户账号</el-button>
      <el-table :data="userList" height="70vh" border style="width: 100%" :key="tableKey">
        <el-table-column prop="userId" label="id" width="180">
        </el-table-column>
        <el-table-column prop="name" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="del(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <h3 v-else @click="$router.replace({path: '/login'})">未登录管理员</h3>

    <!--编辑用户属性-->
    <el-dialog title="用户信息编辑" :visible.sync="isEditDialog">
      <el-form :model="nowUser">
        <el-form-item label="用户名">
          <el-input v-model="nowUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="nowUser.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isEditDialog = false">取消</el-button>
        <el-button @click="updateNowUser()">确定</el-button>
      </div>
    </el-dialog>

    <!--增加用户账号-->
    <el-dialog title="新增商品" :visible.sync="isAddDialog">
      <el-form :model="newUser">
        <el-form-item label="用户名">
          <el-input v-model="newUser.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="newUser.password"></el-input>
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
      pageName: '用户账号管理',
      isEditDialog: false,
      isAddDialog: false,
      tableKey: 0,
      userList: [],
      nowUser: '',
      newUser: {
        userId: '',
        name: '',
        password: '',
      }
    }
  },
  props: ["userAccountList", "userLastId", "token"],
  methods: {
    loadUserList() {
      return this.userAccountList
    },
    add() {
      this.isAddDialog = true;
    },
    edit(user) {
      this.nowUser = user;
      console.log("编辑用户账号信息");
      this.isEditDialog = true;
    },

    del(userId) {
      console.log("删除该用户");
      console.log(userId);
      if(userId == this.userAccountList[this.userAccountList.length - 1].userId){
        this.$emit("userLastId",userId);
        console.log("删除账户列表最后的id");
      }
      this.$emit("updateUserList", userId);
    },
    updateNowUser() {
      //编辑，
      this.$emit("updateUserList", this.nowUser);
      this.isEditDialog = false;
      this.tableKey += 1;
    },
    addNewGood() {
      this.newUser.userId = this.userLastId + 1;
      let temp = { ...this.newUser };
      this.$emit("updateUserList", temp);
      this.newUser = {
        userId: '',
        name: '',
        password: '',
      };
      this.isAddDialog = false;
    }
  },
  mounted() {
    this.userList = this.loadUserList();
  }
}
</script>