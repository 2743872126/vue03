<template>
    <div>
      <div style=" width: 80%;margin-left: 10%">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="width: 18%">
              <!--菜普分类-->
              <el-menu style="width: 99%" :default-active="activeIndex" class="el-menu-demo"   @select="handleSelect" collapse="true">
                <el-submenu v-for="v in menutypes" :index="v.mtid" :default-openeds="v.menutypess">
                  <template slot="title" >{{v.mtname}}</template>
                  <el-menu-item style="font-size: 20px" v-for="s in v.menutypess">{{s.mtname}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <el-container>
                <el-aside style="width: 60%">
                  <!--轮播-->
                  <div style="border: 1px solid black;height: 350px;position: relative">
                    <el-carousel height="348px">
                      <el-carousel-item v-for="item in upmonthmenu" :key="item.mid">
                        <el-image :src="'static/jpg/'+item.pic" style="width: 100%"></el-image>
                        <h1 style="position: absolute;top: 180px;left: 20px;color: white;font-size: 45px" class="small">{{ item.mname}}</h1>
                        <span style="position: absolute;top: 240px;left: 20px;color: white;font-size: 18px" >{{item.works.length}}人做过这道菜
                          &nbsp;&nbsp;&nbsp;&nbsp;by&nbsp;
                          <el-link href="#" style="color: white;font-size: 18px">{{item.users.uname}}</el-link>
                        </span>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                  <!--新秀菜单-->
                  <div style="height: 300px">
                    <div style="height:70px;position: relative">
                    <span style="position: absolute;top: -50px;left: 10px;font-size: 30px;color: darkseagreen">新秀菜谱</span>
                      <span style="position: absolute;top: -50px;left: 150px;font-size: 18px;color: red">全部</span>
                    <el-pagination style="height: 35px;width: 90px;position: absolute;top:10px;left: 87%" background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="PageSize"
                                    layout="prev, next"
                                    :total="totalCount">
                    </el-pagination>
                    </div>
                    <div style="width: 200px;height: 200px;float: left;margin-left: 10px;margin-right: 24px;position: relative" v-for="v in newmenu.slice((currentPage-1)*PageSize,currentPage*PageSize)">
                      <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 80%"></el-image>
                      <span style="height:90px;width:198px;position: absolute;top: 50%;left: 0px;font-size: 22px">{{v.mname.substr(0,8)}}..</span>
                    </div>
                  </div>
                  <!--本月最热-->
                  <div >
                    <div style="height:70px;position: relative">
                      <span style="position: absolute;top: -50px;left: 10px;font-size: 30px;color: darkseagreen">本月最热</span>
                      <span style="position: absolute;top: -50px;left: 150px;font-size: 18px;color: red">全部</span>
                    </div>
                    <div style="border: 1px solid gainsboro;width: 320px;height: 250px;float: left;margin-right: 25px;margin-left: 5px;margin-bottom:20px;position: relative" v-for="v in thismonthmenu">
                      <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 70%"></el-image>
                      <span style=" height:90px;width:318px;position: absolute;top: 50%;left: 0px;font-size: 24px">{{v.mname.substr(0,8)}}..</span>
                      <span style=" height:90px;width:318px;position: absolute;top: 63%;left: 0px;font-size: 18px;color: darkgrey"><a style="color: black">{{v.users.uname}}</a>&nbsp;&nbsp;&nbsp;&nbsp;{{v.works.length}}人做过</span>
                    </div>
                  </div>
                </el-aside>
                <el-main>
                  <div style="height: 350px;margin-top: -20px;margin-left: 20px;margin-right: -20px;background-color: #E9EEF3">
                        <el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px;margin-top: 130px">登陆</el-button>
                        <el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px">注册</el-button>
                  </div>
                  <!--下厨的朋友们-->
                  <div style="height: 350px;margin-top: 20px;margin-left: 20px;margin-right: -20px;">
                    <div style="height:70px;position: relative">
                      <span style="position: absolute;top: -50px;left: 10px;font-size: 30px;color: darkseagreen">下厨的朋友们</span>
                      <span style="position: absolute;top: -50px;left: 220px;font-size: 18px;color: red">更多</span>
                    </div>
                    <div style="border: 1px solid gainsboro;height: 140px;margin-bottom:20px;position: relative" v-for="v in users.slice(0,8)">
                      <el-avatar style="position: absolute;left: 0px;top: 20px" :size="100" fit="fill" :src="'static/jpg/'+v.pic"></el-avatar>
<!--
                      <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 70%"></el-image>
-->
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: -30px;left: 120px;font-size: 24px"><a style="color: black">{{v.uname.substr(0,4)}}..</a></span>
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: 0px;left: 120px;font-size: 18px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
                      <span style="text-align: left; height:90px;width:150px;position: absolute;top: 30px;left: 120px;font-size: 18px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
                      <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px;position: absolute;top: 35px;left: 275px">关注</el-button>
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
            currentPage:1,
            // 总条数，根据接口获取数据长度(注意：这里不能为空)
            totalCount:1,
            // 默认每页显示的条数（可修改）
            PageSize:3,
          };
        },
        created:function () {
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
            })
            .catch(err=>{
              this.$message.error("错误");
            })
        },
        methods:{
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
        }
    }
</script>

<style scoped>

</style>
