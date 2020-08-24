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
                <el-menu-item v-for="v in menu" index="menu.mtid">{{v.mtname}}</el-menu-item>
                <el-submenu index="2">
                  <template slot="title">我的工作台</template>
                  <el-menu-item index="2-1">选项1</el-menu-item>
                  <el-menu-item index="2-2">选项2</el-menu-item>
                  <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
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
