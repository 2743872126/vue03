<template>
  <div class="container">
      <div class="top">
            <div style="float: left;margin-left: 100px">
              <el-avatar :size="200" :src="userinfo.pic" style="margin-top: 40px;margin-bottom: -40px"></el-avatar>
              <span style="font-size: 50px">{{this.userinfo.uname}}的厨房</span>
              <span style="font-size: 20px">{{this.userinfo.createTime.substring(0,10)}}加入</span>
            </div>
           <div style="text-align: right">

             <el-tooltip style="margin-left: 100px;font-size: 22px" class="item" effect="dark" :content="this.userinfo.selfinfo" placement="top-end">
               <el-button>个人签名<i class="el-icon-view el-icon--right"></i></el-button>
             </el-tooltip><br>
             <el-button round class="buts">关注的人<br>
               {{this.userinfo.users.length}}
             </el-button>
             <el-button round class="buts">
               被关注的人<br>
               {{this.userinfo.follows.length}}
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
          <el-menu-item index="6" :route="{name:'General'}" style="float: right">草稿箱</el-menu-item>
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
      this.$axios.post("http://localhost:8080/cookbooktest/queryusercollectedstudio",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          this.$store.state.user.userInfo.user_studios.studioList=res.data;
        })
      this.userinfo=this.$store.state.user.userInfo;
    }
  }
</script>

<style scoped>
  .container{
    width: 80%;
    text-align: center;
    margin-left: 10%
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
    font-size: 22px;
  }
  .buts{
    width: 200px;
    background-color: crimson;
    color: white;
    font-size: 22px;
    font-weight: 900;
  }
</style>
