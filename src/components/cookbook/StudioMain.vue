<template>
  <el-container>
    <el-aside style="width: 70%">
      <!--新秀课程-->
      <div style="height: 2000px">
        <div style="height:50px">
          <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px">新秀课程</p>
        </div>
        <div >
          <div @click="StudioDetail(v.sid)" style="width: 200px;height: 300px;float: left;margin-right: 5px;margin-bottom:20px" v-for="v in newStudio">
            <el-card  style="width: 200px;height: 280px;margin-right: 5px;margin-left: 5px;margin-bottom:20px" :body-style="{ padding: '0px' }">
              <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 180px" @click="StudioDetail(v.sid)"></el-image>
              <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray" >{{v.username}}</p>
              <p style="font-size: 14px;line-height: 14px" >{{v.sname.substr(0,8)}}..</p>
              <p style="font-size: 13px;line-height: 14px;text-align: left;color: crimson">{{v.paycount}}人购买过
                <span style="margin-left: 60px">{{v.upTime.substr(0,10)}}</span>
              </p>
            </el-card>
          </div>
        </div>

        <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px;clear: both">高分好课</p>
        <div @click="StudioDetail(v.sid)" style="width: 200px;height: 300px;float: left;margin-right: 5px;margin-bottom:20px" v-for="v in highStudio">
          <el-card style="width: 200px;height: 300px;margin-right: 5px;margin-left: 5px;margin-bottom:20px" :body-style="{ padding: '0px' }">
            <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 200px" @click="StudioDetail(v.sid)"></el-image>
            <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray">{{v.username}}</p>
            <p style="font-size: 14px;line-height: 14px" >{{v.sname.substr(0,8)}}..</p>
            <p style="font-size: 13px;line-height: 14px;text-align: left;color: crimson">
              {{v.paycount}}人购买过
              <span style="margin-left: 100px">{{v.avgstart}}分</span>
            </p>
          </el-card>
        </div>
      </div>

    </el-aside>
    <el-main >
        <p style="font-size: 14px;color: darkseagreen;text-align: left;line-height: 14px"><a style="color: crimson">查看我的课程>></a></p>
      <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px;clear: both">优秀美食作家</p>
      <div @click="toThirePerson(v.uid)" v-for="v in youxiuuser" style="width: 110px;height: 180px;float: left;margin-right: 5px;margin-bottom:20px">
        <el-card :body-style="{ padding: '0px' }" style="margin-top: 20px">
          <el-avatar :size="50" fit="fill" :src="'static/jpg/'+v.pic" style="margin-top: 20px"></el-avatar>
          <p style="line-height: 20px;margin-top: -50px"><a style="color:crimson">{{v.uname}}</a>   <el-image src="static/jpg/xingji.png" style="height: 20px"></el-image></p>
          <p style="line-height: 20px;font-size: 12px">
             {{v.follows.length}}粉丝 |  {{v.mystudio.length}}课程
          </p>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "StudioMain",
      data() {
        return {
          newStudio:[],
          highStudio:[],
          youxiuuser:[]
        }
      },
      created:function () {
            this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/querynewStudio')
              .then(resp=>{
                this.newStudio=resp.data;
                this.newStudio.forEach(value => {
                  this.$axios.post('http://localhost:8080/cookbooktest/UController/querybyid',this.$qs.stringify({uid:value.uid}))
                    .then(resp=>{
                      this.newStudio=[]
                      value.username=resp.data.uname;
                      this.newStudio.push(value)
                    })
                    .catch(err=>{
                      this.$message.error("错误");
                    });
                  this.$axios.post('http://localhost:8080/cookbooktest/UserTurnoverController/querycountBysid',this.$qs.stringify({sid:value.sid}))
                    .then(resp=>{
                      this.newStudio=[]
                      value.paycount=resp.data;
                      this.newStudio.push(value)
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
                  this.highStudio=[]
                  value.username=resp.data.uname;
                  this.highStudio.push(value)

                })
                .catch(err=>{
                  this.$message.error("错误");
                });

              this.$axios.post('http://localhost:8080/cookbooktest/UserTurnoverController/querycountBysid',this.$qs.stringify({sid:value.sid}))
                .then(resp=>{
                  this.highStudio=[]

                  value.paycount=resp.data;
                  this.highStudio.push(value)
                })
                .catch(err=>{
                  this.$message.error("错误");
                });


              this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/queryAvg',this.$qs.stringify({sid:value.sid}))
                .then(resp=>{
                  this.highStudio=[]
                  value.avgstart=resp.data;
                  this.highStudio.push(value)
                  console.info(this.highStudio)

                })
                .catch(err=>{
                  this.$message.error("错误");
                });

            })
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        //获取优秀作家
        this.$axios.post('http://localhost:8080/cookbooktest/UController/queryMeiShiZuoJia')
          .then(resp=>{
            this.youxiuuser=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      },
      methods:{
        StudioDetail(sid){
          this.$router.push({name:'StudioBook',params:{'sid':sid}})
        },
        toThirePerson(uid){
          this.$router.push({name:'TheirPersonal',params:{uid:uid}})
        },
      }
    }
</script>

<style scoped>

</style>
