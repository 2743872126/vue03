<template>
    <div>
      <div style="border:1px solid black;width: 80%;margin-left: 10%">
        <el-container>
          <el-header style="height: 100px">
            <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
          </el-header>
          <el-container>
            <el-aside style="border:1px solid black;width: 70%">
              <div style="margin-right: 40px">
                <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;margin-left: 20px;margin-top: 20px;margin-bottom: 20px">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>{{menu.mname}}</el-breadcrumb-item>
                </el-breadcrumb>
                <h1 style="border:1px solid black;line-height: 70px;text-align: left;font-size: 40px">{{menu.mname}}</h1>
                <el-image :src="'static/jpg/'+menu.pic" style="border:1px solid black;width: 100%;height: 500px"></el-image>
                <p style="border:1px solid black;margin-top: -70px;line-height: 70px;color: dimgray;text-align: left">
                  <span style="color: crimson;font-size: 22px;font-weight: bold">{{menu.works.length}}</span>&nbsp;人做过这道菜
                  <el-button style="background-color: crimson;color: white;width: 100px;margin-left: 70%;height: 48px">收藏</el-button>
                </p>
                <hr />
                <p style="border:1px solid black;line-height: 14px;text-align: left;position: relative">
                  <el-avatar :size="80" fit="fill" :src="'static/jpg/'+menu.users.pic"></el-avatar>
                  <span style="position: absolute;top: 30px;left: 100px;font-size: 22px">{{menu.users.uname}}</span>
                </p>
                <p style="border:1px solid black;text-align: left;line-height: 30px;font-size: 20px">
                  {{menu.info}}
                </p>
                <h1 style="border:1px solid black;text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">用料</h1>
                <el-table :data="menudetails" :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
                  <el-table-column label="材料" prop="material"></el-table-column>
                  <el-table-column label="用量" prop="num"></el-table-column>
                </el-table>
                <h1 style="border:1px solid black;text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen;margin-top: 20px">{{menu.mname}}的做法</h1>
                <el-table :data="menuStep" :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
                  <el-table-column label="顺序" prop="msnum">
                    <template slot-scope="scope">
                      <span style="font-size: 25px;color: darkseagreen">{{scope.row.msnum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="步骤" prop="msinfo" width="380"></el-table-column>
                  <el-table-column label="图片" prop="msPic" width="300">
                    <template slot-scope="scope">
                      <img :src="'static/jpg/'+scope.row.mspic"alt=""/>
                    </template>
                  </el-table-column>
                </el-table>
                <h1 style="border:1px solid black;text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen;margin-top: 20px">
                  参照这个菜谱，大家做出 {{menu.works.length}} 作品
                  <a style="font-size: 18px;color: crimson;margin-left: 220px">全部 {{menu.works.length}} 作品</a>
                </h1>
              </div>
            </el-aside>
            <el-main style="border:1px solid black;">
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
</template>

<script>
    export default {
        name: "MenusDetail",
      data() {
        return {
          menu:{},
          menuStep:[],
          menudetails:[],
          status:false
        }
      },
      created:function () {
          this.menu=this.$route.params.menudetail;
        this.$axios.post('http://localhost:8080/cookbooktest/MenuStepsController/queryBymid',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.menuStep=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post('http://localhost:8080/cookbooktest/MaterialsDetailController/queryBymid',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.menudetails=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      }
    }
</script>

<style scoped>

</style>
