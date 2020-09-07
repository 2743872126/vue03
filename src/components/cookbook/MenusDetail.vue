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
                  <el-button style="background-color: crimson;color: white;width: 100px;margin-left: 70%;height: 48px">收藏</el-button>
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
                  <img :src="'static/jpg/'+w.pic" width="178px" height="150px" @click="toWorkDetail(w)"/>
                  <p style="line-height: 20px;margin-top: -60px">{{w.makeTime.substr(0,10)}}</p>
                  <p style="height:40px;line-height: 20px">{{w.winfo.substr(0,24)}}</p>
                  <p style="line-height: 20px">
                    <el-avatar v-if="w.users.pic!==null" :size="20" fit="fill" :src="'static/jpg/'+w.users.pic"></el-avatar>
                    <a style="color: crimson">{{w.users.uname}}</a>
                  </p>
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
                      <span v-if="user.uid===l.uid" style="position: absolute;top: 10px;left: 170px;color: dimgray">
                        |<a > 删除</a>
                      </span>
                    </p>
                    <p style="text-align:left;line-height: 20px;margin-top: -15px;margin-left: 50px">
                      {{l.info}}
                    </p>
                    <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px">
                      作者回复&nbsp;
                      <span style="color: dimgray">{{l.replytime.substr(0,10)}}</span>
                      <span v-if="user.uid===menu.users.uid" style="position: absolute;top: 10px;left: 170px;color: dimgray">
                        |<a > 删除</a>
                      </span>
                    </p>
                    <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px;color: dimgray">
                      {{l.reply}}
                    </p>
                </div>
                <p style="line-height: 50px"><a style="color: crimson">更多菜谱留言</a></p>
                </div>
              </div>
            </el-aside>
            <el-main>
              <p style="text-align: left;line-height: 50px" v-if="user.uid===menu.users.uid">
                <a style="color: crimson">编辑菜谱</a>
                <a style="color: crimson">删除菜谱</a>
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
    export default {
      name: "MenusDetail",
      data() {
        return {
          menu:{},
          menuStep:[],
          menudetails:[],
          status:false,
          LeavlMessage:[],
          user:{},
          menutype:{}
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
        this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/querymessageBymid',this.$qs.stringify({'mid':this.menu.mid}))
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
      },
      methods:{
        checkAllWorks(works){
          this.$router.push({name:'MenuWorks',params:{menu:this.menu}})
        },
        toWorkDetail(work){
          console.log(work)
          this.$router.push({name:'WorkDetail',params:{work:work}})
        },
        tocreateworks(){
          this.$router.push({name: 'CreateWorks',replace:true,params:{mid:this.menu.mid,mname:this.menu.mname}})
        }
      }
    }
</script>

<style scoped>

</style>
