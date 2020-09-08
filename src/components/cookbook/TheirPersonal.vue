<template>
  <div class="container">
      <div class="top">
            <div style="float: left;margin-left: 100px">
              <el-avatar :size="200" :src="'/static/jpg/'+userinfos.pic" style="margin-top: 40px;margin-bottom: -40px"></el-avatar>
              <span style="font-size: 50px">{{this.userinfos.uname}}的厨房</span>
              <span style="font-size: 20px">{{this.userinfos.createTime.substring(0,10)}}加入</span>
            </div>
           <div style="text-align: right">

             <el-tooltip style="margin-left: 100px;font-size: 22px" class="item" effect="dark" :content="userinfos.selfinfo" placement="top-end">
               <el-button>个人签名<i class="el-icon-view el-icon--right"></i></el-button>
             </el-tooltip><br>
             <el-button round class="buts">关注的人<br>
               {{follows.length}}
             </el-button>
             <el-button round class="buts">
               被关注<br>
               {{followsMe.length}}
             </el-button>
             <el-button round class="buts" @click="changestate">
               <span v-show="isFollow">关注</span><span v-show="!isFollow">取关</span><br>
             </el-button>
           </div>
      </div>
      <div class="main">
        <el-menu
          :router="true"
          class="el-menu-demo"
          mode="horizontal"
          background-color="crimson"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="2" :route="{name:'ThierMenus',params:{menus:menus}}">菜谱{{menus.length}}</el-menu-item>
          <el-menu-item index="3" :route="{name:'ThireWorks',params:{works:works}}">作品{{works.length}}</el-menu-item>
          <el-menu-item index="5" :route="{name:'ThireStudio',params:{'uid':userinfos.uid}}">课程</el-menu-item>
        </el-menu>
        <div>
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'TheirPersonal',
    data(){
      return {
        userinfos:{},
        follows:[],
        followsMe:[],
        menus:[],
        works:[],
        isFollow:false,
      }
    },
    created:function(){
      let uid=this.$route.params.uid;
      this.$axios.post("http://localhost:8080/cookbooktest/studioQueryuser",this.$qs.stringify({uid:uid}))
          .then(res=>{
            this.userinfos=res.data;
          })
      this.$axios.post("http://localhost:8080/cookbooktest/queryguanzhu",this.$qs.stringify({uid:uid}))
        .then(res=>{
          this.follows=res.data;
        })
      this.$axios.post("http://localhost:8080/cookbooktest/querybeiguanzhu",this.$qs.stringify({uid:uid}))
        .then(res=>{
          this.followsMe=res.data;
        })
      this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryAllByuid",this.$qs.stringify({uid:uid}))
        .then(res=>{
          this.menus=res.data;
        })
      this.$axios.post("http://localhost:8080/cookbooktest/WorksController/querybyuid",this.$qs.stringify({uid:uid}))
        .then(res=>{
          this.works=res.data;
        })
    },methods:{
      changestate(){
        this.$router.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:uid}))
          .then(res=>{
            alert(res.data)
          })
      }
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
    width: 100px;
    background-color: crimson;
    color: white;
    font-size: 18px;
    font-weight: 900;
  }
</style>
