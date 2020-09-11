<template>
  <div>
  <el-table
    :data="menuFunction.slice((currentPage-1) * pagesize,currentPage * pagesize)"
    stripe
    style="width: 100%">
    <el-table-column
      prop="fid"
      label="编号"
      width="500px">
    </el-table-column>
    <el-table-column
      prop="fname"
      label="菜单名字"
      width="500px">
    </el-table-column>
    <el-table-column
      prop="flevel"
      label="级别"
      width="500px">
      <template slot-scope="scope">
        {{scope.row.flevel === 0?'一级菜单':'二级菜单'}}
      </template>
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <el-tooltip placement="bottom" content="修改菜单">
        <el-button circle class="el-icon-scissors" @click="show(scope.row)"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="800px">
    <el-form ref="fm" :rules="roles" :model="menuFunctions" style="width: 60%;margin-left: 100px" label-width="150px">
      <el-form-item label="编号">
        <el-input v-model="menuFunctions.fid"  readonly></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="fname">
        <el-input v-model="menuFunctions.fname" ></el-input>
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
      :total="this.menuFunction.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'functions',
    inject:['reload'],
    data(){
      return{
        roles:{
          fname:[{required:true,message:'姓名不能为空'}],
        },
        menuFunction:[],
        menuFunctions: {},
        title:'',
        currentPage:1,
        pagesize:5,
        dialogFormVisible:false
      }
    },
    created () {
      this.$axios.post('http://localhost:8080/cookbooktest/menu/queryFunction').then(resp=>{
        this.menuFunction = resp.data
      })
    },
    methods:{
      handleSizeChange: function (size) {
        this.pagesize = size;
        //console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
        //console.log(this.currentPage)  //点击第几页
      },
      show: function (row) {
        if(row != null){
          this.title = '修改菜单';
          this.dialogFormVisible = true;
          this.menuFunctions = Object.assign({},row);
        }
      },
      update:function (row) {
        let udp = this.$qs.stringify({"Fname":this.menuFunctions.fname,"Fid":this.menuFunctions.fid})
        this.$refs['fm'].validate(valid=>{if(valid) {
          this.$axios.post('http://localhost:8080/cookbooktest/menu/updateFunction',udp).then(resp=>{
          if(resp.data == 1){
            this.dialogFormVisible = false
            this.$message('修改成功')
            this.reload()
          }
        })
        }
        })
      }
    }
  }
</script>

<style scoped>

</style>
