<template>
    <div>
      <p class="ps"><span class="span">我关注的</span>         |        <span @click="()=>{this.$router.push({name:'FollowMe'})}">关注我的</span></p>
    </div>
</template>

<script>
  export default {
    name: 'Follows',
    data(){
      return {
        isshow:false,
      }
    }
  }
</script>

<style scoped>
  .ps{
    text-align: left;
    font-weight: 100;
    font-size: 40px;
  }
  .span{
    color: red;
  }
</style>
