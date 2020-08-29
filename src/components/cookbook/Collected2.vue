<template>
    <div>
      <p class="ps"><span @click="toc">菜单</span>       |        <span class="span">课程</span> </p>
      <div class="menus" v-for="(v,k) in userinfo">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
        <div style="margin-top: -120px"><h1 style="font-size: 32px;margin:30px 0 -100px 0 ">{{v.mname}}</h1></div>
        <div style="font-size: 18px;margin:-55px 0 -55px -30px ;">
          &nbsp;&nbsp;
          {{v.madeTime.substring(0,10)}}发布
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{v.works===null?0:v.works.length}}做过 |</span>
          <span>{{v.leavMessages===null?0:v.leavMessages.length}}留言</span>
        </div>
      </div>
      <p class="ps" v-show="isshow">你还没有收藏视频，<router-link :to="{name:''}">去看看<icon class="el-icon-caret-right"></icon></router-link></p>
    </div>
</template>

<script>
  export default {
    name: 'Collected',
    data(){
      return {
        isshow:false,
        userinfo:[],
      }
    },
    created:function(){
      this.userinfo=this.$store.state.user.userInfo.user_studios.studioList;
      if(0==this.userinfo.length){
        this.isshow=true;
      }
    },
    methods:{
      toc(){
        this.$router.push({name:'Collected'})
      }
    }
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
