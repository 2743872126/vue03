<template>
    <div>
      个人中心
      <el-link @click="gets">微博登录</el-link>
    </div>
</template>

<script>
  export default {
    name: 'Tools',
    methods:{
      gets(){
        this.$axios.post("http://127.0.0.1:8080/cookbooktest/Weibo/test")
      }

    }
  }
</script>

<style scoped>

</style>
