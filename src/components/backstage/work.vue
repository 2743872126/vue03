<template>
  <div>
    <el-table
      :data="backWork.slice((currentPage-1) * pagesize,currentPage * pagesize)"
      stripe
      style="width: 100%">
      <el-table-column
        prop="Wid"
        label="编号"
        width="300px">
      </el-table-column>
      <el-table-column
        prop="Mname"
        label="作品名字"
        width="310px">
      </el-table-column>
      <el-table-column
        prop="uname"
        label="评论用户"
        width="310px">
      </el-table-column>
      <el-table-column
        label="作品图片"
        width="310px">
        <template slot-scope="scope">
          <el-image style="width: 60px;height: 60px;"
                    :src="'static/'+scope.row.Pic"
                    :preview-src-list="['static/'+scope.row.Pic]"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="MakeTime"
        label="时间"
        width="310px">
      </el-table-column>
      <el-table-column
        prop="Winfo"
        label="作品描述"
        :show-overflow-tooltip="true"
        width="310px">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.backWork.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'work',
    data(){
      return{
        currentPage:1,
        pagesize:5,
        backWork:[],
        Pics:[{
          pic:''
        }]
      }
    },
    created () {
      this.$axios.post('http://localhost:8080/cookbooktest/BackWork/queryWork').then(resp=>{
        this.backWork = resp.data
        this.Pics.pic = resp.data.Pics
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
