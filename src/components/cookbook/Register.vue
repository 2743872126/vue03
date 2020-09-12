 <template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div v-width="400"style="margin-top: 10%;margin-left: 35%">
      <el-form label-width="70px" label-suffix=": " :model="usersup" :rules="rules" ref="fmup">

        <el-form-item label="手机号" prop="phone"> <!-- porp 与 model 值必须一致 -->
          <el-input v-model="usersup.phone" @blur="phoneSelect"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="usersup.pwd" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repwd">
          <el-input type="password" v-model="usersup.repwd"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="Msg">
          <el-input v-model="usersup.Msg"  style="margin-left:20px;width: 200px; float: left"></el-input>
          <el-Button :disabled="butshow"  style="margin-left:30px;float: left" @click="checksw();dialogVisible=true">{{count}}{{agin}}</el-Button>
        </el-form-item>
        <el-button type="primary" round @click="loginup()">登录</el-button>
        <el-button @click="resetup()" type="danger" round >重置</el-button>
      </el-form>
    <el-dialog title='滑动验证' :visible.sync="dialogVisible" width="30%">
      <div class="block">
        <p>让滑块至于{{mm[0]}}-{{mm[1]}}</p>
        <el-slider v-model="m2m" @change="getCode" range show-stops :max="20"></el-slider>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data: () => {
      return {
        dialogVisible: false,
        isLoading:true,
        butshow:false,
        timer:null,
        count:'获取验证码',
        agin:'',
        usersup: {},
        mm:[],
        m2m:[0,20],
        rules:{
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

          pwd:[
            {required:true,message:'不能为空',trigger:['blur','change']},
          ]
          ,
          repwd:[
            {required:true,message:'不能为空',trigger:['blur','change']},
          ]
          ,
          Msg:[
            {required:true,message:'不能为空',trigger:['blur','change']},
          ]
        }
      }
    },
    methods: {
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
          if (this.usersup.pwd != this.usersup.repwd) {
            this.$message.error('两次密码不一致')
          } else {
            if (undefined == this.usersup.phone) {
              this.$message.error("输入手机号")
            } else {
              this.$axios.post("http://localhost:8080/cookbooktest/SMS", this.$qs.stringify({'phone': this.usersup.phone})).then(res => {
                console.log(res)
                if (res.data.result == 0) {
                  this.isLoading = true;
                  setTimeout(function () {
                    this.isLoading = false;
                  }, 10000);
                }
                this.butshow = true;
                this.agin = "秒后重新获取"
                const TIME_COUNT = 60;
                if (!this.timer) {
                  this.count = TIME_COUNT;
                  this.timer = setInterval(()=> {
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
              })

            }
          }
        }
      },//注册
      loginup () {
        this.$refs['fmup'].validate(valid=>{
          // 当表单所有rules都返回true valid会是true
          if(valid){
            if(this.isLoading){
              this.$axios.post('http://localhost:8080/cookbooktest/register',this.$qs.stringify(this.usersup))
                .then(res => {
                  console.log(res);
                  if (null!==res.phone) {
                    this.$store.commit("USER_SIGNIN", res.data);
                    this.$router.push({name:'Login2'});
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
      },
      phoneSelect(){
        this.$axios.post('http://localhost:8080/cookbooktest/queryphone',this.$qs.stringify({phone:this.usersup.phone}))
          .then(res => {
            console.log(res);
            if (res.data.length!=0) {
              this.$message.error("这个手机号已经注册");
            }
          })
      }
    }
  }
</script>

<style scoped>
  .el-form {
    border: 2px solid #f5e6db;
    width: 800px;
    margin: 100px  auto ;
    border-radius: 25px;
    padding: 20px 50px 50px 20px;
    text-align: center;
  }
</style>
