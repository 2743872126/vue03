<template>
    <div>

        <router-link style="float: right;margin:-30px 0 -500px 0;color: crimson;font-size: 25px" :to="{name:'CreateMenus'}">发布一个菜谱<icon class="el-icon-caret-right"></icon></router-link>

      <div class="menus" v-for="(v,k) in userinfo.munus">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"  @click="menudetail(v)"></el-image>
        <div style="margin-top: -120px">
          <h1 style="font-size: 18px;margin:30px 0 -100px 0 " >
            <a @click="menudetail(v)" style="color: black">{{v.mname}}</a>
          </h1>
        </div>
        <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
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
        ismenus:true,
        userinfo:{},
      }
    },
    created:function(){
      if(0!=this.$store.state.user.userInfo.munus.length){
        this.ismenus=false;
      }
      this.userinfo=this.$store.state.user.userInfo;
    },
    methods:{
      menudetail(item){
        console.info(item)
        item.users=this.$store.state.user.userInfo
        this.$router.push({name:'MenusDetail',params:{menudetail:item}})
      }
    }
  }
</script>

<style scoped>
.menus{
  float: left;
  margin-top: 100px;
  margin-left: 20px;
  width: 30%;
}
</style>
