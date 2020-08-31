<template>
  <div>
    <div style=" width: 80%;margin-left: 10%">
      <h1 style="font-size: 60px;background-color: gainsboro">
          <input v-model="input" placeholder="搜厨友" style="height: 50px;width:250px;font-size: 30px"></input>
        <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px" @click="checked">搜索</el-button>
      </h1>
      <div style="height: 500px">
        <!--{{users}}-->
        <div style="height: 140px;margin-bottom:20px;position: relative;width: 33%;float: left" v-for="v in users.slice(0,30)">
          <el-avatar style="position: absolute;left: 20px;top: 20px" :size="100" fit="fill" :src="'static/jpg/'+v.pic"></el-avatar>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: -30px;left: 150px;font-size: 24px"><a style="color: black">{{v.uname.substr(0,4)}}..</a>
                          <el-image src="static/jpg/xingji.png" v-if="v.users.state===1" style="height: 30px"></el-image>
                        </span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 0px;left: 150px;font-size: 18px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 30px;left: 150px;font-size: 18px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
          <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px;position: absolute;top: 35px;left: 325px" v-if="v.uid!==user.uid">关注</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CheckUsers",
      data() {
        return {
          users:[],
          input:'',
          user:{uname:''},
        };
      },
      created:function () {
        this.user=this.$store.state.user.userInfo;
        this.users=this.$route.params.users;
      },
      methods:{
        checked(){
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryBylikeUname',this.$qs.stringify({'uname':this.input}))
            .then(resp=>{
              this.users=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        }
      }
    }
</script>

<style scoped>

</style>
