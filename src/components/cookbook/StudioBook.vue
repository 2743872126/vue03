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
                <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name:'StudioTypes',params:{'stid':typename.stid,'stname':typename.stname}}">{{typename.stname}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{studioDet.sname}}</el-breadcrumb-item>
              </el-breadcrumb>
              <h1 style="line-height: 70px;text-align: left;font-size: 40px">{{studioDet.sname}}</h1>
              <el-image :src="'static/video/'+studioDet.stupic" style="width: 100%;height: 500px"></el-image>
              <p style="margin-top: -70px;line-height: 70px;color: dimgray;text-align: left">
                <span style="color: crimson;font-size: 22px;font-weight: bold">{{sales}}</span>销量
                &nbsp;&nbsp;平均分：{{avgstart}}
                <el-button @click="isCollecteds" style="background-color: crimson;color: white;width: 100px;margin-left: 50%;height: 48px">
                  <span v-show="isFollow">收藏</span>
                  <span v-show="!isFollow">取消收藏</span><br>
                </el-button>
                <el-button style="background-color: crimson;color: white;width: 140px;margin-left: 2%;height: 48px" v-if="studioDet.uid!==$store.state.user.userInfo.uid&&isPay==false" @click="Pay()">￥{{studioDet.money}}  购买课程</el-button>
              </p>
              <hr />
              <p style="line-height: 14px;text-align: left;position: relative">
                <img :src="'static/jpg/'+userInfo.pic" width="80" height="80"/>
                <span style="position: absolute;top: 30px;left: 100px;font-size: 22px">{{userInfo.uname}}</span>
              </p>
              <p style="text-align: left;line-height: 30px;font-size: 20px">
                {{studioDet.info}}
              </p>
              <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">选看</h1>
              <el-row :gutter="10" v-for="(v,i) in studioDet.studioDetails">
                <el-col :span="2"><div class="grid-content bg-purple">{{i+1}}</div></el-col>
                <el-col :span="18"><div class="grid-content bg-purple" :title="v.sinfo">{{v.sinfo}}</div></el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <router-link v-if="studioDet.uid==$store.state.user.userInfo.uid" :to="{path:'/videoPlay',query:{surl:v.surl,'pic':studioDet.stupic}}" target="_blank">立即查看</router-link>
                    <router-link v-else-if="v.state==0"  :to="{path:'/videoPlay',query:{surl:v.surl,'pic':studioDet.stupic}}" target="_blank">免费观看</router-link>
                    <a v-else-if="v.state==1 && isPay==false" @click="Pay()">付费观看</a>
                    <router-link v-else-if="v.state==1 && isPay" :to="{path:'/videoPlay',query:{surl:v.surl,'pic':studioDet.stupic}}" target="_blank">观看</router-link>
                  </div>
                </el-col>
              </el-row>
              <div style="background-color: gainsboro">
                <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">课程评价
                  <a style="font-size: 16px;color: crimson;margin-left: 580px" v-show="isPay" @click="cl">写评价</a>
                </h1>
<!--
                {{this.studioMessages}}
-->
                <div v-for="l in studioMessages">
                  <p style="text-align:left;line-height: 20px;position: relative">
                    <el-avatar :size="40" fit="fill" :src="'static/jpg/'+l.leveluser.pic"></el-avatar>
                    <a style="color: crimson;position: absolute;top: 10px;left: 50px">{{l.leveluser.uname}}</a>
                    <span style="position: absolute;top: 10px;left: 110px;color: dimgray">{{l.evaluateTime.substr(0,10)}}</span>
                  </p>
                  <p style="text-align:left;line-height: 30px;margin-top: -15px;margin-left: 50px">
                    <el-rate
                      v-model="l.start"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                    <!--{{l.start}}分-->
                  </p>
                  <p style="text-align:left;line-height: 30px;margin-top: -15px;margin-left: 50px">
                    {{l.message}}
                  </p>
                </div>
              </div>
              <el-dialog
                title="写评价"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <el-form :model="Message" style="width: 90%;margin-left: 5%">
                  <el-form-item>
                    <el-rate v-model="Message.start"></el-rate>
                  </el-form-item>
                  <el-form-item >
                    <el-input type="textarea" :rows="5"
                              placeholder="请输入内容" v-model="Message.message"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="fabu()">发布</el-button>
                </div>
              </el-dialog>
            </div>
          </el-aside>
          <el-main>
            <p style="text-align: left;color: dimgray;line-height: 30px">
              版权归作者所有，没有作者本人的书面许可任何人不得转载或使用整体或任何部分的内容。
            </p>

          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StudioBook',
    data(){
      return {
        dialogVisible:false,
        studioDet:{},
        typename:{},
        sales:'',// 销量
        userInfo:{},
        isPay:false,
        isFollow:false,
        pay:{},
        payInfo:{
          outTradeNo:'',
          subject:'',
          totalAmount:'',
          body:'',
        },
        studioMessages:[],
        Message:{sid:this.$route.params.sid,message:'',start:'',uid:this.$store.state.user.userInfo.uid},
        avgstart:''
      }
    },
    created(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/querydetail",this.$qs.stringify({sid:this.$route.params.sid}))
        .then(res=>{
          this.studioDet=res.data;
          this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/queryAvg',this.$qs.stringify({sid:this.$route.params.sid}))
            .then(resp=>{
              this.avgstart=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
          this.$axios.post("http://localhost:8080/cookbooktest/Studio_MessageController/queryBysid",this.$qs.stringify({sid:this.studioDet.sid}))
            .then(res=>{
              this.studioMessages=res.data;
            }).catch(err=>{
            this.$message.error("错误");
          })
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryTypeByid",this.$qs.stringify({stid:this.studioDet.stid}))
            .then(re=>{
              this.typename=re.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/querystudiosales",this.$qs.stringify({sid:this.$route.params.sid}))
            .then(rs=>{
              this.sales=rs.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/studioQueryuser",this.$qs.stringify({uid:this.studioDet.uid}))
            .then(rr=>{
              this.userInfo=rr.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryPaysByids",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,sid:this.studioDet.sid}))
            .then(ss=>{
              this.isPay=ss.data=='no'?false:true;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyLikes",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,sid:this.studioDet.sid}))
            .then(res=>{
              if(res.data>0){
                this.isFollow=false;
              }else{
                this.isFollow=true;
              }
            })
        })


    },
    methods:{
      fabu(){
        if (this.Message.message==''){
          this.$message("请输入评价")
        } else if (this.Message.start=='') {
          this.$message("请评分")
        }else {
          this.$axios.post("http://localhost:8080/cookbooktest/Studio_MessageController/add",this.Message)
            .then(res=>{
              this.dialogVisible=false;
              this.$axios.post("http://localhost:8080/cookbooktest/Studio_MessageController/queryBysid",this.$qs.stringify({sid:this.studioDet.sid}))
                .then(res=>{
                  this.studioMessages=res.data;
                }).catch(err=>{
                this.$message.error("错误");
              })
            }).catch(err=>{
            this.$message.error("错误");
          })
        }
      },
      cl(){
        if (this.$store.state.user.userLogin) {
          this.dialogVisible=true
          this.Message={sid:this.$route.params.sid,message:'',start:'',uid:this.$store.state.user.userInfo.uid}
        }else {
          this.$confirm('请登录账号,是否登陆?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({name:'Login2'})
          }).catch(() => {
          });
        }
      },
      isCollecteds(){
        if (this.$store.state.user.userLogin) {
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/updateMyLikes",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,sid:this.studioDet.sid}))
            .then(res=>{
              if(res.data>0){
                this.isFollow=false;
              }else{
                this.isFollow=true;
              }
            })
        }else {
          this.$confirm('请登录账号,是否登陆?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({name:'Login2'})
          }).catch(() => {
          });
        }
      },
      Pay(){
        if (this.$store.state.user.userLogin) {
          var orderCode='';
          for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
          {
            orderCode += Math.floor(Math.random() * 10);
          }
          orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
          if(!this.isPay){
            this.pay=this.$qs.stringify({order_num:orderCode,bnbname:this.studioDet.sname,order_price:this.studioDet.money,sid:this.studioDet.sid,flog:1})
            this.$router.push({path:'/tanwei_pay',query:{pay:this.pay}})
          }else{
            this.$message("您已购买，请刷新后观看")
          }
        }else {
          this.$confirm('请登录账号,是否登陆?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({name:'Login2'})
          }).catch(() => {
          });
        }
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .bg-purple {
    background: #d3dce6;
    line-height: 35px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
