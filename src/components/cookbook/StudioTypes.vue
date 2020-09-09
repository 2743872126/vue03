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
            <el-menu :default-active="studiotypes.stid+'-'+studiotypes.stname" unique-opened  :router="true" style="width: 99%" class="el-menu-demo"   @select="handleSelect" >
              <el-menu-item index="全部" :route="{name:'ChilerenAllMenus'}">全部</el-menu-item>
              <el-submenu v-for="v in studiotypes" :index="v.stid" :default-openeds="v.studioTypes">
                <template slot="title" >{{v.stname}}</template>
                <el-menu-item :index="s.stid+'-'+s.stname" style="font-size: 14px;color:gray" v-for="s in v.studioTypes" :route="{name:'ChildrenMenu',query:{'mtid':s.mtid,'mtname':s.mtname}}">
                  {{s.stname}}
                </el-menu-item>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-main style="width: 70%">
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
        name: "StudioTypes",
      data(){
        return{
          isCollapse: true,
          studiotypes:[],
          users:[],
          menutypeinfo:{mtid:this.$route.params.mtid,mtname:this.$route.params.mtname}
        }
      },
      created:function () {
        this.$axios.post('http://localhost:8080/cookbooktest/StudioTypeController/queryall')
          .then(resp=>{
            this.studiotypes=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      }
    }
</script>

<style scoped>

</style>
