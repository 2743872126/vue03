<template>
    <div>
      <div class="ps"><span class="span">我关注的</span>         |        <span @click="()=>{this.$router.push({name:'FollowMe'})}">关注我的</span></div>

      <div style="border:1px solid burlywood;margin-bottom: 50px;height: 100px;margin-left:3%;float: left;line-height: 100px;width: 30%;" v-for="v in users.slice((currentPage-1)*PageSize,currentPage*PageSize)">
        <router-link :to="{name:'TheirPersonal',params:{uid:v.uid}}" >
          <el-image lazy style="margin : 0 0 0 0;float: left;height: 100%;width: 100px;" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
          <a style="color: crimson;margin-left: -50px">{{v.uname}}</a>
        </router-link>
      </div>
      <el-pagination style="clear: both;" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 200, 1000]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalCount"></el-pagination>
    </div>
</template>

<script>
  export default {
    name: 'Follows',
    data(){
      return {
        // diyMethods:'',
        // 默认显示第几页
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:1,
        PageSize:3,
        users:[],
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
      }
    },created(){
      if(undefined!=this.$route.params.uid){
        this.$axios.post("http://localhost:8080/cookbooktest/queryguanzhu",this.$qs.stringify({uid:this.$route.params.uid})).then(res=>{
          this.users=res.data;
          this.totalCount=res.data.length;
        })
      }else{
        this.$axios.post("http://localhost:8080/cookbooktest/queryguanzhu",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          this.users=res.data;
          this.totalCount=res.data.length;
        })
      }
    }
  }
</script>

<style scoped>
  .ps{
    font-size: 20px;
    line-height: 80px;
  }
  .span{
    color: red;
  }
</style>
