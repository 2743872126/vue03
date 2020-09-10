<template>
  <div>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="200px" >
        <!--style="background-color: rgb(238, 241, 246)"-->
        <el-menu :default-openeds="['0']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-setting"></i>信息操作</template>
            <el-menu-item-group>
             <!-- <template slot="title">修改</template>-->
              <el-menu-item index="1-1"@click="dialogVisible= true">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-left: -15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="dialogVisible= true">修改</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{this.user[0].cname}}</span>
        </el-header>
        <el-main>
          <el-table :data="this.per">
            <el-table-column prop="cname" label="姓名" width="400">
            </el-table-column>
            <el-table-column prop="lognum" label="账号" width="400">
            </el-table-column>
            <el-table-column prop="pwd" label="密码" width="400">
            </el-table-column>
            <el-table-column label="当前时间" width="400">
              {{ nowDate + ' ' + nowTime + ' ' + nowWeek }}
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="dialogVisible">
      <el-form ref="fm" :model="NewPass" :rules="roles" label-width="200px">
        <el-form-item label="姓名">
          <el-input v-model="user[0].cname" disabled style="width: 500px;margin-left:-200px"></el-input>
        </el-form-item>
        {{user[0]}}
        <el-form-item label="原密码">
          <el-input v-model="user[0].pwd" disabled style="width: 500px;margin-left:-200px"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="NewPwd">
          <el-input v-model="NewPass.NewPwd" style="width: 500px;margin-left:-200px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="ChangePwd()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    name:'Myself',
    data() {
      return {
        roles:{
          NewPwd:[{required:true,message:'新密码不能为空'}],
        },
        OldPwd:'',
        NewPass: {},
        dialogVisible:false,
        per:[],//个人查询
        user:[JSON.parse(this.$session.get("users"))],
        nowDate: "",    // 当前日期
        nowTime: "",    // 当前时间
        nowWeek: ""     // 当前星期
      }
    },
    methods:{
      open2() {
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      },
      ChangePwd:function(){
          let updPwd = this.$qs.stringify({'Pwd':this.NewPass.NewPwd,'cid':this.user[0].cid})
          this.$refs['fm'].validate(valid=> {
            if (valid) {
              this.$axios.post('http://localhost:8080/cookbooktest/backstage/UpdCustomerPwd', updPwd).then(resp => {
                if (resp.data == 1) {
                  this.$message('修改成功')
                  this.$session.clear();
                  this.$router.push({name: 'Login'})
                } else {
                  this.$message('用户名错误')
                }
              })
            }
          })
      },
      currentTime() {
        setInterval(this.getDate, 100);
      },
      getDate: function() {
        let _this = this;
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth() + 1;
        let dd = new Date().getDate();
        let week = new Date().getDay();
        let hh = new Date().getHours();
        let mf =
          new Date().getMinutes() < 10
            ? "0" + new Date().getMinutes()
            : new Date().getMinutes();
        if (week == 1) {
          this.nowWeek = "星期一";
        } else if (week == 2) {
          this.nowWeek = "星期二";
        } else if (week == 3) {
          this.nowWeek = "星期三";
        } else if (week == 4) {
          this.nowWeek = "星期四";
        } else if (week == 5) {
          this.nowWeek = "星期五";
        } else if (week == 6) {
          this.nowWeek = "星期六";
        } else {
          this.nowWeek = "星期日";
        }
        _this.nowTime = hh + ":" + mf;
        _this.nowDate = yy+ "/ " + mm + "/" + dd;
      }
    },
    mounted() {
      this.currentTime();
    },
    beforeDestroy: function() {
      if (this.getDate) {
        console.log("销毁定时器")
        clearInterval(this.getDate); // 在Vue实例销毁前，清除时间定时器
      }
    },
    created () {
      let cid = this.$qs.stringify({"cid":this.user[0].cid})
      this.$axios.post('http://localhost:8080/cookbooktest/backstage/QueryCustomerByCid',cid).then(resp=>{
        this.per = resp.data
      })
    }
  };
</script>
