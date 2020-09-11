<template>
  <div>
    <el-table
      :data="customers.slice((currentPage-1) * pagesize,currentPage * pagesize)"

      style="width: 100%">
      <el-table-column
        prop="cid"
        label="编号"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="cname"
        label="菜单名字"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="Lognum"
        label="账号"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="Pwd"
        label="密码"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="roles.Rname"
        label="职位"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="state"
        v-model="customers.state"
        style="width: 20%"
        label="状态">
        <el-switch slot-scope="scope"
                   v-model="scope.row.state ===1"
                   active-color="#5eb058"
                   inactive-color="#cccccc" @click.native="handleUpdate(scope.row)">
        </el-switch>
      </el-table-column>
      <el-table-column
        label="操作" style="width: 20%">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" content="添加用户">
            <el-button circle class="el-icon-circle-plus-outline" @click="InsertDialog = true"></el-button>
          </el-tooltip>
          <el-tooltip placement="bottom" content="重置密码,默认为123456">
            <el-button circle class="el-icon-refresh" @click="resetting(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip placement="bottom" content="添加权限">
            <el-button circle class="el-icon-plus" @click="queryManyMenu()"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="tit" :visible.sync="InsertDialog" width="700px">
      <el-form ref="fm" :rules="roles" :model="customer" style="width: 60%;margin-left: 100px" label-width="150px">
        <el-form-item label="姓名" prop="cname">
          <el-input v-model="customer.cname"></el-input>
        </el-form-item>
        <el-form-item label="登录名" prop="Lognum">
          <el-input v-model="customer.Lognum"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="Pwd">
          <el-input placeholder="密码" v-model="customer.Pwd" show-password></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="status" label="1">正常</el-radio>
          <el-radio v-model="status" label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="权限">
          <el-radio v-model="role" label="1">管理员</el-radio>
          <el-radio v-model="role" label="2">用户</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertDialog = false">取 消</el-button>
        <el-button type="primary" @click="insert()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" width="600px">
      <div class="block" style="margin-left: 150px">
        <span class="demonstration">权限信息</span>
        <el-cascader
          :options="options"
          v-model="props.value"
          :props="props"
          clearable></el-cascader>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeRole()">确 定</el-button>
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
      :total="this.customers.length">
    </el-pagination>
  </div>
</template>

<script>

  export default {
    name: 'menus',
    inject:['reload'],
    data(){
      return{
        props: {
          multiple: true,
          label:'parentName',
          children:'childList',
          value:'parentFid'
        },
        customers: [],
        customer:{},
        InsertDialog:false,
        dialogFormVisible: false,
        direction:'btt',
        tit:'添加用户',
        title:'权限设置',
        currentPage:1,
        roles:{
          cname:[{required:true,message:'姓名不能为空'}],
          Pwd:[{required:true,message:'密码不能为空'}],
          Lognum:[{required:true,message:'登录名不能为空'}],
        },
        role:'1',
        status:'1',
        pagesize:5,
        options: [{
          parentFid: 1,
          parentName: '东南',
          childList: [{
            parentFid: 2,
            parentName: '上海',
          },{
            parentFid: 3,
            parentName: '江苏',

          },{
            parentFid: 4,
            parentName: '浙江',
          },{
            parentFid: 5,
            parentName: '浙江',
          }]
        },{
          parentFid: 6,
          parentName: '东南',
          childList: [{
            parentFid: 7,
            parentName: '上海',
          },{
            parentFid: 8,
            parentName: '江苏',

          },{
            parentFid: 9,
            parentName: '浙江',
          },{
            parentFid: 10,
            parentName: '浙江',
          }]
        },{
          parentFid: 11,
          parentName: '东南',
          childList: [{
            parentFid: 12,
            parentName: '上海',
          },{
            parentFid: 13,
            parentName: '江苏',

          },{
            parentFid: 14,
            parentName: '浙江',
          },{
            parentFid: 15,
            parentName: '浙江',
          }]
        }
        ]
      }
    },
    created () {
      this.$axios.post('http://localhost:8080/cookbooktest/menu/queryCustomer').then(resp=>{
        this.customers = resp.data
      })
    },
    methods:{
      changeRole:function(){
        let a = []
        this.props.value.forEach(item=>{
          item.forEach(res=>{
            a.push(res)
          })
        })
        let arr = [...new Set(a)]
        let param = this.$qs.stringify({'arr':JSON.stringify(arr)})
        this.$axios.post('http://localhost:8080/cookbooktest/LoginMenu/changeRole',param).then(resp=>{
          if(resp.data === 1){
            this.$message('修改成功')
            this.reload();
          }
        })
      },
      queryManyMenu:function(){
        this.dialogFormVisible = true
        this.$axios.post('http://localhost:8080/cookbooktest/LoginMenu/getAllMenu').then(resp=>{
          this.$axios.post('http://localhost:8080/cookbooktest/LoginMenu/getAllMenuTwo').then(respp=>{
            this.options = resp.data
            for (let i = 0;i<4;i++){
              this.options[i].childList = respp.data[i].childList
            }
          })
        })

      },
      resetting:function(row){
        let Pwd = this.$qs.stringify({"Pwd":'123456', "cid":row.cid,})
        this.$axios.post('http://localhost:8080/cookbooktest/menu/updateCustomerPwd',Pwd).then(resp=>{
          if(resp.data === 1){
            this.$message('重置成功')
            this.reload()
          }
        })
      },
      insert:function(){
        let param = this.$qs.stringify({"cname":this.customer.cname,
        "Lognum":this.customer.Lognum,"Pwd":this.customer.Pwd,
        "state":this.status,"Rid":this.role})
        this.$refs['fm'].validate(valid=>{if(valid) {
          this.$axios.post('http://localhost:8080/cookbooktest/menu/insertCusotmer',param).then(resp=>{
            if(resp.data === 2){
              this.$message('添加成功')
              this.reload()
            }
          })
          }
        })
      },
      handleUpdate:function(row){
        this.$confirm('是否要修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = row.state === 1?0:1;
          let updates = this.$qs.stringify({"state":a, "cid":row.cid,})
          this.$axios.post('http://localhost:8080/cookbooktest/menu/updateCustomerState', updates).then(resp => {
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
      handleSizeChange: function (size) {
        this.pagesize = size;
        //console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        //console.log(this.currentPage)  //点击第几页
      }
    }
  }
</script>

<style scoped>

</style>
