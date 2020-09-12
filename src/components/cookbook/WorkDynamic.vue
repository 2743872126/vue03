<template>
  <div style=" width: 72%;margin-left: 12%" >
        <div style="width: 180px;height: 50px;line-height: 50px;float: left;margin-right: 4px;background-color: crimson;color: white">
          我关注的更新</div>
        <div style="width: 130px;height: 50px;line-height: 50px;float: left;margin-right: 4px;background-color:ghostwhite" @click="toAllworks()">全站更新</div>
        <div style="width: 520px;height: 50px;line-height: 50px;float: left;margin-right: 4px;background-color: ghostwhite;margin-bottom: 20px"></div>
        <div style="width: 200px;height: 60px;line-height: 60px;float: left;margin-right: 4px;background-color:ghostwhite">
          <a style="color: crimson" @click="moreusers">下厨的朋友>></a>
        </div>



        <div style="height: 2000px;clear: both" v-if="this.$store.state.user.userLogin">
          <div style="border: 1px solid gainsboro;height: 430px;margin-bottom: 20px;width: 28%;float: left;margin-right: 55px" v-for="v in works">
            <el-image :src="'static/jpg/'+v.pic" style="height: 250px" @click="dialogVisible=true,work=v,inits2(v),getuser(v.user.uid),getMessage(v.wid),getMenuDetail(v.mid),message={wid:v.wid,upid:0,uid:user.uid,message:''}"></el-image>
            <p style="font-size: 14px;line-height: 20px;text-align: left;margin-top: -50px"><a style="color: crimson" @click="menudetail()">{{MenuDetail.mname}}</a></p>
            <p style="font-size: 14px;line-height: 20px;text-align: left;height: 40px">{{v.winfo}}</p>
            <p style="font-size: 14px;line-height: 20px;text-align: left">
              {{v.makeTime.substr(0,10)}}
              <img src="static/jpg/QQ图片20200903101053.png" style="margin-left: 150px"/>
              <span style="color: dimgray">{{v.startUsers.length}}</span>
              <img src="static/jpg/QQ图片20200903105149.png" style="margin-left: 20px"/>
              <span style="color: dimgray">{{v.works_messages.length}}</span>
            </p>
            <p style="font-size: 14px;line-height: 20px;text-align: left">
              <el-avatar v-if="v.user.pic!==null" :size="20" fit="fill" :src="'static/jpg/'+v.user.pic"></el-avatar>
              <a style="color: crimson">{{v.user.uname}}</a>
            </p>
          </div>

        </div>
        <p style="clear: both">请先登录才会有关注的作品</p>
        <el-dialog v-if="work!==''"
                   :visible.sync="dialogVisible"
                   width="70%"
                   top="20px"
                   :before-close="handleClose">
          <el-container>
            <el-aside style="width: 70%">
              <div style="width: 90%">
                <el-image :src="'static/jpg/'+work.pic" style="height: 450px"></el-image>
                <p style="line-height: 20px;text-align: left;margin-top: -50px;margin-left: 20px;position: relative">
                  <el-image :src="'static/jpg/'+work.user.pic" style="width: 60px;height: 60px;margin-right: 20px"></el-image>
                  <span style="position: absolute;top: 15px">
                <a style="color: crimson">{{work.user.uname}}</a>  <span v-if="MenuDetail!==''">做过  <a style="color: crimson" @click="menudetail()">{{MenuDetail.mname}}</a></span>
                  <span v-else>分享作品</span>
              </span>
                  <span style="position: absolute;top: 15px;left: 520px">
                <el-button  @click="startWorks5" style="width: 80px;background-color: crimson;color: white">
                    <span v-if="isStart5">赞</span>
                    <span v-else>取消赞</span>
                </el-button>
              </span>
                </p>
                <p style="line-height: 20px;text-align: left;margin-top: -15px;margin-left: 100px;color: black">
                  {{work.winfo}}
                </p>
                <p style="line-height: 30px;text-align: left;margin-top: 0px;margin-left: 100px">
                  发布于 {{work.makeTime.substr(0,10)}}
                  <a v-if="user.uid===work.user.uid" style="color: crimson">编辑</a>
                  <a v-if="user.uid===work.user.uid" style="color: crimson">删除</a>
                </p>
                <div style="height: 150px;margin-top: 20px;background-color: gainsboro" v-if="MenuDetail!==''">
                  <p style="line-height: 50px;margin-top: 20px;text-align: left;margin-left: 20px;position: relative">
                    <el-image :src="'static/jpg/'+MenuDetail.pic" style="height: 100px;width: 120px;margin-right: 20px;margin-top: 20px"></el-image>
                    <span style="position: absolute;top: 15px"><a style="color: crimson;font-size: 18px" @click="menudetail()">{{MenuDetail.mname}}</a></span>
                    <span style="position: absolute;top: 55px"><a style="color: dimgray;font-size: 16px">{{MenuDetail.users.uname}}</a></span>
                  </p>
                </div>
                <h1 style="text-align: left;margin-left: 20px;line-height: 70px;color: dimgray">
                  {{work.startUsers.length}}  赞
                </h1>
                <p style="text-align: left;margin-left: 20px;line-height: 0px">
                  <el-image v-for="ws in work.startUsers" :src="'static/jpg/'+ws.pic" style="height: 50px;width: 50px;margin-right: 10px"></el-image>
                </p>
                <h1 style="text-align: left;margin-left: 20px;line-height: 70px;color: dimgray">
                  {{work.works_messages.length}}  评论
                </h1>
                <div v-for="l in work_messages" style="margin-left: 20px;">
                  <p style="text-align:left;line-height: 20px;position: relative" v-if="l.users!==null">
                    <el-avatar :size="40" fit="fill" :src="'static/jpg/'+l.users.pic"></el-avatar>
                    <a style="color: crimson;position: absolute;top: 10px;left: 50px">{{l.users.uname}}</a>
                    <span style="position: absolute;top: 10px;left: 90px;color: dimgray">{{l.messageTime.substr(0,10)}}</span>
                    <span v-if="user.uid!==l.users.uid" style="position: absolute;top: 10px;left: 170px">
                        |<a style="color: black" @click="huifu(l.wmid,l.users.uname)"> 回复</a>
                      </span>
                    <span v-if="user.uid===l.users.uid" style="position: absolute;top: 10px;left: 200px;">
                        |<a style="color: black" @click="del(l.wmid)"> 删除</a>
                      </span>
                  </p>
                  <p style="text-align:left;line-height: 30px;margin-top: -15px;margin-left: 50px;color: black">
                    {{l.message}}
                  </p>
                  <el-collapse v-if="l.works_messages.length!==0">
                    <el-collapse-item title="展开回复" name="1">
                      <p v-for="w in l.works_messages" style="text-align:left;line-height: 40px;margin-left: 50px;margin-top: 0px;margin-bottom: 0px">
                        <a style="color: crimson">{{w.users.uname}}</a>
                        <span style="color: dimgray">{{w.messageTime.substr(0,10)}}</span>
                        <span v-if="user.uid===w.users.uid" >
                            |<a style="color: black" @click="del(w.wmid)"> 删除</a>
                          </span><br/>
                        <span style="color: black">
                      {{w.message}}
                    </span>
                      </p>
                    </el-collapse-item>
                  </el-collapse>
                </div>
                <el-form :model="message" style="margin-top: 100px;width: 90%;margin-left: 5%">
                  <el-form-item  hidden>
                    <el-input v-model="message.wid"></el-input>
                  </el-form-item>
                  <el-form-item  hidden>
                    <el-input v-model="message.upid"></el-input>
                  </el-form-item>
                  <el-form-item hidden>
                    <el-input v-model="message.uid"></el-input>
                  </el-form-item>
                  <el-form-item >
                    <el-input type="textarea" :rows="5"
                              placeholder="请输入内容" v-model="message.message" @input="neirong" ></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="fabu()">发布</el-button>
                </div>
              </div>
            </el-aside>
            <el-main>
              <p style="line-height: 14px;text-align: left;position: relative">
                <el-avatar :size="50" fit="fill" :src="'static/jpg/'+workuser.pic"></el-avatar>
                <span style="position: absolute;top: 20px;left: 60px;font-size: 14px"><a style="color: crimson">{{workuser.uname}}</a></span>
              </p>
              <p style="line-height: 20px">
                {{workuser.users.length}} 关注 | {{workuser.munus.length}} 菜谱 | {{workuser.works.length}} 作品
              </p>
              <h1 style="text-align: left;line-height: 70px;font-size: 22px;color: darkseagreen;margin-top: 20px">
                {{workuser.uname}}的其他作品
                <a style="font-size: 14px;color: crimson;margin-left: 50px" @click="checkAllWorks()">全部</a>
              </h1>
              <p style="text-align: left;line-height: 0px">
                <el-image v-for="ws in workuser.works" :src="'static/jpg/'+ws.pic" style="height: 70px;width: 80px;margin-right: 5px" @click="toWorkDetail(ws.wid)"></el-image>
              </p>
            </el-main>
          </el-container>
          <span slot="footer" class="dialog-footer">
  </span>
        </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "WorkDynamic",
      data() {
        return {
          works:[],
          dialogVisible: false,
          user:{},
          message:{},
          workuser:{munus:[],works:[],users:[]},
          MenuDetail:{users:{},pic:''},
          work:{user:{pic:''},makeTime:'',startUsers:[],works_messages:[]},
          work_messages:[],
          isStart5:false,
        }
      },
      created:function () {
        this.user=this.$store.state.user.userInfo
        this.$axios.post('http://localhost:8080/cookbooktest/WorksController/queryGuanzhuWorks',this.$qs.stringify({'uid':this.$store.state.user.userInfo.uid}))
          .then(resp=>{
            this.works=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      },
      methods: {
        inits2(v){
          this.work=v;
          this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryLikes",this.$qs.stringify({wid:this.work.wid,uid:this.$store.state.user.userInfo.uid}))
            .then(res=>{
              if(res.data>0){
                this.isStart5=false;
              }else{
                this.isStart5=true;
              }
            })
        },
        startWorks5(){
          if(this.$store.state.user.userLogin){
            this.$axios.post('http://localhost:8080/cookbooktest/WorksController/updateLike',this.$qs.stringify({wid:this.work.wid,uid:this.$store.state.user.userInfo.uid}))
              .then(resp=>{
                if(resp.data>0){
                  this.isStart5=false;
                }else{
                  this.isStart5=true;
                }
              }).catch()
          }else{
            this.$confirm('请登录账号,是否登陆?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({name:'Login2'})
            }).catch(() => {
            });
          }

        },
        getuser(uid){
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryUser',this.$qs.stringify({'uid':uid}))
            .then(resp=>{
              this.workuser=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        getMessage(wid){
          this.$axios.post('http://localhost:8080/cookbooktest/Works_messageController/querybywid',this.$qs.stringify({'wid':wid}))
            .then(resp=>{
              this.work_messages=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        getMenuDetail(mid){
          this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymid',this.$qs.stringify({'mid':mid}))
            .then(resp=>{
              this.MenuDetail=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        toWorkDetail(wid){
          console.log(wid)
          this.$router.push({name:'WorkDetail',params:{wid:wid}})
        },
        menudetail() {
          this.$router.push({name: 'MenusDetail', params: {menudetail: this.MenuDetail}})
        },
        huifu(wmid,uname){
          /*message={Wid:v.wid,upid:0,uid:user.uid}*/
          this.message.upid=wmid;
          this.message.message='@'+uname+':';
        },
        neirong(mess){
          if (mess==''){
            this.message.upid=0
          }
        },
        fabu(){
          if(this.$store.state.user.userLogin) {
            if (this.message.upid != 0) {
              this.message.message = this.message.message.substr(this.message.message.indexOf(':') + 1, this.message.message.length)
              console.info(this.message)
            }
            this.$axios.post('http://localhost:8080/cookbooktest/Works_messageController/add', this.message)
              .then(resp => {
                this.getMessage(this.message.wid);
                this.message.message = '';
                this.message.upid = 0;
              })
              .catch(err => {
                this.$message.error("错误");
              });
          }else{
            this.$confirm('请登录账号,是否登陆?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({name:'Login2'})
            }).catch(() => {
            });
          }
        },
        del(wmid){
          this.$axios.post('http://localhost:8080/cookbooktest/Works_messageController/del',this.$qs.stringify({'wmid':wmid}))
            .then(resp=>{
              this.$confirm('确定要删除吗, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getMessage(this.message.wid);
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        toAllworks(){
          this.$router.push({name:'AllWorks'})
        },
        moreusers(){
          this.$router.push({name:'UsersShow'})
        },
      }
    }
</script>

<style scoped>

</style>
