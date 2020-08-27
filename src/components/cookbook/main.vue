<template>
    <div>
      <el-container>
        <el-header style="height: 100px">
          <div style=" width: 80%;margin-left: 10%;height: 98px;position: relative">
            <el-menu style="height: 98px" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">
                <el-link :underline="false" href="#">
                  <img src="static/jpg/logo2.jpg" height="98px" width="270px" />
                </el-link>
              </el-menu-item>
              <el-menu-item  style="margin-right: 123px;line-height: 90px">
                <el-input placeholder="搜索菜谱"  style="position: relative;top: 29px;"></el-input>
                <el-button>搜菜谱</el-button>
              </el-menu-item>
              <el-menu-item :route="{name:'firstpage'}" style="line-height: 90px"  index="3">
                <el-link style="font-size: 22px">首页</el-link>
              </el-menu-item>
              <el-menu-item  index="4" style="line-height: 90px">
                <el-link style="font-size: 22px">课程</el-link>
              </el-menu-item>
              <el-menu-item  index="5" style="line-height: 90px">
                <el-link style="font-size: 22px">作品动态</el-link>
              </el-menu-item>

              <el-menu-item v-if="isuser" style="margin-left: 10%;line-height: 90px">
                <el-link icon="el-icon-message" style="font-size: 22px">消息</el-link>/
                <el-link style="font-size: 22px">
                  <!--<el-avatar :size="100" fit="fill" :src="'static/jpg/'+user.pic"></el-avatar>-->
                  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-submenu index="1" style="height: 50px">
                      <template style="border: 1px solid black;height: 50px" slot="title"><el-avatar :size="50" fit="fill" :src="'static/jpg/'+user.pic"></el-avatar></template>
                      <el-menu-item index="1-1">我的厨房</el-menu-item>
                      <el-menu-item index="1-2">退出</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-link>
              </el-menu-item>
              <el-menu-item v-else style="margin-left: 18%;line-height: 90px">
                <el-link style="font-size: 22px" href="http://localhost:8081/#/login2">登陆</el-link>/
                <el-link style="font-size: 22px" href="http://localhost:8081/#/register">注册</el-link>
              </el-menu-item>
            </el-menu>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    import user from "../../store/models/user";

    export default {
        name: "main",
        data() {
          return{
            user:{uname:''},
            isuser:false,
          }
        },
      created:function () {
          this.user=this.$store.state.user.userInfo;
          if (undefined!==this.user.uname){
            this.isuser=true;
          } else {
            this.isuser=false;
          }
      }
    }
</script>

<style scoped>
  .el-header{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 785px;
  }
</style>
