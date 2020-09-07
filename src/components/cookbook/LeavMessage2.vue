<template>
    <div>
      <div style="border:1px solid black;width: 80%;margin-left: 10%">
        <el-container>
          <el-aside style="border:1px solid black;width: 70%">
            <h1 style="text-align: left;line-height: 60px;font-size: 40px">
              <a style="color: crimson" @click="menudetail()">{{menu.mname}}</a>的留言
              <a style="font-size: 20px;margin-left: 50%;color: crimson" @click="writeLm">写留言</a>
            </h1>
            <p style="text-align: left;line-height: 60px;font-size: 18px">
              <span>
                <a style="color: crimson" @click="toLm">作者回复</a>
              </span>&nbsp;|
              <span style="color: dimgray">作者未回复</span>
            </p>
            <div v-for="l in LeavlMessage">
              <p style="text-align:left;line-height: 20px;position: relative">
                <el-avatar :size="40" fit="fill" :src="'static/jpg/'+l.leavUsers.pic"></el-avatar>
                <a style="color: crimson;position: absolute;top: 10px;left: 50px">{{l.leavUsers.uname}}</a>
                <span style="position: absolute;top: 10px;left: 90px;color: dimgray">{{l.leaveTime.substr(0,10)}}</span>
                <span v-if="user.uid===l.uid" style="position: absolute;top: 10px;left: 170px;color: dimgray">
                        |<a > 删除</a>
                      </span>
              </p>
              <p style="text-align:left;line-height: 20px;margin-top: -15px;margin-left: 50px">
                {{l.info}}
              </p>
              <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px">
                作者回复&nbsp;
                <span style="color: dimgray">{{l.replytime.substr(0,10)}}</span>
                <span v-if="user.uid===menu.users.uid" style="position: absolute;top: 10px;left: 170px;color: dimgray">
                        |<a > 删除</a>
                      </span>
              </p>
              <p v-if="null!==l.reply" style="text-align:left;line-height: 40px;margin-top: -15px;margin-left: 50px;color: dimgray">
                {{l.reply}}
              </p>
            </div>
          </el-aside>
          <el-main style="border:1px solid black;">
            <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 300px"></el-image>
            <p style="line-height: 60px;font-size: 18px;margin-top: -70px">
              <a style="color: crimson" @click="menudetail()">{{menu.mname}}</a>
            </p>
            <p style="line-height: 20px;position: relative">
              <el-image :src="'static/jpg/'+menu.users.pic" style="width: 60px;height: 60px;margin-right: 20px"></el-image>
              <span style="position: absolute;top: 20px">
                <a style="color: crimson">{{menu.users.uname}}</a>
              </span>
            </p>
          </el-main>
        </el-container>
      </div>
    </div>
</template>

<script>
    export default {
        name: "LeavMessage",
      data() {
        return {
          LeavlMessage:[],
          menu:{pic:''},
          user:{},
        }
      },
      created:function () {
        this.user=this.$store.state.user.userInfo
        this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/querymessageNull',this.$qs.stringify({'mid':this.$route.params.mid}))
          .then(resp=>{
            this.LeavlMessage=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
        this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymid',this.$qs.stringify({'mid':this.$route.params.mid}))
          .then(resp=>{
            this.menu=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      },
      methods: {
        menudetail() {
          this.$router.push({name: 'MenusDetail', params: {menudetail: this.menu}})
        },
        toLm(){
          this.$router.push({name:'LeavMessage',params:{mid:this.menu.mid}})
        },
        writeLm(){
          this.$router.push({name:'WriteLeavMessage',params:{mid:this.menu.mid}})
        }
      }
    }
</script>

<style scoped>

</style>
