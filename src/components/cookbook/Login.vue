<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div v-width="400"style="margin-top: 10%;margin-left: 35%">
    <Tabs :datas="param" @change="change"></Tabs>
    <br><br><br>
    <Form
      ref="formup"
      :validOnChange="validOnChange"
      :showErrorTip="showErrorTip"
      :labelPosition="labelPosition"
      :labelWidth="110"
      :rules="validationRulesX"
      :model="modelX"
      v-show="showX"
    >
      <FormItem label="手机号" prop="phone">
        <template v-slot:label><i class="h-icon-phone"></i> 手机号</template>
        <input type="text" v-model="modelX.phone" >
      </FormItem>
      <FormItem label="密码" icon="h-icon-complete" prop="pwd">
        <input type="pwd" v-model="modelX.pwd" >
      </FormItem>
      <FormItem>
        <Button color="primary" :loading="isLoading" @click="signup">登录</Button>&nbsp;&nbsp;&nbsp;
        <Button @click="reset">重置</Button>
      </FormItem>
    </Form>
    <Form
      ref="form"
      :validOnChange="validOnChange"
      :showErrorTip="showErrorTip"
      :labelPosition="labelPosition"
      :labelWidth="110"
      :rules="validationRulesY"
      :model="modelY"
      v-show="showY"
    >
      <FormItem label="手机号" prop="phone">
        <template v-slot:label><i class="h-icon-user"></i> 手机号</template>
        <input type="text" v-model="modelY.phone" >
      </FormItem>
      <FormItem label="验证码" icon="h-icon-complete" prop="msg">
        <input type="msg" v-model="modelY.msg" v-width="160">
        <Button @click="getCode">{{count}}{{agin}}</Button>
      </FormItem>
      <FormItem>
        <Button color="primary" :loading="isLoading" @click="signin">登录</Button>&nbsp;&nbsp;&nbsp;
        <Button @click="reset">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import qs from 'qs'
  import session from 'vue-session'
export default {
  name:'Login',
  data() {
    return {
      countDownNum:3,
      count: '获取验证码',
      timer:null,
      agin:'',
      param: {
        module1: '账号登录',
        module2: '手机号登录'
      },
        mess:'获取验证码',
        isLoading: false,
        labelPosition: 'left',
        labels: {
          left: 'Label左对齐',
          right: 'Label右对齐'
        },
        modelX: {
          phone: '',
          pwd: ''
        },
        modelY: {
          phone: '',
          msg: ''
        },
        validationRulesX: {
          required: ['phone', 'pwd']
        },
        validationRulesY: {
          required: ['phone', 'msg']
        },
        showErrorTip: true,
        validOnChange: true,
        showX:true,
        showY:false
      }
  },
  methods: {
    countDown:function(){
      this.timer=setInterval(() => {
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
      let phone = this.$qs.stringify({"phone":this.modelY.phone})
      this.$axios.post("http://localhost:8080/cookbooktest/SMS",phone).then(resp =>{
        console.log(resp)
      })
      this.agin="秒后重新获取"
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
            this.count="获取验证码"
            this.agin = ''
          }
        }, 1000)
      }
    },
    change (data) {
      this.$Message.info(`切换至${data.title}`, 1000)
      if (data.key == 'module1'){
        this.showX = true
        this.showY = false
      }
      if (data.key == 'module2'){
        this.showX = false
        this.showY = true
      }
    },
    signin() {
      this.isLoading = true;
      let validResult = this.$refs.form.valid();
      if (validResult.result) {
        this.$Message('验证码成功');
        this.$axios.post("http://localhost:8080/cookbooktest/queryByphone",this.$qs.stringify({"phone":this.modelY.phone})).then(res=>{
          console.log(res)
        })
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.isLoading = false;
      }
    },
    signup() {
      this.isLoading = true;
      let validResult = this.$refs.formup.valid();
      if (validResult.result) {
        this.$axios.post("http://localhost:8080/cookbooktest/quryByPwd",{'phone':this.modelX.phone,'pwd':this.modelX.pwd}).then(res=>{
          this.$Message('密码验证成功');
          this.$store.commit("users",res);
          this.$router.push({name:'main'})
        })
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      } else {
        this.isLoading = false;
      }
    },
    reset() {
      this.$refs.form.resetValid();
    }
  }
}
</script>
<style>

</style>

