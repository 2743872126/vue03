<template>
    <div>
      <p style="font-size: 40px">个人中心</p>

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
        token:'',
      }
    },
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
    }
  }
</script>

<style scoped>

</style>
