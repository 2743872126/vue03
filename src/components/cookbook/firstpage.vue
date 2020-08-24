<template>
    <div>
      <div style="border: 1px solid black; width: 70%;margin-left: 15%">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="width: 250px">
              <el-menu style="width: 248px" :default-active="activeIndex" class="el-menu-demo"   @select="handleSelect" collapse="true">
                <el-menu-item v-for="v in menu" index="v.mtid">{{v.mtname}}</el-menu-item>
                <el-submenu v-for="v in menu" index="v.mtid">
                  <template slot="title">{{v.mtname}}</template>
                  <!--<el-menu-item v-for="m in v" index="m.mtid">{{m.mtname}}</el-menu-item>-->
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <el-container>
                <el-aside>

                </el-aside>
                <el-main>

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
            menu:[]
          };
        },
        created:function () {
          this.$axios.post('http://localhost:8080/cookbooktest/MenuTypesController/queryall')
            .then(resp=>{
                this.menu=resp.data;
            })
            .catch(err=>{
                this.$message.error("错误");
            })
        }
    }
</script>

<style scoped>
  .el-header{
    background-color: burlywood;
    border: black;
  }
  .el-aside{
    background-color: yellowgreen;
  }
  .el-main{
    background-color: coral;
  }
</style>
