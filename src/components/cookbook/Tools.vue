<template>
    <div>
      <el-tabs type="border-card" style="margin-top: -80px ;width: 80%;margin-left: 10%">
        <el-tab-pane label="换头像">
          <p>换头像</p>
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-change="changeRequest"
            accept=".jpg,.png"
            :auto-upload="false"
          >
            <el-avatar fit="scale-down" :size="200" v-if="imageUrl" :src="imageUrl"></el-avatar>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
         <el-tab-pane label="改信息">
           <el-form :model="users" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

             <el-form-item label="昵称" prop="uname">
               <el-input v-model="users.uname"></el-input>
             </el-form-item>

             <el-form-item label="个人简介" prop="selfinfo">
               <el-input v-model="users.selfinfo"></el-input>
             </el-form-item>

             <el-form-item label="性别">
               <el-radio-group >
                 <radio v-model="users.sex" border size="medium" class="el-radio" value="0">男</radio>
                 <radio v-model="users.sex" border size="medium" class="el-radio" value="1">女</radio>
               </el-radio-group>
             </el-form-item>
             <el-form-item label="生日">
               <el-date-picker v-model="users.birthday"></el-date-picker>
             </el-form-item>
             <el-form-item>
               <el-button type="primary" @click="submitForm">提交</el-button>
               <el-button @click="resetForm">重置</el-button>
             </el-form-item>
           </el-form>
         </el-tab-pane>

        <el-tab-pane  label="改密码">
          <el-form :model="userss" ref="pwdform" :rules="rulesS" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号"> <!-- porp 与 model 值必须一致 -->
              <el-input disabled="true" v-model="userss.phone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="msg">
              <el-input v-model="userss.msg"  style="margin-left:20px;width: 200px; float: left"></el-input>
              <el-Button :disabled="butshow"  style="margin-left:30px;float: left" @click="checksw();dialogVisible=true">{{count}}{{agin}}</el-Button>
            </el-form-item>
            <el-form-item  label="新密码"  prop="pwd">
              <el-input type="password" v-model="userss.pwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updatePwd">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-dialog title='滑动验证' :visible.sync="dialogVisible" width="30%">
          <div class="block">
            <p>让滑块至于{{mm[0]}}-{{mm[1]}}</p>
            <el-slider v-model="m2m" @change="getCode" range show-stops :max="20"></el-slider>
          </div>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
        </el-dialog>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'Tools',
    data(){
      return {
        dialogVisible: false,
        isLoading:true,
        butshow:false,
        timer:null,
        count:'获取验证码',
        agin:'',
        newpwd:'',
        imageUrl: '',
        mm:[],
        m2m:[0,20],
        userss:{phone:this.$store.state.user.userInfo.phone},
        users:{uid:this.$store.state.user.userInfo.uid,selfinfo:this.$store.state.user.userInfo.selfinfo,uname:this.$store.state.user.userInfo.uname,sex:this.$store.state.user.userInfo.sex,birthday:this.$store.state.user.userInfo.birthday},
        token:'',
        rules:{
          uname:[
            {required:true,message:'不能为空'},
            {min:2,max:20,message:'20位',trigger:['blur']},
            {validator:function(rule,value,callback){
                if(value.indexOf('-') == -1){
                  callback();
                }else{
                  callback(new Error("不能包 含特殊字符"));
                }
              },trigger: ['blur','change']}
          ],
          selfinfo:[
            {required:true,message:'不能为空',trigger:['blur','change']},
            {min:10,max:99,message:'99字符',trigger:['blur','change']},
          ]
        },
        rulesS:{

          Msg:[
            {required:true,message:'不能为空',trigger:['blur','change']},
            {min:6,max:6,message:'6位',trigger:['blur']},
          ],
          pwd:[
            {required:true,message:'不能为空'},
            {validator:function(rule,value,callback){
                if(value.indexOf('-') == -1){
                  callback();
                }else{
                  callback(new Error("不能包 含特殊字符"));
                }
              },trigger: ['blur','change']}
          ],
        }
      }
    },
    created(){
      this.imageUrl="/static/jpg/"+this.$store.state.user.userInfo.pic
    }
    ,
    methods: {
      checksw () {
        this.mm[0] = Math.round(Math.random() * (10 - 1) + 1);
        this.mm[1] = Math.round(Math.random() * (20 - 10) + 10);
      }
      ,
      countDown: function () {
        this.timer = setInterval(function () {
          this.countDownNum--;
          if (this.countDownNum <= 0) {
            clearInterval(this.timer);
          }
        }, 1000);
      },
      mounted: function () {
        this.countDown()
      },
      getCode () {
        if (this.m2m[0] == this.mm[0] && this.m2m[1] == this.mm[1]) {
          this.dialogVisible = false;
          if (undefined == this.userss.phone) {
            this.$message.error("输入手机号")
          } else {
            this.$axios.post("http://localhost:8080/cookbooktest/SMS", this.$qs.stringify({'phone': this.userss.phone})).then(res => {
              console.log(res)
              if (0 == res.data.result) {
                this.isLoading = true;
                setTimeout(function () {
                  this.isLoading = false;
                }, 10000);
              }
            })
            this.butshow = true;
            this.agin = "秒后重新获取"
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.count = TIME_COUNT;
              this.timer = setInterval(function () {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                  this.count--;
                } else {
                  clearInterval(this.timer);
                  this.timer = null;
                  this.butshow = false;
                  this.count = "获取验证码"
                  this.agin = ''
                }
              }, 1000)
            }
          }
        } else {
          console.log(this.mm + "." + this.m2m);
        }
      }
      ,
      submitForm () {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.$axios.post("http://127.0.0.1:8080/cookbooktest/updateInfo", this.users).then(res => {
              this.$axios.post("http://localhost:8080/cookbooktest/quryByPwd", this.$store.state.user.userInfo).then(res => {
                this.$store.commit("USER_SIGNIN", res.data);
                this.$router.push({name: 'main'});
              })
            }).catch(err => {
              this.$message.error("请稍后尝试");
            })
          }
        })
      },
      resetForm () {
        this.users = {};
        this.userss = {};
      },
      changeRequest (file) {
        let file1 = URL.createObjectURL(file.raw);
        this.imageUrl = file1;
        let asdfasd = new FormData();
        asdfasd.append("file1", file.raw);
       /* let date = new Date()
        let month = date.getMonth() + 1
        let datetime = date.getFullYear() + ""// "年"+ (month >= 10 ? month : "0" + month)+ ""// "月"+ (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())+ ""+ (date.getHours() < 10 ? "0" + date.getHours() : date.getHours())+ ""+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())+ ""+ (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds());
        this.$axios.post('http://route.showapi.com/1201-1',JSON.stringify({
          "showapi_timestamp": datetime,
          "showapi_appid":'354478', //这里需要改成自己的appid
          "showapi_sign": '11da97de4cb648eea1c86d1d07eae84c',  //这里需要改成自己的应用的密钥secret
          "imgFile":file.raw
        }),{headers: {'Content-Type':"application/json;charset=utf-8" }}).then(res=>{
          console.log(res);
        }).catch(err=>{
          this.$message.error("操作失败!");
        })*/
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/file/uploadpic", asdfasd, {headers: {'Content-Type': 'multipart/form-data'}})
          .then(res => {
            this.$axios.post("http://localhost:8080/cookbooktest/file/uploaduserPicsql", this.$qs.stringify({uid: this.$store.state.user.userInfo.uid})).then(res => {
              this.$store.state.user.userInfo.pic = res.data;
              this.imageUrl = "/static/jpg/" + res.data
            })
          }).catch(err => {
          this.$message.error("请稍后尝试");
        })
      },
      updatePwd () {
        this.$refs['pwdform'].validate(valid => {
          if (valid) {
            this.$axios.post("http://127.0.0.1:8080/cookbooktest/MsgUpdatePwd", {
              phone: this.userss.phone,
              msg: this.userss.msg,
              pwd: this.userss.pwd
            }).then(res => {
              this.$store.commit("USER_SIGNOUT");
              this.$router.push({name: 'Login2'});
            }).catch(err => {
              this.$message.error("请稍后尝试");
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
