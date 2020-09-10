<template>
  <el-container style="width: 72%;margin-left: 12%">
    <el-aside>
      <el-card :body-style="{ padding: '0px' }" style="margin-top: 20px">
        <el-avatar :size="150" fit="fill" :src="'static/jpg/'+this.$store.state.user.userInfo.pic" style="margin-top: 20px"></el-avatar>
          <p style="line-height: 20px;margin-top: -50px"><a style="color:crimson">{{$store.state.user.userInfo.uname}}</a></p>
          <p style="line-height: 20px;">
            {{this.$store.state.user.userInfo.users.length}} 关注 | {{this.$store.state.user.userInfo.munus.length}} 菜谱 | {{this.$store.state.user.userInfo.works.length}} 作品
          </p>
      </el-card>
    </el-aside>
    <el-main>
      <el-tabs type="border-card" class="tabs">
        <el-tab-pane @click="flushFat" :label="'菜谱留言   '+menuMessage.length">
          <div v-if="menuMessage.length!==0">
            <div v-for="v,i in menuMessage">
              <p style="line-height: 30px;margin-top: 0px;position: relative">
                <el-avatar size="30px" :src="'static/jpg/'+v.leavUsers.pic"></el-avatar>
                <span style="position: absolute;top: 10px">
                  &nbsp;&nbsp;
                  <span style="font-weight: bold;color: black">{{v.leavUsers.uname}}</span>&nbsp;&nbsp;评论了你的菜谱&nbsp;
                  <a  @click="del(i,v.lid,v.mid)">去解答 ></a>
                  <el-link style="margin-left: 380px" @click="del(i,v.lid,'')" >忽略</el-link>
                </span>
              </p>
              <p style="margin-top: -10px;margin-left: 50px;line-height: 20px;font-size: 13px">
                {{v.info}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color: dimgray">{{v.leaveTime.substr(0,10)}}&nbsp;&nbsp;回复</span>
              </p>
            </div>
          </div>
          <p v-else style="text-align: center">
            空空如也
          </p>
        </el-tab-pane>
        <el-tab-pane :label="'课程留言   '+studioMessage.length">
          <div v-if="studioMessage.length!==0">
            <div v-for="v,i in studioMessage">
              <p style="line-height: 30px;margin-top: 0px;position: relative">
                <el-avatar size="30px" :src="'static/jpg/'+v.leveluser.pic"></el-avatar>
                <span style="position: absolute;top: 10px">
                  &nbsp;&nbsp;
                  <span style="font-weight: bold;color: black">{{v.leveluser.uname}}</span>&nbsp;&nbsp;评论了你的课程&nbsp;
                  <a  @click="del2(i,v.smid)">去解答 ></a>
                  <el-link style="margin-left: 380px" @click="del2(i,v.smid)" >忽略</el-link>
                </span>
              </p>
              <p style="margin-top: -10px;margin-left: 50px;line-height: 20px;font-size: 13px">
                {{v.message}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color: dimgray">{{v.evaluateTime.substr(0,10)}}&nbsp;&nbsp;回复</span>
              </p>
            </div>
          </div>
          <p v-else style="text-align: center">
            空空如也
          </p>
        </el-tab-pane>
        <el-tab-pane @click="flushFat" :label="'作品评论   '+workMessage.length">
          <div v-if="workMessage.length!==0">
            <div v-for="v,i in workMessage">
              <p style="line-height: 30px;margin-top: 0px;position: relative">
                <el-avatar size="30px" :src="'static/jpg/'+v.users.pic"></el-avatar>
                <span style="position: absolute;top: 10px">
                  &nbsp;&nbsp;
                  <span style="font-weight: bold;color: black">{{v.users.uname}}</span>&nbsp;&nbsp;评论了你的作品&nbsp;
                  <a  @click="del3(i,v.wmid,v.wid)">去解答 ></a>
                  <el-link style="margin-left: 380px" @click="del3(i,v.wmid,'')" >忽略</el-link>
                </span>
              </p>
              <p style="margin-top: -10px;margin-left: 50px;line-height: 20px;font-size: 13px">
                {{v.message}}&nbsp;&nbsp;&nbsp;&nbsp;
                <span style="color: dimgray">{{v.messageTime.substr(0,10)}}&nbsp;&nbsp;回复</span>
              </p>
            </div>
          </div>
          <p v-else style="text-align: center">
            空空如也
          </p>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'Email',
    data(){
      return {
        menuMessage:[],
        studioMessage:[],
        workMessage:[],
        EmailNum:0,
      }

    },
    created(){

      this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryMyMenuMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.menuMessage=res.data;
        this.EmailNum=Number(this.menuMessage.length+this.EmailNum);
      })
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyStudioMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.studioMessage=res.data;
        this.EmailNum=Number(this.studioMessage.length+this.EmailNum);
      })
      this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryMyWorksMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        this.workMessage=res.data;
        this.EmailNum=Number(this.workMessage.length+this.EmailNum);
      })

    },
    methods:{
      del(i,lid,mid){
        this.menuMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/LeavlMessageController/updatestate",this.$qs.stringify({'lid':lid})).then(res=>{
          if (mid!='') {
            this.$router.push({name: 'LeavMessage2', params: {mid: mid}})
          }
        }).catch()
      },
      del2(i,smid){
        this.studioMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/updatemessageBysmid",this.$qs.stringify({'smid':smid})).then(res=>{
        }).catch()
      },
      del3(i,wmid,wid){
        this.workMessage.splice(i,1);
        this.$axios.post("http://localhost:8080/cookbooktest/Works_messageController/updateworkstate",this.$qs.stringify({'wmid':wmid})).then(res=>{
          if (wid!='') {
            this.$router.push({name: 'WorkDetail', params: {wid: wid}})
          }
        }).catch()
      }
    }
  }
</script>

<style scoped>
.tabs{
  line-height: 40px;
  text-align: left;
}
</style>
