<template>
  <div>
    <!--<el-row :gutter="12">
    <el-col :span="7">
      <el-card shadow="hover">-->
    <el-form label-width="100px" label-suffix=":" :model="user" :rules="rules" ref="fm">
      <h2>登录</h2>
      <el-form-item label="用户名" prop="Lognum">
        <el-input v-model="user.Lognum"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Pwd">
        <el-input v-model="user.Pwd" show-password></el-input>
      </el-form-item>
     <!-- 记住密码<el-switch v-model='values' active-color="green"></el-switch>-->
      <el-button type="primary" round @click="login()">登录</el-button>
    </el-form>
      <!--</el-card>
    </el-col>
    </el-row>-->
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data: () => {
      return {
        table_info:[],
        user: {
          name:localStorage.getItem("name"),
          //pwd:localStorage.getItem("pwd")
        },
        values:false,
        rules: {
          Lognum: [
            {required:true,message:'用户名不能为空'},
            {min: 2, max: 8, message: '请输入正确的用户名', trigger: ['blur', 'change']},
            {
              validator: function (rule, value, callback) {
                if (value == '' || value == undefined || value == null) {
                  callback(new Error("用户名不能为空"));
                } else if (value.indexOf('_') == -1) {
                  callback();
                } else {
                  callback(new Error("不能包含特殊字符"));
                }
              }, trigger: ['blur', 'change']
            }
          ],
          Pwd: [
            {required:true,message:'密码不能为空'},
          ]
        }
      }
    },
    methods: {
      login: function () {
        let login = this.$qs.stringify({"Lognum":this.user.Lognum,"Pwd":this.user.Pwd})
        this.$axios.post('http://localhost:8080/cookbooktest/backstage/Login',login).then(response => {
          let users = response.data
          console.log(users)
          this.$session.set("users",JSON.stringify(users))
          this.$refs['fm'].validate(valid=>{if(valid) {
            if(this.user.Lognum === users.lognum && this.user.Pwd === users.pwd){
              this.$message('登录成功')
              this.$router.push({name:'Users'})
            }else{
              this.$message('用户名或密码错误')
            }
          }
          })
        })
      }
    }
  }
</script>
<style scoped>
  .el-form {
    border: 2px solid white;
    width: 20%;
    margin: 250px auto;
    border-radius: 25px;
    box-shadow: 0 0 15px #B3C0D1;
    padding: 20px 50px 50px 20px;
    text-align: center;
  }
</style>
