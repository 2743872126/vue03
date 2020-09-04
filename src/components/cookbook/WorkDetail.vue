<template>
  <div>
    <div style="width: 80%;margin-left: 10%">
      <el-container>
        <el-header style="height: 100px">
          <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
        </el-header>
        <el-container>
          <el-aside style="width: 70%">
            <div style="margin-right: 40px">
              <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;margin-left: 20px;margin-top: 20px;margin-bottom: 20px">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name:'menus',params:{'mtid':menutype.mtid,'mtname':menutype.mtname}}">{{menutype.mtname}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{menu.mname}}</el-breadcrumb-item>
              </el-breadcrumb>
              <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 500px"></el-image>
            </div>
          </el-aside>
          <el-main>

          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
        name: "WorkDetail",
      data() {
        return {
          work:{},
          menu:{},
          user:{},
          menutype:{}
        }
      },
      created:function () {
        this.work=this.$route.params.work;
      }
    }
</script>

<style scoped>

</style>
