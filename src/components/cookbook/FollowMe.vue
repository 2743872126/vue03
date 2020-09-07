<template>
  <div>
    <p class="ps"><span @click="()=>{this.$router.push({name:'Follows'})}">我关注的</span>       |        <span class="span">关注我的</span> </p>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 1000]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'FollowMe',
    data(){
      return {
        isshow:false,
        // diyMethods:'',
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
      }
    },
    methods: {
      // 每页显示的条数
      handleSizeChange(val) {
        // 改变每页显示的条数
        this.PageSize=val
        // 注意：在改变每页显示的条数时，要将页码显示到第一页
        this.currentPage=1
      },
      // 显示第几页
      handleCurrentChange(val) {
        // 改变默认的页数
        this.currentPage=val
      },
    },
  }
</script>

<style scoped>
  .ps{
    text-align: left;
    font-weight: 100;
    font-size: 40px;
  }
  .span{
    color:red;
  }
</style>
