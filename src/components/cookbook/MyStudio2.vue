<template>
  <div>
    <p class="ps"><span  @click="mys">购买的</span>         |        <span class="span">发布的</span><router-link style="float: right" :to="{name:'CreateStudio'}">去发布<icon class="el-icon-caret-right"></icon></router-link></p>
    <div class="menus" v-for="(v,k) in release" @click="StudioDetail(v.sid)">
      <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/video/'+v.stupic" fit="cover"></el-image>
      <div style="margin-top: -120px"><h1 style="font-size: 18px;margin:30px 0 -100px 0 ">{{v.sname.substring(0,15)}}..</h1></div>
      <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
        {{v.upTime.substring(0,10)}}发布 |
        <span v-if="v.str">星级：<icon class="el-icon-star-on">{{v.str}}</icon> |</span>
        <span><icon class="el-icon-s-comment">{{v.studio_messages===null?0:v.studio_messages.length}}</icon></span>
      </div>
    </div>
    <p class="ps" v-show="isshow">你还没有发布视频，<router-link :to="{name:'CreateStudio'}">去发布<icon class="el-icon-caret-right"></icon></router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'MyStudio2',
    data(){
      return {
        isshow:false,
        starts:0,
        release:[],
      }
    },
    created:function(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyStudio",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          if(null==res.data[0]){
            this.isshow=true;
          }
          this.release=res.data;
          this.release.forEach(v=>{
            this.starts=0;
            v.studio_messages.forEach(ers=>{
              this.starts=Number(this.starts)+Number(ers.start);
            })
            v.str=Number(this.starts)/Number(v.studio_messages.length);
          })
        })
    },
    methods:{
      mys(){
        this.$router.push({name:'MyStudio'})
      },
      StudioDetail(sid){
        this.$router.push({name:'StudioBook',params:{'sid':sid}})
      }
    }
  }
</script>

<style scoped>
  .ps{
    font-size: 20px;
    line-height: 30px;
  }
  .span{
    color: red;
  }
  .menus {
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    width: 32%;
    border: 1px white solid;
  }
</style>
