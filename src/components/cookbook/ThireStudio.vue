<template>
  <div v-if="release.length!==0">
    <div class="menus" v-for="(v,k) in release" @click="StudioDetail(v.sid)">
      <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/video/'+v.stupic" fit="cover"></el-image>
      <div style="margin-top: -120px"><h1 style="font-size: 18px;margin:30px 0 -100px 0 ">{{v.sname}}</h1></div>
      <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
        {{v.upTime.substring(0,10)}}发布 |
        <span v-if="v.str">星级：<icon class="el-icon-star-on">{{v.str}}</icon> |</span>
        <span><icon class="el-icon-s-comment">{{v.studio_messages===null?0:v.studio_messages.length}}</icon></span>
      </div>
    </div>
  </div>
  <p v-else>该作者没有发布菜谱</p>
</template>

<script>
  export default {
    name: 'ThireStudio',
    data(){
      return {
        isshow:false,
        starts:0,
        release:[],
      }
    },
    created:function(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyStudio",this.$qs.stringify({uid:this.$route.params.uid}))
        .then(res=>{
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
    color: red;
  }
  .menus {
    float: left;
    margin-top: 20px;
    margin-left: 20px;
    width: 30%;
  }
</style>
