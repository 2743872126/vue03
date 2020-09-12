<template>
    <div>
      <div style="width: 80%;margin-left: 10%;height: 2000px">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="width: 17%">
              <!--菜普分类-->
              <el-menu :router="true" style="width: 90%;margin-left: 20px" class="el-menu-demo"   @select="handleSelect" collapse="true">
                <el-submenu v-for="v in menutypes" :index="v.mtid" :default-openeds="v.menutypess">
                  <template slot="title" >{{v.mtname}}</template>
                  <el-menu-item :index="v.mtid+'-'+s.mtid" style="font-size: 20px" v-for="s in v.menutypess" :route="{name:'menus',params:{'mtid':s.mtid,'mtname':s.mtname}}">{{s.mtname}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <el-container>
                <el-aside style="width: 60%;height: 2000px">
                  <!--轮播-->
                  <div style="height: 350px;position: relative">
                    <el-carousel height="340px">
                      <el-carousel-item v-for="item in upmonthmenu" :key="item.mid">
                        <el-image :src="'static/jpg/'+item.pic" style="width: 100%" @click="menudetail(item)"></el-image>
                        <h1 style="position: absolute;top: 180px;left: 20px;color: white;font-size: 45px" class="small">{{ item.mname}}</h1>
                        <span style="position: absolute;top: 230px;left: 20px;color: white;font-size: 18px" >{{item.works.length}}人做过这道菜
                          &nbsp;&nbsp;&nbsp;&nbsp;by&nbsp;
                          <el-link href="#" style="color: white;font-size: 18px">{{item.users.uname}}</el-link>
                        </span>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <!--新秀菜单-->
                  <div style="height: 270px">
                    <div style="height:70px;position: relative">
                    <span style="position: absolute;top: -50px;left: 10px;font-size: 22px;color: darkseagreen">新秀菜谱</span>
                      <span style="position: absolute;top: -50px;left: 150px;font-size: 14px">
                        <a style="color: crimson" href="http://localhost:8081/#/Menus">全部</a>
                      </span>
                    <el-pagination style="height: 35px;width: 90px;position: absolute;top:10px;left: 82%" background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="PageSize"
                                    layout="prev, next"
                                    :total="totalCount">
                    </el-pagination>
                    </div>
                    <div @click="menudetail(v)" style="width: 160px;height: 140px;float: left;margin-left: 5px;margin-right: 15px;position: relative" v-for="v in newmenu.slice((currentPage-1)*PageSize,currentPage*PageSize)">
                      <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 80%" ></el-image>
                      <span style="height:90px;width:148px;position: absolute;top: 40%;left: 0px;font-size: 15px" @click="menudetail(v)">{{v.mname.substr(0,7)}}..</span>
                    </div>
                  </div>
                  <!--本月最热-->
                  <div >
                    <div style="height:50px;line-height: 30px;text-align: left">
                      <span style="font-size: 22px;color: darkseagreen;margin-left: 5px">本月最热</span>
                      <span style="font-size: 14px;color: red;margin-left: 50px">
                        <a style="color: crimson" href="http://localhost:8081/#/Menus">全部</a>
                      </span>
                    </div>
                    <div style="border: 1px solid gainsboro;width: 255px;height: 220px;float: left;margin-right: 5px;margin-left: 5px;margin-bottom:20px;position: relative" v-for="v in thismonthmenu">
                      <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 65%" @click="menudetail(v)"></el-image>
                      <span style=" height:90px;width:253px;position: absolute;top: 38%;left: 0px;font-size: 18px" @click="menudetail(v)">{{v.mname.substr(0,8)}}..</span>
                      <span style=" height:90px;width:253px;position: absolute;top: 53%;left: 0px;font-size: 13px;color: darkgrey"><a style="color: black">{{v.users.uname}}</a>&nbsp;&nbsp;&nbsp;&nbsp;{{v.works.length}}人做过</span>
                    </div>
                  </div>
                </el-aside>
                <el-main>
                  <div v-if="isuser==true" style="height: 340px;margin-top: -20px;margin-right: -20px;background-color: #E9EEF3;position: relative">
                    <el-avatar :size="100" fit="fill" :src="'static/jpg/'+user.pic" style="margin-top: 50px" @click="toPerson()"></el-avatar>
                    <h1 style="margin-top: -120px"><a style="color: crimson"  @click="toPerson()">{{user.uname}}的厨房</a></h1>
                    <h1 style="margin-top: -120px;font-size: 20px">
                      <a style="color: crimson">{{user.munus.length}}菜谱</a>|
                      <a style="color: crimson">{{user.works.length}}作品</a>|
                      <a style="color: crimson">{{user.user_menus.length}}收藏</a>|

                    </h1>
                    <el-button style="position: absolute;top: 260px;left: 40%;background-color: crimson;color: white;width: 100px;height: 50px" @click="creatMenu">创建菜谱</el-button>
                  </div>
                  <div v-else style="height: 350px;margin-top: -50px;margin-right: -20px;background-color: #E9EEF3">
                        <p style="line-height: 20px"><el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px;margin-top: 130px" @click="loginin">登陆</el-button></p>
                    <p style="line-height: 20px"><el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px" @click="loginon">注册</el-button></p>
                  </div>

                  <!--下厨的朋友们-->
                  <div style="height: 800px;margin-top: 20px;margin-right: -20px;">
                    <div style="height:70px;position: relative">
                      <span style="position: absolute;top: -50px;left: 10px;font-size: 22px;color: darkseagreen">万能的吃货</span>
                      <span style="position: absolute;top: -50px;left: 180px;font-size: 14px" @click="$router.push({name:'UsersShow'})">
                        <a style="color: crimson" >更多</a>
                      </span>
                    </div>
                    <div style="border: 1px solid gainsboro;height: 80px;margin-bottom:20px;position: relative" v-for="v,i in users.slice(0,8)">
                      <a @click="toThirePerson(v.uid)"><el-avatar style="position: absolute;left: 0px;top: 10px" :size="60" fit="fill" :src="'static/jpg/'+v.pic" ></el-avatar></a>
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: -60px;left: 80px;font-size: 14px">
                        <a style="color: black" @click="toThirePerson(v.uid)">{{v.uname.substr(0,4)}}..</a>
                        <el-image src="static/jpg/xingji.png" v-if="v.state===1" style="height: 20px"></el-image>
                      </span>
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: -35px;left: 80px;font-size: 14px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: -10px;left: 80px;font-size: 14px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
                      <el-button  style="background-color: crimson;color: white;width: 100px;height: 45px;font-size: 20px;position: absolute;top: 18px;left: 245px"  v-show="v.uid!==user.uid" @click="guanzhu(i)">
                        <span v-if="v.state2==0">关注</span><span v-else>取关</span><br>
                      </el-button>
<!--
                      <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px;position: absolute;top: 35px;left: 275px" @click="guanzhu(v.uid)">已关注</el-button>
-->
                    </div>
                  </div>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
</template>

<script>
    export default {
        name: "firstpage",
        data() {
          return {
            isCollapse: true,
            menutypes:[],
            thismonthmenu:[],
            upmonthmenu:[],
            newmenu:[],
            users:[],
            user:{uname:''},
            isuser:false,
            currentPage:1,
            // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount:1,
            // 默认每页显示的条数（可修改）
            PageSize:3,
            isFollow:false,
          };
        },
        created:function () {
          this.user=this.$store.state.user.userInfo;
          console.info(this.$store.state.user.userInfo)
          if (undefined!==this.user.uname){
            this.isuser=true;
          } else {
            this.isuser=false;
          }
          this.$axios.post('http://localhost:8080/cookbooktest/MenuTypesController/queryall')
            .then(resp=>{
                this.menutypes=resp.data;
            })
            .catch(err=>{
                this.$message.error("错误");
            });
          this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryupMonth')
            .then(resp=>{
              this.upmonthmenu=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
          this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryNewMenu')
            .then(resp=>{
              this.newmenu=resp.data;
              this.totalCount=resp.data.length;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
          this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryThisMonth')
            .then(resp=>{
              this.thismonthmenu=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryuserinfo')
            .then(resp=>{
              this.users=resp.data;
              this.users.forEach((v,i)=>{
                this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:v.uid}))
                  .then(re=>{
                    if(re.data>0){
                      v.state2=1;
                      this.$set(this.users,i,v)
                    }else{
                      v.state2=0;
                      this.$set(this.users,i,v)
                    }

                  })
              })
            })
            .catch(err=>{
              this.$message.error("请稍后尝试");
            })

        },
        methods:{
          toThirePerson(uid){
            this.$router.push({name:'TheirPersonal',params:{uid:uid}})
          },
          toPerson(){
            this.$router.push({name:'Personal'})
          },
          menudetail(item){
            this.$router.push({name:'MenusDetail',params:{menudetail:item}})
          },
          creatMenu(){
            this.$router.push({name:'CreateMenus'})
          },
          guanzhu(i){
            if (undefined!==this.user.uname) {
              if(this.users[i].state2==1){
                this.$axios.post("http://localhost:8080/cookbooktest/Isfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                  this.users[i].state2=0;
                  let temp=this.users[i];
                  this.$set(this.users,i,temp)
                })
              }else {
                this.$axios.post("http://localhost:8080/cookbooktest/saveIsfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                  this.users[i].state2=1;
                  let temp=this.users[i];
                  this.$set(this.users,i,temp)
                })
              }

            }else {
              this.$confirm('请登录账号,是否登陆?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({name:'Login2'})
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });
              });
            }
          },
          loginin(){
            this.$router.push({name:'Login2'})
          },
          loginon(){
            this.$router.push({name:'Register'})
          },
          // 每页显示的条数
          handleSizeChange(val) {
            // 改变每页显示的条数
            this.PageSize=val
            // 注意：在改变每页显示的条数时，要将页码显示到第一页
            this.currentPage=1
          },
          // 显示第几页
          handleCurrentChange(val) {
            // 改变默认的页数
            this.currentPage=val
          },

        },
    }
</script>

<style scoped>

</style>
