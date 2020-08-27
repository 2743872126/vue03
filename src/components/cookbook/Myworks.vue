<template>
    <div>
      <div class="workss" v-for="(v,k) in userinfo.works.slice(0,9)">
        <el-image style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
        <div style="margin-top: -100px;margin-bottom: -100px"><p style="font-size: 22px;" >{{v.winfo.substring(0,20)}}..</p></div>
        <div style="font-size: 18px;margin:-55px 0 -55px -30px ;">
          {{v.makeTime.substring(0,10)}}拍摄
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span><el-icon class="el-icon-chat-dot-round"></el-icon>{{v.works_messages===null?0:v.works_messages.length}}</span>
          <span><el-icon class="el-icon-star-off"></el-icon>{{v.startUsers===null?0:v.startUsers.length}}</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Myworks',
    data(){
      return {
        userinfo:{},
      }
    },
    created:function(){
      this.userinfo=this.$store.state.user.userInfo;
    }
  }
</script>

<style scoped>
  .workss{
    margin-top: 20px;
    width: 33%;
    border: 1px white solid;
  }
</style>
