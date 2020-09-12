<template>
  <div>
    <el-table
      :data="Users.slice((currentPage-1) * pagesize,currentPage * pagesize)"
      style="width: 100%">
      <el-table-column
        prop="uid"
        v-model="User.uid"
        label="编号"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="uname"
        v-model="User.uname"
        label="姓名"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="pwd"
        v-model="User.Pwd"
        style="width: 20%"
        label="密码">
       <!-- {{PwdStr(Users.Pwd)}}-->
      </el-table-column>
      <el-table-column
        prop="phone"
        v-model="User.phone"
        style="width: 20%"
        label="电话">
      </el-table-column>
      <el-table-column
        style="width: 20%"
        label="头像">
        <template slot-scope="scope">
          <el-image style="width: 60px;height: 60px;"
                    :src="'static/jpg/'+scope.row.pic"
                    :preview-src-list="['static/jpg/'+scope.row.pic]"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="Sex"
        v-model="User.sex"
        style="width: 20%"
        label="性别">
        <template slot-scope="scope">
          {{scope.row.sex === 1?'男':'女'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="birthday"
        v-model="User.birthday"
        style="width: 20%"
        label="生日">
        <template slot-scope="scope">
          {{formatDate(scope.row.birthday)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        v-model="User.createTime"
        style="width: 20%"
        label="创建时间">
        <template slot-scope="scope">
          {{formatDate(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column
        prop="state"
        v-model="User.state"
        style="width: 20%"
        label="状态">
        <template slot-scope="scope">
          {{scope.row.state==1?'星级厨师':'普通用户'}}
        </template>
        <!--<el-switch slot-scope="scope"
        v-model="scope.row.state ===1"
        active-color="#5eb058"
        inactive-color="#cccccc" @click.native="handleUpdate(scope.row)">
        </el-switch>-->
      </el-table-column>
         <!-- <el-switch
            slot-scope="scope"
            v-model="scope.row.state"
            active-color="#5eb058"
            inactive-color="#cccccc"
            @click.native="handleUpdate(scope.row)">
          </el-switch>-->
      <!--<el-table-column
        style="width: 10%"
        label="操作">
        &lt;!&ndash;<template slot-scope="scope">
          <el-button class="el-icon-plus" @click="show()"></el-button>
        </template>&ndash;&gt;
        <el-tooltip placement="bottom" content="添加用户">
          <el-button circle class="el-icon-plus" @click="show()"  style="margin-left: 16px;"></el-button>
        </el-tooltip>
      </el-table-column>-->
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :rules="roles" :model="User" style="width: 60%;margin-left: 100px" label-width="150px">
        <!--<el-form-item label="编号">
          <el-input v-model="User.uid" readonly style="margin-left: 50px "></el-input>
        </el-form-item>-->
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="User.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pwd">
        <el-input placeholder="密码" v-model="User.Pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="User.createTime"
            type="date"
            style="margin-left: 50px "
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="status" label="1">正常</el-radio>
          <el-radio v-model="status" label="0">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      style="margin-left: 600px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.Users.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Users',
    inject:['reload'],
    data(){
      return{
        title:'添加',
        dialogFormVisible: false,
        currentPage:1,
        pagesize:10,
        Users:[],
        User:{},
        status:1,
        roles:{
          uname:[{required:true,message:'姓名不能为空'}],
          Pwd:[{required:true,message:'密码不能为空'}],
        },
        Pics:[{
          pic:'',
        }]
      }
    },
    methods:{
      PwdStr(str) {
        if (str.length > 7) {
          return str.substring(0, 3) + '****' + str.substring(7, str.length);
        } else {
          return str.substring(0, str.length - 1) + '****';
        }
      },
      formatDate: function(date) {
        const dateTime = new Date(date);
        const YY = dateTime.getFullYear();
        const MM =
          dateTime.getMonth() + 1 < 10
            ? '0' + (dateTime.getMonth() + 1)
            : dateTime.getMonth() + 1;
        const D =
          dateTime.getDate() < 10 ? '0' + dateTime.getDate() : dateTime.getDate();
        const hh =
          dateTime.getHours() < 10
            ? '0' + dateTime.getHours()
            : dateTime.getHours();
        const mm =
          dateTime.getMinutes() < 10
            ? '0' + dateTime.getMinutes()
            : dateTime.getMinutes();
        const ss =
          dateTime.getSeconds() < 10
            ? '0' + dateTime.getSeconds()
            : dateTime.getSeconds();
        return `${YY}-${MM}-${D} ${hh}:${mm}`;
      },
      handleUpdate:function(row){
        this.$confirm('是否要修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = row.state === 1?0:1;
          let updates = this.$qs.stringify({"state":a, "uid":row.uid,})
          this.$axios.post('http://localhost:8080/cookbooktest/backstage_users/updateUsers', updates).then(resp => {
            if (resp.data == 1) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
              this.reload()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });
        });
      },
      show: function (row) {
        if (row == null) {
          this.title = '添加';
          this.dialogFormVisible = true;
        }
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        //console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        //console.log(this.currentPage)  //点击第几页
      },
      update:function(row) {
          let adds = this.$qs.stringify({"uname":this.User.uname,"Pwd":this.User.Pwd,
            "createTime":this.User.createTime,"state":this.status})
          this.$axios.post('http://localhost:8080/cookbooktest/backstage_users/addUsers', adds).then(resp => {
            if (resp.data == 1) {
              this.dialogFormVisible= false
              this.$message('添加成功')
              this.reload()
            }
          })
        }
    },
    created() {
      this.$axios.post('http://localhost:8080/cookbooktest/backstage_users/queryUsers').then(resps=>{
        this.Users = resps.data
      })
    }
  }
</script>

<style scoped>
  .el-switch.is-disabled .el-switch__core, .el-switch.is-disabled .el-switch__label{
    cursor: pointer;
  }
</style>
