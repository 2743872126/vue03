<template>
  <div>
    <el-table
      :data="Back_LeaveMessage.slice((currentPage-1) * pagesize,currentPage * pagesize)"
      stripe
      style="width: 100%">
      <el-table-column
        prop="lid"
        label="编号"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="mname"
        label="作品名字"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="LeaveTime"
        label="留言时间"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="State"
        label="状态"
        style="width: 20%">
        <template slot-scope="scope">
          {{scope.row.State === 0?'未阅':'已阅'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="info"
        label="留言信息"
        :show-overflow-tooltip="true"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="uname"
        label="留言用户"
        style="width: 20%">
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-left: 600px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.Back_LeaveMessage.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Back_LeaveMessage',
    data(){
      return{
        currentPage:1,
        pagesize:10,
        Back_LeaveMessage:[],
      }
    },
    created () {
      this.$axios.post('http://localhost:8080/cookbooktest/BackWork/queryLeaveMessage').then(resp=>{
        this.Back_LeaveMessage = resp.data
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
      }
    }
  }
</script>

<style scoped>

</style>
