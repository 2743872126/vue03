<template>
    <div>
      <div style=" width: 75%;margin-left: 12%">
        <h1 style="text-align: left;line-height: 120px;font-size: 40px">万能的吃货们</h1>
        <div style="height: 500px;width:70%;float: left">
          <!--{{users}}-->
          <div style="border: 1px solid gainsboro;height: 80px;margin-bottom:20px;position: relative;width: 44%;float: left;margin-left: 5px;margin-right: 5px" v-for="v,i in users.slice(0,30)">
            <a @click="toThirePerson(v.uid)"><el-avatar style="position: absolute;left: 0px;top: 10px" :size="60" fit="fill" :src="'static/jpg/'+v.pic" ></el-avatar></a>
            <span style="text-align: left; height:90px;width:150px;position: absolute;top: -60px;left: 80px;font-size: 16px">
                        <a style="color: black" @click="toThirePerson(v.uid)">{{v.uname.substr(0,4)}}..</a>
                        <el-image src="static/jpg/xingji.png" v-if="v.state===1" style="height: 20px"></el-image>
                      </span>
            <span style="text-align: left; height:90px;width:150px;position: absolute;top: -35px;left: 80px;font-size: 14px;color: darkgrey">{{v.users.length}}&nbsp;&nbsp;关注</span>
            <span style="text-align: left; height:90px;width:150px;position: absolute;top: -10px;left: 80px;font-size: 14px;color: darkgrey">{{v.munus.length}}&nbsp;&nbsp;菜谱&nbsp;&nbsp;{{v.works.length}}&nbsp;&nbsp;作品</span>
            <el-button  style="background-color: crimson;color: white;width: 100px;height: 45px;font-size: 20px;position: absolute;top: 18px;left: 230px"  v-show="v.uid!==user.uid" @click="guanzhu2(i)">
              <span v-if="v.state2==0">关注</span><span v-else>取关</span><br>
            </el-button>
          </div>
        </div>
        <div style="height: 500px;width:30%;float: left">
            <h1 style="line-height: 50px;margin-top: 100px">
              <input v-model="input" placeholder="搜厨友" style="height: 50px;width:250px;font-size: 30px"></input>
            </h1>
            <p style="line-height: 50px">
              <el-button style="background-color: crimson;color: white;width: 150px;height: 60px;font-size: 22px;margin-left: -100px" @click="checked">搜索</el-button>
            </p>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "UsersShow",
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
            this.users.forEach((v,i)=>{
              this.$axios.post("http://localhost:8080/cookbooktest/queryIsFollow",this.$qs.stringify({uid:this.user.uid,followid:v.uid}))
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

      },
      methods:{
        toThirePerson(uid){
          this.$router.push({name:'TheirPersonal',params:{uid:uid}})
        },
        checked(){
          this.$axios.post('http://localhost:8080/cookbooktest/UController/queryBylikeUname',this.$qs.stringify({'uname':this.input}))
            .then(resp=>{
              this.$router.push({name:'CheckUsers',params:{users:resp.data}})
            })
            .catch(err=>{
              this.$message.error("错误");
            });
        },
        guanzhu2(i){
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
