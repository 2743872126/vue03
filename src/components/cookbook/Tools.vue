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
          <el-form :model="newpwd" ref="pwdform" label-width="100px" class="demo-ruleForm">
            <el-form-item label="密码">
              <el-input type="password" v-model="newpwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即创建</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>

      {{this.$store.state.user.userInfo.birthday}}
      <!--<el-link @click="gets">微博登录</el-link>
      <el-button @click="gettoken">token</el-button>
      <el-button @click="sends">发微博</el-button>-->
    </div>
</template>

<script>
  export default {
    name: 'Tools',
    data(){
      return {
        newpwd:'',
        imageUrl: '',
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
        }
      }
    },
    created(){
      this.imageUrl="/static/jpg/"+this.$store.state.user.userInfo.pic
    }
    ,
    methods:{
      /*gets(){
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/Weibo/test")
      },
      gettoken(){
        this.$axios.post("https://api.weibo.com/oauth2/access_token?client_id=3313083&client_secret=2993d022219761c5f625b2b2a3f66025&grant_type=authorization_code&redirect_uri=http://127.0.0.1:8080/cookbooktest/Weibo/callback&code=CODE").then(res=>{
          console.log(res);
        })
      },
      sends(){
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/Weibo/sends")

      }*/
      submitForm(){
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/updateInfo",this.users).then(res=>{
          this.$axios.post("http://localhost:8080/cookbooktest/quryByPwd",this.$store.state.user.userInfo).then(res=>{
            this.$store.commit("USER_SIGNIN", res.data);
            this.$router.push({name:'main'});
          })
        }).catch(err=>{
          this.$message.error("请稍后尝试");
        })
      },
      resetForm(){
        this.users={};
      },
      changeRequest(file) {
        let file1 =URL.createObjectURL(file.raw);
        this.imageUrl = file1;
        let asdfasd = new FormData();
        asdfasd.append("file1",file.raw);
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/file/uploadpic",asdfasd, {headers:{'Content-Type':'multipart/form-data'}})
          .then(res=>{
            this.$axios.post("http://localhost:8080/cookbooktest/file/uploaduserPicsql",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
              this.$store.state.user.userInfo.pic=res.data;
              this.imageUrl="/static/jpg/"+res.data
            })
          }).catch(err=>{
            this.$message.error("请稍后尝试");
        })
      }
    }
  }
</script>

<style scoped>

</style>
