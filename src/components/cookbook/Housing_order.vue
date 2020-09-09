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

      if('1'==this.$route.query.state){
        this.$axios.post("http://localhost:8080/cookbooktest/order/saveIncome",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          if(res.data>0){
            setTimeout(() => {
              alert("成了")
              // this.$router.push({name:'firstpage'})
            }, 3000);
          }
        })
      }else{
        this.$Message.error("请稍后尝试购买")
       // this.$router.push({name:'firstpage'});
      }
    }
  }
</script>

<style scoped>

</style>
