<template>
  <div class="container">
      <div class="top">
            <div style="float: left;margin-left: 100px">
              <el-avatar :size="100" :src="'/static/jpg/'+userinfos.pic" style="margin-top: 40px"></el-avatar>
              <span style="font-size: 30px">{{this.userinfos.uname}}的厨房</span>
              <span style="font-size: 18px">{{this.userinfos.createTime.substring(0,10)}}加入</span>
            </div>
           <div style="text-align: right">
             <el-tooltip style="margin-left: 100px;font-size: 22px" class="item" effect="dark" :content="userinfos.selfinfo" placement="top-end">
               <el-button>个人签名<i class="el-icon-view el-icon--right"></i></el-button>
             </el-tooltip><br>
             <span style="font-size: 18px">关注的人:
               {{follows.length}}
             </span>|
             <span style="font-size: 18px;margin-right: 50px">
               被关注:
               {{followsMe.length}}
             </span>
             <el-button  v-show="this.$store.state.user.userLogin" style="margin-right: 10px"  class="buts" @click="changestate">
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
      this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:uid}))
        .then(res=>{
          if(res.data>0){
            this.isFollow=false;
          }else{
            this.isFollow=true;
          }
        })
    }
    ,methods:{
      changestate(){
        this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.$route.params.uid}))
          .then(res=>{
            if(res.data>0){
              this.$axios.post("http://localhost:8080/cookbooktest/Isfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.$route.params.uid}))
                .then(res=>{
                  this.isFollow=true;
                })
            }else {
              this.$axios.post("http://localhost:8080/cookbooktest/saveIsfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.$route.params.uid}))
                .then(res=>{
                  this.isFollow=false;
                })
            }
          })
      }
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
