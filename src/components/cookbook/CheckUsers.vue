<template>
  <div>
    <div style=" width: 80%;margin-left: 10%">
      <h1 style="font-size: 60px;background-color: gainsboro">
          <input v-model="input" placeholder="搜厨友" style="height: 50px;width:250px;font-size: 30px"></input>
        <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px" @click="checked">搜索</el-button>
      </h1>
      <div style="height: 500px">
        <!--{{users}}-->
        <div v-show="v.uid!==user.uid" style="height: 140px;margin-bottom:20px;position: relative;width: 33%;float: left" v-for="v,i in users.slice(0,30)">
          <a @click="toThirePerson(v.uid)"><el-avatar style="position: absolute;left: 20px;top: 20px" :size="100" fit="fill" :src="'static/jpg/'+v.pic"></el-avatar></a>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: -30px;left: 150px;font-size: 24px"><a style="color: black" @click="toThirePerson(v.uid)">{{v.uname.substr(0,4)}}..</a>
                          <el-image src="static/jpg/xingji.png" v-if="v.state===1" style="height: 30px"></el-image>
                        </span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 0px;left: 150px;font-size: 18px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
          <span style="text-align: left; height:90px;width:150px;position: absolute;top: 30px;left: 150px;font-size: 18px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
          <el-button  style="background-color: crimson;color: white;width: 100px;height: 50px;font-size: 22px;position: absolute;top: 35px;left: 265px"  v-show="v.uid!==user.uid" @click="guanzhu3(i)">
            <span v-if="v.state2==0">关注</span><span v-else>取关</span><br>
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
        if(!this.$route.params.users){
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryuserinfo')
            .then(resp=>{
              this.users=resp.data;
              this.users.forEach((v,i)=>{
                this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:v.uid}))
                  .then(re=>{
                    if(re.data>0){
                      v.state2=1;
                      this.$set(this.users,i,v)
                    }else{
                      v.state2=0;
                      this.$set(this.users,i,v)
                    }

                  })
              })
            })
            .catch(err=>{
              this.$message.error("请稍后尝试");
            })
        }else{
          this.users=this.$route.params.users;
        }
      },
      methods:{
        toThirePerson(uid){
          this.$router.push({name:'TheirPersonal',params:{uid:uid}})
        },
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
            if(this.users[i].state2==1){
              this.$axios.post("http://localhost:8080/cookbooktest/Isfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                this.users[i].state2=0;
                let temp=this.users[i];
                this.$set(this.users,i,temp)
              })
            }else {
              this.$axios.post("http://localhost:8080/cookbooktest/saveIsfollows",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid,followid:this.users[i].uid})).then(res=>{
                this.users[i].state2=1;
                let temp=this.users[i];
                this.$set(this.users,i,temp)
              })
            }

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
