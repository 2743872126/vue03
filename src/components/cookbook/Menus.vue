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
              <el-breadcrumb-item v-if="this.$route.params.state!==undefined">{{this.$route.params.state}}</el-breadcrumb-item>
              <el-breadcrumb-item v-else-if="menutypeinfo.mtname!==undefined">{{menutypeinfo.mtname}}</el-breadcrumb-item>
              <el-breadcrumb-item v-else>全部</el-breadcrumb-item>
            </el-breadcrumb>
            <!--菜普分类-->
            <el-menu :default-active="menutypeinfo.mtid+'-'+menutypeinfo.mtname" unique-opened  :router="true" style="width: 99%" class="el-menu-demo"   @select="handleSelect" >
              <el-menu-item index="全部" :route="{name:'ChilerenAllMenus'}">全部</el-menu-item>
              <el-submenu v-for="v in menutypes" :index="v.mtid" :default-openeds="v.menutypess">
                <template slot="title" >{{v.mtname}}</template>
                <el-menu-item :index="s.mtid+'-'+s.mtname" style="font-size: 20px;color: crimson" v-for="s in v.menutypess" :route="{name:'ChildrenMenu',query:{'mtid':s.mtid,'mtname':s.mtname}}">
                 {{s.mtname}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main style="border: 1px solid black;margin-left: 20px">
            <router-view></router-view>
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
              menutypeinfo:{mtid:this.$route.params.mtid,mtname:this.$route.params.mtname}
            }
        },
      watch:{
        '$route':{
          handler(newval,oldval){
            console.info(newval,oldval);
            if (newval.params.state!=undefined){
              this.$router.push({name:'CheckMenus',params:{menus:this.$route.params.menus,state:this.$route.params.state}})
            }
          },
          deep:true,
          immediate:true
        }
      },
        created:function () {
          console.info(this.menutypeinfo)
          if (this.$route.params.state!=undefined){
            console.info('this.$route.params.menus')
            console.info(this.$route.params.menus)
            console.info(this.$route.params.state)
            this.$router.push({name:'CheckMenus',params:{menus:this.$route.params.menus,state:this.$route.params.state}})
          }else {
            if (this.menutypeinfo.mtid == undefined) {
              this.$router.push({
                name: 'ChilerenAllMenus',
              })
            } else {
              this.$router.push({
                name: 'ChildrenMenu',
                query: {'mtid': this.menutypeinfo.mtid, 'mtname': this.menutypeinfo.mtname}
              })
            }
          }
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


        },
      methods:{
        handleSelect:function (key) {
          this.menutypeinfo.mtid=key.substr(0,key.indexOf('-'))
          this.menutypeinfo.mtname=key.substr(key.indexOf('-')+1);
          this.$router.push({name:'ChildrenMenu',params:{mtid:menutypeinfo.mtid,mtname:menutypeinfo.mtname}})
        },

      }
    }
</script>

<style scoped>

</style>
