<template>
    <div>
      <p class="ps"><span @click="toc">菜单</span>       |        <span class="span">课程</span> </p>
      <div class="menus" v-for="(v,k) in CollectStudio" @click="StudioDetail(v.sid)">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/video/'+v.stupic" fit="cover"></el-image>
        <div style="margin-top: -120px"><h1 style="font-size: 32px;margin:30px 0 -100px 0 ">{{v.sname}}</h1></div>
        <div style="font-size: 18px;margin:-55px 0 -55px -30px ;">
          {{v.upTime.substring(0,10)}}发布 |
          <span v-if="v.str">星级：<icon class="el-icon-star-on">{{v.str}}</icon> |</span>
          <span><icon class="el-icon-s-comment">{{v.studio_messages===null?0:v.studio_messages.length}}</icon></span>
        </div>
      </div>
      <p class="ps" v-show="isshow">你还没有收藏视频，<router-link :to="{name:''}">去看看<icon class="el-icon-caret-right"></icon></router-link></p>
    </div>
</template>

<script>
  export default {
    name: 'Collected2',
    data(){
      return {
        starts:0,
        isshow:false,
        CollectStudio:[],
      }
    },
    created:function(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryusercollectedstudio",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          if(null==res.data[0]){
            this.isshow=true;
          }
          this.CollectStudio=res.data;
          this.CollectStudio.forEach(v=>{
            this.starts=0;
            v.studio_messages.forEach(ers=>{
              this.starts=Number(this.starts)+Number(ers.start);
            })
            v.str=Number(this.starts)/Number(v.studio_messages.length);
          })
        })

    },
    methods:{
      toc(){
        this.$router.push({name:'Collected'})
      },
      StudioDetail(sid){
        this.$router.push({name:'StudioBook',params:{'sid':sid}})
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
  .menus {
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    width: 32%;
    border: 1px white solid;
  }
</style>
