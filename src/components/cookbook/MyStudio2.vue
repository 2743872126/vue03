<template>
  <div>
    <p class="ps"><span  @click="mys">购买的</span>         |        <span class="span">发布的</span></p>

    <p class="ps" v-show="isshow">你还没有发布视频，<router-link :to="{name:''}">去看看<icon class="el-icon-caret-right"></icon></router-link></p>
  </div>
</template>

<script>
  export default {
    name: 'MyStudio',
    data(){
      return {
        isshow:false,
        userinfo:[],
      }
    },
    created:function(){
      if( null==this.$store.state.user.userInfo.mystudio || 0==this.$store.state.user.userInfo.mystudio.length){
        this.isshow=true;
      }
      this.userinfo=this.$store.state.user.userInfo.user_menus.menus;
    },
    methods:{
      mys(){
        this.$router.push({name:'MyStudio'})
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
  .menus {
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    width: 32%;
    border: 1px white solid;
  }
</style>
