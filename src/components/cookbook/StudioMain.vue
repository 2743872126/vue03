<template>
  <el-container>
    <el-aside style="width: 70%;border: 1px solid black">
      <!--新秀课程-->
      <div style="height: 900px">
        <div style="height:50px">
          <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px">新秀课程</p>
        </div>
        <div style="width: 200px;height: 280px;float: left;margin-right: 5px;margin-bottom:20px" v-for="v in newStudio">
          <el-card style="width: 200px;height: 280px;margin-right: 5px;margin-left: 5px;margin-bottom:20px" :body-style="{ padding: '0px' }">
            <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 180px" ></el-image>
            <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray">{{v.username}}</p>
            <p style="font-size: 14px;line-height: 14px" >{{v.sname.substr(0,8)}}..</p>
            <p style="font-size: 13px;line-height: 14px;text-align: left;color: crimson" v-if="v.paycount!=null">{{v.paycount}}人购买过</p>
          </el-card>

        </div>

        <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px;clear: both">高分好课</p>
        <div style="width: 200px;height: 250px;float: left;margin-right: 5px;margin-bottom:20px" v-for="v in highStudio">
          <el-card style="width: 200px;height: 300px;margin-right: 5px;margin-left: 5px;margin-bottom:20px" :body-style="{ padding: '0px' }">
            <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 200px" ></el-image>
            <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray">{{v.username}}</p>
            <p style="font-size: 14px;line-height: 14px" >{{v.sname.substr(0,8)}}..</p>
            <p style="font-size: 13px;line-height: 14px;text-align: left;color: crimson">
              <span v-if="v.paycount!=null">{{v.paycount}}人购买过</span>
              <span v-if="v.avgstart!=null">{{v.avgstart}}分</span>
            </p>
          </el-card>

        </div>
      </div>
      <!--&lt;!&ndash;本月最热&ndash;&gt;
      <div >
        <div style="height:70px;position: relative">
          <span style="position: absolute;top: -50px;left: 10px;font-size: 30px;color: darkseagreen">本月最热</span>
          <span style="position: absolute;top: -50px;left: 150px;font-size: 18px;color: red">
                        <a style="color: crimson" href="http://localhost:8081/#/Menus">全部</a>
                      </span>
        </div>
        <div style="border: 1px solid gainsboro;width: 255px;height: 250px;float: left;margin-right: 5px;margin-left: 5px;margin-bottom:20px;position: relative" v-for="v in thismonthmenu">
          <el-image :src="'static/jpg/'+v.pic" style="width: 100%;height: 70%" @click="menudetail(v)"></el-image>
          <span style=" height:90px;width:253px;position: absolute;top: 50%;left: 0px;font-size: 24px" @click="menudetail(v)">{{v.mname.substr(0,8)}}..</span>
          <span style=" height:90px;width:253px;position: absolute;top: 63%;left: 0px;font-size: 18px;color: darkgrey"><a style="color: black">{{v.users.uname}}</a>&nbsp;&nbsp;&nbsp;&nbsp;{{v.works.length}}人做过</span>
        </div>
      </div>-->
    </el-aside>
    <el-main style="border: 1px solid black">
      <!--<div v-if="isuser==true" style="height: 350px;margin-top: -20px;margin-right: -20px;background-color: #E9EEF3;position: relative">
        <el-avatar :size="100" fit="fill" :src="'static/jpg/'+user.pic" style="margin-top: 50px"></el-avatar>
        <h1 style="margin-top: -120px"><a style="color: crimson">{{user.uname}}的厨房</a></h1>
        <h1 style="margin-top: -120px;font-size: 20px">
          <a style="color: crimson">{{user.munus.length}}菜谱</a>|
          <a style="color: crimson">{{user.works.length}}作品</a>|
          <a style="color: crimson">{{user.user_menus.length}}收藏</a>|
          <a style="color: crimson">草稿箱</a>
        </h1>
        <el-button style="position: absolute;top: 260px;left: 40%;background-color: crimson;color: white;width: 100px;height: 50px" @click="creatMenu">创建菜谱</el-button>
      </div>
      <div v-else style="height: 350px;margin-top: -20px;margin-right: -20px;background-color: #E9EEF3">
        <el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px;margin-top: 130px" @click="loginin">登陆</el-button>
        <el-button style="background-color: crimson;color: white;width: 170px;height: 60px;font-size: 22px" @click="loginon">注册</el-button>
      </div>
-->
      <!--&lt;!&ndash;下厨的朋友们&ndash;&gt;
      <div style="height: 800px;margin-top: 20px;margin-right: -20px;">
        <div style="height:70px;position: relative">
          <span style="position: absolute;top: -50px;left: 10px;font-size: 30px;color: darkseagreen">万能的吃货</span>
          <span style="position: absolute;top: -50px;left: 180px;font-size: 18px;color: red" @click="moreusers"><a style="color: crimson">更多</a></span>
        </div>
        <div style="border: 1px solid gainsboro;height: 120px;margin-bottom:20px;position: relative" v-for="v,i in users.slice(0,8)">
          <el-avatar style="position: absolute;left: 0px;top: 20px" :size="80" fit="fill" :src="'static/jpg/'+v.pic"></el-avatar>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: -40px;left: 100px;font-size: 22px">
                        <a style="color: black">{{v.uname.substr(0,4)}}..</a>
                        <el-image src="static/jpg/xingji.png" v-if="v.users.state===1" style="height: 30px"></el-image>
                      </span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: -10px;left: 100px;font-size: 18px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 20px;left: 100px;font-size: 18px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
          <el-button  style="background-color: crimson;color: white;width: 100px;height: 50px;font-size: 22px;position: absolute;top: 35px;left: 245px"  v-show="v.uid!==user.uid" @click="guanzhu(i)">
            <span v-if="v.state===0">关注</span><span v-else>取关</span><br>
          </el-button>
          &lt;!&ndash;
                                <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px;position: absolute;top: 35px;left: 275px" @click="guanzhu(v.uid)">已关注</el-button>
          &ndash;&gt;
        </div>
      </div>-->
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "StudioMain",
      data() {
        return {
          newStudio:[],
          highStudio:[]
        }
      },
      created:function () {
        this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/querynewStudio')
          .then(resp=>{
            this.newStudio=resp.data;
            this.newStudio.forEach(value => {
              this.$axios.post('http://localhost:8080/cookbooktest/UController/querybyid',this.$qs.stringify({uid:value.uid}))
                .then(resp=>{
                  value.username=resp.data.uname;
                  this.$axios.post('http://localhost:8080/cookbooktest/UserTurnoverController/querycountBysid',this.$qs.stringify({sid:value.sid}))
                    .then(resp=>{
                      value.paycount=resp.data;
                    })
                    .catch(err=>{
                      this.$message.error("错误");
                    });
                })
                .catch(err=>{
                  this.$message.error("错误");
                });

            })
          })
          .catch(err=>{
            this.$message.error("错误");
          });

        this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/queryOrderBystart')
          .then(resp=>{
            this.highStudio=resp.data;
            this.highStudio.forEach(value => {
              this.$axios.post('http://localhost:8080/cookbooktest/UController/querybyid',this.$qs.stringify({uid:value.uid}))
                .then(resp=>{
                  value.username=resp.data.uname;
                  this.$axios.post('http://localhost:8080/cookbooktest/UserTurnoverController/querycountBysid',this.$qs.stringify({sid:value.sid}))
                    .then(resp=>{
                      value.paycount=resp.data;
                    })
                    .catch(err=>{
                      this.$message.error("错误");
                    });
                })
                .catch(err=>{
                  this.$message.error("错误");
                });




            })
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      }
    }
</script>

<style scoped>

</style>
