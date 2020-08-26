<template>
  <div class="container">
      <div class="top">
        <el-row>
          <el-col :span="12">
            <el-avatar :size="200" :src="pic" style="margin-top: 40px;margin-bottom: -40px"></el-avatar>
            &nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 30px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
            &nbsp;<span>{{this.$store.state.user.userInfo.createTime.substring(0,10)}}加入</span>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="4">
            <el-row>
              <el-col :span="12"></el-col>
              <el-col :span="12">s</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <el-menu
          :router="true"
          class="el-menu-demo"
          default-active="1"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" :route="{name:'General'}">概况</el-menu-item>
          <el-menu-item index="2" :route="{name:'Mymenus'}">菜谱</el-menu-item>
          <el-menu-item index="3" :route="{name:'Myworks'}">作品</el-menu-item>
          <el-menu-item index="4" :route="{name:'Collected'}" :v-if="this.$store.state.user.userInfo.">收藏</el-menu-item>
          <el-menu-item index="5" :route="{name:'General'}" style="float: right">草稿箱</el-menu-item>
        </el-menu>
        <div>
          <router-view></router-view>
        </div>
      </div>

  </div>
</template>

<script>
  export default {
    name: 'Personal',
    data(){
      return {
        pic:this.$store.state.user.userInfo.pic,
      }
    },
  }
</script>

<style scoped>
  .container{
    width: 80%;
    text-align: center;
    margin-left: 10%
  }
  .top{
    border: 1px solid red;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .main{
    border: 1px solid green;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .el-menu-item{
    font-size: 19px;
  }
</style>
