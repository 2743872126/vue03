<template>

  <el-tabs type="border-card" class="tabs">
    <el-tab-pane label="菜谱留言">
      <div v-for="v,i in menuMessage">
        <el-avatar style="float:left;height: 35px;width: 35px;" :src="'static/jpg/'+v.leavUsers.pic"></el-avatar>
        <p style="margin-top: -10px;margin-left: 50px">
          {{v.leavUsers.uname}}@你留言&nbsp;{{v.info}}
          <router-link  @click="del(i,v.lid)" :to="{name:'MenusDetail',params:{menudetail:''}}">去解答 >
          </router-link> <el-link style="float: right" @click="del(i,v.lid)" >忽略</el-link>
        </p>
      </div>
    </el-tab-pane>
    <el-tab-pane label="课程留言">
      <div v-for="v,i in studioMessage">
        <el-avatar style="float:left;height: 35px;width: 35px;" :src="'static/jpg/'+v.leveluser.pic"></el-avatar>
          <p style="margin-top: -10px;margin-left: 50px">
            {{v.leveluser.uname}}@你留言&nbsp;{{v.message}}
            <router-link @click="del2(i,v.smid)" :to="{name:'StudioBook',params:{sid:v.sid}}">去解答 >
            </router-link> <el-link style="float: right" @click="del2(i,v.smid)" >忽略</el-link>
          </p>
      </div>
    </el-tab-pane>
    <el-tab-pane label="作品评论">
      <div v-for="v,i in workMessage">
          <el-avatar style="float:left;height: 35px;width: 35px;" :src="'static/jpg/'+v.users.pic"></el-avatar>
          <p style="margin-top: -10px;margin-left: 50px">
            {{v.users.uname}}@评论你&nbsp;{{v.message}}
            <router-link @click="del3(i,v.wmid)" :to="{name:'WorkDetail',params:{sid:v.sid}}">去回复 ></router-link>
            <el-link style="float: right" @click="del3(i,v.wmid)" >忽略</el-link>
          </p>

      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  export default {
    name: 'Email',
    data(){
      return {
        menuMessage:[],
        studioMessage:[],
        workMessage:[],
      }
    },
    created(){
      this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryMyMenuMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.menuMessage=res.data;
      })
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyStudioMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.studioMessage=res.data;
      })
      this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryMyWorksMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.workMessage=res.data;
      })
    },
    methods:{
      del(i,lid){
        this.menuMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/MenuController/updatestate",this.$qs.stringify({'lid':lid})).then(res=>{
        }).catch()
      },
      del2(i,smid){
        this.studioMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/updatemessageBysmid",this.$qs.stringify({'smid':smid})).then(res=>{
        }).catch()
      },
      del3(i,wmid){
        this.workMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/Works_messageController/updateworkstate",this.$qs.stringify({'wmid':wmid})).then(res=>{
        }).catch()
      }
    }
  }
</script>

<style scoped>
.tabs{
  line-height: 40px;
  width: 80%;
  margin-left: 10%;
  font-size: 22px;
  text-align: left;
}
</style>
