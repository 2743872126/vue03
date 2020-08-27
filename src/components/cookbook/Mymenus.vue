<template>
    <div>
      <div class="menus" v-for="(v,k) in userinfo.munus">
        <el-image style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
        <div style="margin-top: -120px"><h1 style="font-size: 32px;margin:30px 0 -100px 0 ">{{v.mname}}</h1></div>
        <div style="font-size: 18px;margin:-55px 0 -55px -30px ;">
          &nbsp;&nbsp;
          {{v.madeTime.substring(0,10)}}发布
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{v.works===null?0:v.works.length}}做过 |</span>
          <span>{{v.leavMessages===null?0:v.leavMessages.length}}留言</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Mymenus',
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
.menus{
  margin-top: 20px;
  width: 33%;
  border: 1px white solid;
}
</style>
