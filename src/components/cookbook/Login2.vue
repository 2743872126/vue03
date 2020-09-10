<template>
  <div class="divss">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label">密码登录</span>
        <el-form label-width="70px" label-suffix=": " :model="usersin" :rules="rules" ref="fmin">
          <el-form-item label="手机号" prop="phone"> <!-- porp 与 model 值必须一致 -->
            <el-input v-model="usersin.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input type="password" v-model="usersin.pwd" ></el-input>
          </el-form-item>
          <el-form-item stylse="text-align: left">
            <el-checkbox @change="clickChecked" :checked="ischecked">记住密码</el-checkbox>
          </el-form-item>
          <el-button type="primary" round @click="loginIn()">登录</el-button>
          <el-button @click="resetin()" type="danger" round >重置</el-button>
        </el-form>
      </el-tab-pane>

      <el-tab-pane  label="验证码登录">
        <el-form label-width="70px" label-suffix=": " :model="usersup" :rules="rules2" ref="fmup">
          <el-form-item label="手机号" prop="phone"> <!-- porp 与 model 值必须一致 -->
            <el-input v-model="usersup.phone"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="Msg">
            <el-input v-model="usersup.Msg"  style="margin-left:20px;width: 200px; float: left"></el-input>
            <el-Button :disabled="butshow"  style="margin-left:30px;float: left" @click="checksw();dialogVisible=true">{{count}}{{agin}}</el-Button>
          </el-form-item>

          <el-button type="primary"   @click="loginup()">登录</el-button>
          <el-button @click="reset()" type="danger" round>重置</el-button>
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
    <div style="margin-top: 30px">还没有账号？<el-link type="success" @click="comeToRegister">去注册</el-link></div>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data: () => {
    return {
      ischecked:false,
      dialogVisible: false,
      isLoading:true,
      butshow:false,
      timer:null,
      count:'获取验证码',
      agin:'',
      usersin: {},
      usersup: {},
      mm:[],
      m2m:[0,20],
      rules:{
        phone:[
          {required:true,message:'不能为空'},
          {min:11,max:11,message:'手机号是11位',trigger:['blur','change']},
          {validator:function(rule,value,callback){
              if(value.indexOf('-') == -1){
                callback();
              }else{
                callback(new Error("不能包 含特殊字符"));
              }
            },trigger: ['blur','change']}
        ],

        pwd:[
          {required:true,message:'不能为空',trigger:['blur','change']},
        ]

      },
      rules2:{
        phone:[
          {required:true,message:'不能为空'},
          {min:11,max:11,message:'手机号是11位',trigger:['blur']},
          {validator:function(rule,value,callback){
              if(value.indexOf('-') == -1){
                callback();
              }else{
                callback(new Error("不能包 含特殊字符"));
              }
            },trigger: ['blur','change']}
        ],
        Msg:[
          {required:true,message:'不能为空',trigger:['blur','change']},
          {min:6,max:6,message:'验证码是6位',trigger:['blur','change']},
        ]
      }
    }
  },
  created(){
    this.usersin=this.$store.state.user.userInfo;
    if(null!=localStorage.getItem("phone")){
      this.usersin.phone=localStorage.getItem("phone");
    }
    if(null!=localStorage.getItem("pwd")){
      this.usersin.pwd=localStorage.getItem("pwd");
    }
    this.ischecked=localStorage.getItem("ischecked");
  },
  methods: {
    clickChecked(){
      if(this.ischecked){
        this.ischecked=false;
      }else{
        this.ischecked=true;
      }
    },
    checksw(){
      this.mm[0]=Math.round(Math.random()*(10-1)+1);
      this.mm[1]=Math.round(Math.random()*(20-10)+10);
    },
    countDown:function(){
      this.timer=setInterval(function() {
        this.countDownNum--;
        if(this.countDownNum<=0){
          clearInterval(this.timer);
        }
      },1000);
    },
    mounted:function(){
      this.countDown()
    },
    getCode(){
      if(this.m2m[0]==this.mm[0] && this.m2m[1]==this.mm[1]) {
        this.dialogVisible = false;
        if (undefined == this.usersup.phone) {
          this.$message.error("输入手机号")
        } else {
          this.$axios.post("http://localhost:8080/cookbooktest/SMS", this.$qs.stringify({'phone': this.usersup.phone})).then(res => {
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
      }
    },
    loginIn () {
      this.$refs['fmin'].validate(valid=>{
        // 当表单所有rules都返回true valid会是true
        if(valid){
          this.$axios.post('http://localhost:8080/cookbooktest/quryByPwd',this.usersin)
            .then(res => {
              if (0!==res.data.length) {

                this.$store.commit("USER_SIGNIN", res.data);
                if(this.ischecked){
                  localStorage.setItem("phone",res.data.phone);
                  localStorage.setItem("pwd",res.data.pwd);
                  localStorage.setItem("ischecked",this.ischecked);
                }else{
                  localStorage.removeItem("phone");
                  localStorage.removeItem("pwd");
                  localStorage.removeItem("ischecked")
                }
                this.$router.push({path:'/'});
              }else{
                this.$message.error('用户名或密码错误')
              }
            }).catch(err=>{alert(err)})
        }
      })

    },//注册
    loginup () {
      this.$refs['fmup'].validate(valid=>{
        // 当表单所有rules都返回true valid会是true
        if(valid){
          if(this.isLoading){
            this.$axios.post('http://localhost:8080/cookbooktest/queryByphone',this.$qs.stringify(this.usersup))
              .then(res => {
                console.log(res);
                if (''!==res.data) {
                  this.$store.commit("USER_SIGNIN", res);
                  this.$router.push({name:'main'});
                }else{
                  this.$message.error('验证码错误')
                }
              })
          }
        }
      })
    },
    reset() {
      this.usersup={};
      this.usersin={};
    },
    comeToRegister(){
      this.$router.push({name:"Register"});
    }
  }
}
</script>

<style scoped>

  .divss {
    border: 2px solid #f5e6db;
    width: 800px;
    margin: 100px  auto ;
    border-radius: 25px;
    padding: 20px 50px 50px 20px;
    text-align: center;
  }
</style>
