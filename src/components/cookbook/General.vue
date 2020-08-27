<template>
  <div>
    <div>
      <h1 style="text-align: left ;font-size: 42px">作品</h1>
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
      <span style="font-size: 25px">
        <router-link style="color: crimson" :to="{path:'myworks',query:{actives:'3'}}">查看我的全部作品<icon class="el-icon-caret-right"></icon></router-link>
      </span>
    </div>
    <div>
      <h1 style="text-align: left ;font-size: 42px">菜谱</h1>
      <div class="workss" v-for="(v,k) in userinfo.munus.slice(0,9)">
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
      <span style="font-size: 25px">
        <router-link style="color: crimson" :to="{path:'mymenus',query:{actives:'2'}}">查看我的全部菜谱<icon class="el-icon-caret-right"></icon>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'General',
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
  width: 33%;
  border: 1px white solid;
}
.textarea>>>.el-input__inner{
  font-size: 18px!important;
  color:#000000!important;
  font-family: cursive!important;
  border-color: white;
}
</style>
