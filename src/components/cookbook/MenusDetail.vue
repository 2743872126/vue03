<template>
    <div>
      <div style="width: 80%;margin-left: 10%">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="width: 70%">
              <div style="margin-right: 40px">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;margin-left: 20px;margin-top: 20px;margin-bottom: 20px">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item :to="{name:'menus',params:{'mtid':menutype.mtid,'mtname':menutype.mtname}}">{{menutype.mtname}}</el-breadcrumb-item>
                  <el-breadcrumb-item>{{menu.mname}}</el-breadcrumb-item>
                </el-breadcrumb>
                <h1 style="line-height: 70px;text-align: left;font-size: 40px">{{menu.mname}}</h1>
                <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 500px"></el-image>
                <p style="margin-top: -70px;line-height: 70px;color: dimgray;text-align: left">
                  <span style="color: crimson;font-size: 22px;font-weight: bold">{{menu.works.length}}</span>&nbsp;人做过这道菜
                  <el-button @click="CollectedMenu" style="background-color: crimson;color: white;width: 100px;margin-left: 70%;height: 48px">
                    <span v-if="isCollected">收藏</span>
                    <span v-else>取消收藏</span>
                  </el-button>
                </p>
                <hr />
                <p style="line-height: 14px;text-align: left;position: relative">
                  <el-avatar :size="80" fit="fill" :src="'static/jpg/'+menu.users.pic"></el-avatar>
                  <span style="position: absolute;top: 30px;left: 100px;font-size: 22px">{{menu.users.uname}}</span>
                </p>
                <p style="text-align: left;line-height: 30px;font-size: 20px">
                  {{menu.info}}
                </p>
                <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">用料</h1>
                <el-table :data="menudetails" :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
                  <el-table-column label="材料" prop="material"></el-table-column>
                  <el-table-column label="用量" prop="num"></el-table-column>
                </el-table>
                <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen;margin-top: 20px">{{menu.mname}}的做法</h1>
                <el-table :data="menuStep" :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
                  <el-table-column label="顺序" prop="msnum">
                    <template slot-scope="scope">
                      <span style="font-size: 25px;color: darkseagreen">{{scope.row.msnum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="步骤" prop="msinfo" width="380"></el-table-column>
                  <el-table-column label="图片" prop="msPic" width="300">
                    <template slot-scope="scope">
                      <img :src="'static/jpg/'+scope.row.mspic"alt=""/>
                    </template>
                  </el-table-column>
                </el-table>
                <h1 v-if="menu.works.length!==0" style="text-align: left;line-height: 70px;font-size: 30px;color: darkseagreen;margin-top: 20px">
                  参照这个菜谱，大家做出 {{menu.works.length}} 作品
                  <a style="font-size: 18px;color: crimson;margin-left: 220px" @click="checkAllWorks()">全部 {{menu.works.length}} 作品</a>
                </h1>
                <div v-for="w in menu.works" style="border:1px solid gainsboro;height: 290px;width: 180px;float: left;margin-right: 12px">
                  <router-link :to="{name:'WorkDetail',params:{wid:w.wid}}">
                    <img :src="'static/jpg/'+w.pic" width="178px" height="150px" />
                    <p style="line-height: 20px;margin-top: -60px;color:gray">{{w.makeTime.substr(0,10)}}</p>
                    <p style="height:40px;line-height: 20px;color: black">{{w.winfo.substr(0,24)}}</p>
                    <p style="line-height: 20px" v-if="w.users!==null">
                      <el-avatar v-if="w.users.pic!==null" :size="20" fit="fill" :src="'static/jpg/'+w.users.pic"></el-avatar>
                      <a style="color: crimson">{{w.users.uname}}</a>
                    </p>
                  </router-link>
                </div>
                <p style="clear: both;background-color: crimson;line-height: 50px;color: white;font-size: 20px" @click="tocreateworks">
                  上传你做的{{menu.mname}}
                </p>
                <div style="background-color: gainsboro">
                  <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">{{menu.mname}}的答疑</h1>

                  <div v-for="l in LeavlMessage.slice(0,8)">
                    <p style="text-align:left;line-height: 20px;position: relative">
                      <el-avatar :size="40" fit="fill" :src="'static/jpg/'+l.leavUsers.pic"></el-avatar>
                      <a style="color: crimson;position: absolute;top: 10px;left: 50px">{{l.leavUsers.uname}}</a>
                      <span style="position: absolute;top: 10px;left: 90px;color: dimgray">{{l.leaveTime.substr(0,10)}}</span>
                    </p>
                    <p style="text-align:left;line-height: 20px;margin-top: -15px;margin-left: 50px">
                      {{l.info}}
                    </p>
                    <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px">
                      作者回复&nbsp;
                      <span style="color: dimgray">{{l.replytime.substr(0,10)}}</span>
                    </p>
                    <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px;color: dimgray">
                      {{l.reply}}
                    </p>
                </div>
                <p style="line-height: 50px"><router-link style="color: crimson" :to="{name:'LeavMessage',params:{mid:this.menu.mid}}" >更多菜谱留言</router-link></p>
                </div>
              </div>
            </el-aside>
            <el-main>
              <p style="text-align: left;line-height: 50px" v-if="user.uid===menu.users.uid">
                <router-link style="color: crimson" :to="{name:'UpdateMenus',params:{mid:this.menu.mid}}">编辑菜谱</router-link>
                  <a @click="del" slot="reference" style="color: crimson">删除菜谱</a>
              </p>
              <p style="text-align: left;color: dimgray;line-height: 30px">
                该菜谱创建于{{menu.madeTime.substr(0,10)}}
              </p>
              <p style="text-align: left;color: dimgray;line-height: 30px">
              版权归作者所有，没有作者本人的书面许可任何人不得转载或使用整体或任何部分的内容。
              </p>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
</template>

<script>
  import preventBack from 'vue-prevent-browser-back';//组件内单独引入
    export default {
      mixins: [preventBack],
      name: "MenusDetail",
      data() {
        return {
          menu:{pic:'',users:{pic:''}},
          menuStep:[],
          menudetails:[],
          status:false,
          LeavlMessage:[],
          user:{},
          menutype:{},
          isCollected:false,
        }
      },
      created:function () {
          this.user=this.$store.state.user.userInfo
          this.menu=this.$route.params.menudetail;
          if (null!=this.menu.works) {
            this.menu.works.forEach(v => {
              this.$axios.post('http://localhost:8080/cookbooktest/UController/querybyid', this.$qs.stringify({'uid': v.uid}))
                .then(resp => {
                  v.users = resp.data
                })
                .catch(err => {
                  this.$message.error("错误");
                });
            })
          }
        this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/querymessagereplyNonull',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.LeavlMessage=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post('http://localhost:8080/cookbooktest/MenuTypesController/querybymtid',this.$qs.stringify({'mtid':this.menu.mtid}))
          .then(resp=>{
            this.menutype=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post('http://localhost:8080/cookbooktest/MenuStepsController/queryBymid',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.menuStep=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post('http://localhost:8080/cookbooktest/MaterialsDetailController/queryBymid',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.menudetails=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryusercollect",this.$qs.stringify({mid:this.menu.mid,uid:this.$store.state.user.userInfo.uid}))
          .then(res=>{
            if(res.data>0){
              this.isCollected=false;
            }else{
              this.isCollected=true;
            }
          })
      },
      methods:{
        CollectedMenu(){
          if(this.$store.state.user.userLogin){
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/updateCollection',this.$qs.stringify({mid:this.menu.mid,uid:this.$store.state.user.userInfo.uid}))
              .then(resp=>{
                if(resp.data>0){
                  this.isCollected=false;
                }else{
                  this.isCollected=true;
                }
              }).catch()
          }else {
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
        del(){
          this.$confirm('是否删除该菜谱, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/deleteMenu',this.$qs.stringify({'mid':this.menu.mid}))
              .then(resp=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$router.push({name:'Mymenus'})
              }).catch()

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

         /* this.$axios.post('http://localhost:8080/cookbooktest/MenuController/deletemenuBymid',this.$qs.stringify({'mid':this.menu.mid}))
            .then(resp=>{
              this.$router.push({name:'Mymenus'})
            }).catch()*/
        },
        checkAllWorks(){
          this.$router.push({name:'MenuWorks',params:{menu:this.menu}})
        },
        toWorkDetail(wid){
          this.$router.push({name:'WorkDetail',params:{wid:wid}})
        },
        /*tocreateworks(){
          this.$router.push({path: '/createWorks',query:{mid:this.menu.mid,mname:this.menu.mname}})
        },*/

        tocreateworks(){
          if(this.$store.state.user.userLogin){
            this.$router.push({name: 'CreateWorks',replace:true,params:{mid:this.menu.mid,mname:this.menu.mname}})
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

        }
      }
    }
</script>

<style scoped>

</style>
