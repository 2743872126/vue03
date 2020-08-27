<template>
  <div>
    <p class="ps"><span class="span">购买的</span>         |        <span @click="mys2">发布的</span></p>

    <p class="ps" v-if="isshow">你还没有购买视频，<router-link :to="{name:''}">去看看<icon class="el-icon-caret-right"></icon></router-link></p>
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
      if( null==this.$store.state.user.userInfo.paystudio || 0==this.$store.state.user.userInfo.paystudio.length){
        this.isshow=true;
      }
      this.userinfo=this.$store.state.user.userInfo.paystudio;

    },
    methods:{
      mys2(){
        if(this.$store.state.user.userInfo.state==1){
          this.$router.push({name:'MyStudio2'})
        }else{
          this.$alert('你还未成为“studio厨”', '系统消息', {
            confirmButtonText: '确定'
          })
        }
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
