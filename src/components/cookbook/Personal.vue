<template>
  <div class="container">
      <div class="top">
            <div style="float: left;margin-left: 100px">
              <el-avatar :size="100" :src="'/static/jpg/'+userinfo.pic" style="margin-top: 40px;"></el-avatar>
              <span style="font-size: 30px">{{this.userinfo.uname}}的厨房</span>&nbsp;&nbsp;
              <span style="font-size: 18px">{{this.userinfo.createTime.substring(0,10)}}加入</span>
            </div>
           <div style="text-align: right">

             <el-tooltip style="margin-left: 100px;font-size: 22px" class="item" effect="dark" :content="this.userinfo.selfinfo" placement="top-end">
               <el-button>个人签名<i class="el-icon-view el-icon--right"></i></el-button>
             </el-tooltip><br>
             <el-button @click="()=>{this.$router.push({name:'Follows'})}" round class="buts">关注的人<br>
               {{users}}
             </el-button>
             <el-button @click="()=>{this.$router.push({name:'FollowMe'})}" round class="buts">
               被关注<br>
               {{follow}}
             </el-button>
           </div>
      </div>
      <div class="main">
        <el-menu
          :router="true"
          class="el-menu-demo"
          :default-active="this.$route.query.actives===null?1:this.$route.query.actives"
          mode="horizontal"
          background-color="crimson"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" :route="{name:'General'}">概况</el-menu-item>
          <el-menu-item index="2" :route="{name:'Mymenus'}">菜谱{{this.userinfo.munus.length}}</el-menu-item>
          <el-menu-item index="3" :route="{name:'Myworks'}">作品{{this.userinfo.works.length}}</el-menu-item>
          <el-menu-item index="4" :route="{name:'Collected'}">收藏</el-menu-item>
          <el-menu-item index="5" :route="{name:'MyStudio'}">课程</el-menu-item>
          <el-menu-item v-if="$store.state.user.userInfo.state==1" index="7" :route="{name:'Turnover'}">流水</el-menu-item>
        </el-menu>
        <div>
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'Personal',
    data(){
      return {
        userinfo:{},
        users:0,
        follow:0,
      }
    },
    created:function(){
        this.$axios.post("http://localhost:8080/cookbooktest/querymenuworklevelmessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
          .then(res=>{
            this.$store.state.user.userInfo.munus=res.data;
          })
        this.$axios.post("http://localhost:8080/cookbooktest/queryworkstartmessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
          .then(res=>{
            this.$store.state.user.userInfo.works=res.data;
          })
        this.$axios.post("http://localhost:8080/cookbooktest/queryusercollectedmenu",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
          .then(res=>{
            this.$store.state.user.userInfo.user_menus.menus=res.data;
          })
        this.userinfo=this.$store.state.user.userInfo;
      this.$axios.post("http://localhost:8080/cookbooktest/queryguanzhu",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          this.users=res.data.length;
        })
      this.$axios.post("http://localhost:8080/cookbooktest/querybeiguanzhu",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          this.follow=res.data.length;
        })

    }
  }
</script>

<style scoped>
  .container{
    width: 73%;
    text-align: center;
    margin-left: 12%
  }
  .top{
    margin-bottom: -40px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .main{

    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .el-menu-item{
    font-size: 18px;
  }
  .buts{
    width: 150px;
    background-color: crimson;
    color: white;
    font-size: 18px;
    font-weight: 500;
    margin-top: -100px;
  }
</style>
