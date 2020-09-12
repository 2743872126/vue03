<template>
    <div>
      <div class="workss" v-for="(v,k) in userinfo.works.slice(0,9)" @click="toworkdetail(v.wid)">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover" ></el-image>
        <div style="margin-top: -100px;margin-bottom: -100px"><p style="font-size: 18px;" >{{v.winfo.substring(0,15)}}..</p></div>
        <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
          {{v.makeTime.substring(0,10)}}拍摄
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span><el-icon class="el-icon-chat-dot-round"></el-icon>{{v.works_messages===null?0:v.works_messages.length}}</span>
          <span><el-icon class="el-icon-star-off"></el-icon>{{v.startUsers===null?0:v.startUsers.length}}</span>
        </div>
      </div>
      <p v-if="this.isworks" style="font-size: 25px">
        <router-link style="color: crimson" :to="{name:'firstpage'}">发布一个作品<icon class="el-icon-caret-right"></icon></router-link>
      </p>
    </div>

</template>

<script>
  export default {
    name: 'Myworks',
    data(){
      return {
        isworks:true,
        userinfo:{},
      }
    },
    created:function(){
      if(0!=this.$store.state.user.userInfo.works.length){
        this.isworks=false;
      }
      this.userinfo=this.$store.state.user.userInfo;
    },
    methods:{
      toworkdetail(wid){
        this.$router.push({name:'WorkDetail',params:{wid:wid}})
      },
    }
  }
</script>

<style scoped>
  .workss{
    margin-top: 20px;
    width: 30%;
    border: 1px white solid;
    float: left;
    margin-right: 20px;
    margin-left: 10px;
  }
</style>
