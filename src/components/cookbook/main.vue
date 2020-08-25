<template>
    <div>
      <el-container>
        <el-header style="height: 100px">
          <div style="border: 1px solid black; width: 80%;margin-left: 10%;height: 98px">
            <el-menu style="height: 98px" :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">
                <el-link :underline="false" href="#">
                  <img src="static/jpg/logo2.jpg" height="98px" width="270px" />
                </el-link>
              </el-menu-item>
              <el-menu-item  style="margin-right: 123px;line-height: 90px">
                <el-input placeholder="搜索菜谱"></el-input>
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
              <el-menu-item  index="6" style="margin-left: 18%;line-height: 90px">
                <el-link style="font-size: 22px">登陆</el-link>/
                <el-link style="font-size: 22px">注册</el-link>
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
    export default {
        name: "main"
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
