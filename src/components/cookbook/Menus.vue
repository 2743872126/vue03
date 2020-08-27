<template>
  <div>
    <div style=" width: 80%;margin-left: 10%">
      <el-container>
        <el-header style="height: 100px">
          <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
        </el-header>
        <el-container>
          <el-aside style="width: 18%">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 22px;margin-left: 50px;margin-top: 10px;margin-bottom: 20px">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{this.$route.params.mtname}}</el-breadcrumb-item>
            </el-breadcrumb>
            <!--菜普分类-->
            <el-menu :router="true" style="width: 99%" :default-active="activeIndex" class="el-menu-demo"   @select="handleSelect" >
              <el-submenu v-for="v in menutypes" :index="v.mtid" :default-openeds="v.menutypess">
                <template slot="title" >{{v.mtname}}</template>
                <el-menu-item :index="v.mtid+'-'+s.mtid" style="font-size: 20px;color: dimgray" v-for="s in v.menutypess" :route="{name:'menus',params:{'mtid':s.mtid,'mtname':s.mtname}}">{{s.mtname}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main style="border: 1px solid black;margin-left: 20px">
            <h1 style="border: 1px solid black;text-align: left;line-height: 70px;font-size: 50px">{{this.$route.params.mtname}}</h1>
            <el-radio-group v-model="tabPosition" style="margin-top: -100px;margin-left: -900px">
              <el-radio-button label="top">最近流行</el-radio-button>
              <el-radio-button label="right">最受欢迎</el-radio-button>
              <el-radio-button label="bottom">评分</el-radio-button>
            </el-radio-group>
            <div style="border: 1px solid black;height: 500px;margin-top: -90px">
              <div style="border: 1px solid black" v-for="v in menus">
                <el-image :src="'static/jpg/'+v.pic" style="width: 100%"></el-image>
                {{v}}
              </div>

            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Menus",
        data(){
            return{
              isCollapse: true,
              menutypes:[],
              users:[],
              tabPosition:top,
              menus:[],
            }
        },
        created:function () {
          this.$axios.post('http://localhost:8080/cookbooktest/MenuTypesController/queryall')
            .then(resp=>{
              this.menutypes=resp.data;
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
            });
          if (this.tabPosition==top){
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymtidorderliuxing',this.$qs.stringify({'mtid':this.$route.params.mtid}))
              .then(resp=>{
                this.menus=resp.data;
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          } else if (this.tabPosition==right){

          } else{

          }
        }
    }
</script>

<style scoped>

</style>
