<template>
    <div>
      <div style="border: 1px solid black; width: 80%;margin-left: 10%">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="width: 18%">
              <el-menu style="width: 99%" :default-active="activeIndex" class="el-menu-demo"   @select="handleSelect" collapse="true">
                <el-submenu v-for="v in menutypes" :index="v.mtid" :default-openeds="v.menutypess">
                  <template slot="title" >{{v.mtname}}</template>
                  <el-menu-item style="font-size: 20px" v-for="s in v.menutypess">{{s.mtname}}</el-menu-item>
                </el-submenu>
              </el-menu>
            </el-aside>
            <el-main>
              <el-container>
                <el-aside style="width: 65%">
                  <div style="border: 1px solid black;height: 330px">
                    <el-carousel height="328px">
                      <el-carousel-item v-for="item in thismonthmenu" :key="item.mid">
                        <el-image :src="'static/jpg/'+item.pic" style="width: 100%"></el-image>
                        <h3 class="small">{{ item }}</h3>
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </el-aside>
                <el-main>
                  <div style="border: 1px solid black;height: 330px;margin-top: -20px">

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
            upmonthmenu:[]
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
              this.thismonthmenu=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            })
        }
    }
</script>

<style scoped>

</style>
