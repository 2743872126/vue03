<template>
</template>

<script>
  export default {
    name: 'Housing_order',
    data(){
      return {
        fullscreenLoading: true,
        state:'',
      }
    },
    created(){
      console.log("进入")
      console.log("获取"+this.$route.query.state)
      console.log('1'==this.$route.query.state)
      console.log(this.$store.state.user.userInfo.uid);

      if('2'==this.$route.query.state){
        this.$axios.post("http://localhost:8080/cookbooktest/order/saveIncome",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          if(res.data>0){
            this.$alert('去创作区看看', '系统', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({name:'MyStudio2'})
              }
            });
          }
        })
      }else if('1'==this.$route.query.state){
        this.$axios.post("http://localhost:8080/cookbooktest/order/saveuserturnover",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,sid:this.$route.query.sid})).then(res=>{
          if(res.data>0){
            this.$alert('去往购买的视频', '系统', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({name:'MyStudio'})
              }
            });
          }
        })
      } else{
        this.$Message.error("请稍后尝试购买")
        this.$router.push({name:'firstpage'});
      }
    }
  }
</script>

<style scoped>

</style>
