<template>
  <div>
    <div style=" width: 80%;margin-left: 10%">
      <h1 style="font-size: 60px;background-color: gainsboro">
          <input v-model="input" placeholder="搜厨友" style="height: 50px;width:250px;font-size: 30px"></input>
        <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px" @click="checked">搜索</el-button>
      </h1>
      <div style="height: 500px">
        <!--{{users}}-->
        <div style="height: 140px;margin-bottom:20px;position: relative;width: 33%;float: left" v-for="v,i in users.slice(0,30)">
          <el-avatar style="position: absolute;left: 20px;top: 20px" :size="100" fit="fill" :src="'static/jpg/'+v.pic"></el-avatar>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: -30px;left: 150px;font-size: 24px"><a style="color: black">{{v.uname.substr(0,4)}}..</a>
                          <el-image src="static/jpg/xingji.png" v-if="v.users.state===1" style="height: 30px"></el-image>
                        </span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 0px;left: 150px;font-size: 18px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 30px;left: 150px;font-size: 18px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
          <el-button  style="background-color: crimson;color: white;width: 100px;height: 50px;font-size: 22px;position: absolute;top: 35px;left: 245px"  v-show="v.uid!==user.uid" @click="guanzhu3(i)">
            <span v-if="v.state===0">关注</span><span v-else>取关</span><br>
          </el-button>
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
        this.$axios.post('http://localhost:8080/cookbooktest/UController/queryuserinfo')
          .then(resp=>{
            this.users=resp.data;
            this.users.forEach(v=>{
              this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.user.uid,followid:v.uid}))
                .then(re=>{
                  if(re.data>0){
                    v.state=1;
                  }else{
                    v.state=0;
                  }
                })
            })
          })
          .catch(err=>{
            this.$message.error("请稍后尝试");
          })      },
      methods:{
        checked(){
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryBylikeUname',this.$qs.stringify({'uname':this.input}))
            .then(resp=>{
              this.users=resp.data;
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        guanzhu3(i){
          if (undefined!==this.user.uname) {
            if(this.users[i].state==1){
              this.$axios.post("http://localhost:8080/cookbooktest/Isfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                this.users[i].state=0;
              })
            }else {
              this.$axios.post("http://localhost:8080/cookbooktest/saveIsfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                this.users[i].state=1;
              })
            }
            let temp=this.users[i];
            this.$set(this.users,i,temp)
          }else {
            this.$confirm('请登录账号,是否登陆?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push({name:'Login2'})
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              });
            });
          }
        },
      }
    }
</script>

<style scoped>

</style>
