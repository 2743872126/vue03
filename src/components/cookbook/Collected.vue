<template>
    <div>
      <p class="ps"><span class="span">菜谱</span>         |        <span @click="toc2">课程</span></p>
      <div >
      <div class="menus" v-for="(v,k) in userinfo">
          <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
        <div style="margin-top: -120px"><h1 style="font-size: 18px;margin:30px 0 -100px 0 ">{{v.mname}}</h1></div>
        <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
          {{v.madeTime.substring(0,10)}}发布&nbsp;
        </div>
      </div>
      </div>
      <p class="ps" v-show="isshow">你还没有收藏菜谱，<router-link :to="{name:'firstpage'}">去看看<icon class="el-icon-caret-right"></icon></router-link></p>
    </div>
</template>

<script>

  export default {
    name: 'Collected',
    data(){
      return {
        isshow:false,
        userinfo:[],
      }
    },
    created:function(){
      this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryMyWorksByid",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid}))
        .then(res=>{
          this.userinfo=res.data;
          if(0==this.userinfo.length){

            this.isshow=true;
          }
        })

      console.log(this.userinfo)


    },
    methods:{
      toc2(){
        this.$router.push({name:'Collected2'})
      }
    }

  }
</script>

<style scoped>
  .ps{;
    font-size: 20px;
    line-height: 30px;
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
