<template>
    <div>
      <el-table
        :data="OrderDetails.slice((currentPage-1) * PageSize,currentPage * PageSize)"
        stripe
        style="width: 100%">
        <el-table-column
          prop="utid"
          label="订单编号"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="uname"
          label="订单用户"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="订单课程"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="Pay"
          label="订单支付"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="Income"
          label="订单收入"
          style="width: 20%">
        </el-table-column>
        <el-table-column
          prop="MadeTime"
          label="订单生成时间"
          style="width: 20%">
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-left: 600px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="PageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.OrderDetails.length">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "details",
        data(){
          return{
            OrderDetails:[],
            PageSize:10,
            currentPage:1,
          }
        },
        created() {
          this.$axios.post('http://localhost:8080/cookbooktest/BackOrderDetailController/backOrderDetailQuery')
            .then(resp=>{
              this.OrderDetails = resp.data
            })
        },
        methods:{
          handleSizeChange: function (size) {
            this.pagesize = size;
            //console.log(this.pagesize)  //每页下拉显示数据
          },
          handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            //console.log(this.currentPage)  //点击第几页
          }
        }
    }
</script>

<style scoped>

</style>
