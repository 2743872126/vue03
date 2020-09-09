<template>
    <div>
      <div style="width: 72%;margin-left: 12%">
        <el-container>
          <el-aside style="width: 65%">
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
            <div v-if="LeavlMessage.length!==0">
              <div v-for="l in LeavlMessage">
                <p style="text-align:left;line-height: 20px;position: relative">
                  <el-avatar :size="40" fit="fill" :src="'static/jpg/'+l.leavUsers.pic"></el-avatar>
                  <a style="color: crimson;position: absolute;top: 10px;left: 50px">{{l.leavUsers.uname}}</a>
                  <span style="position: absolute;top: 10px;left: 90px;color: dimgray">{{l.leaveTime.substr(0,10)}}</span>
                  <span v-if="user.uid===l.uid" style="position: absolute;top: 10px;left: 170px;color: dimgray">
                          |<a @click="dellm(l.lid)"> 删除</a>
                        </span>
                </p>
                <p style="text-align:left;line-height: 20px;margin-top: -15px;margin-left: 50px">
                  {{l.info}}
                </p>
                <p v-if="user.uid===menu.uid" style="text-align:left;line-height: 40px;margin-left: 50px">
                  <el-form :inline="true" :model="l" class="demo-form-inline">
                    <el-form-item style="width: 500px">
                      <el-input v-model="l.reply" placeholder="请输入回复" style="width: 500px"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="" style="background-color: crimson" @click="huifu(l)">回复</el-button>
                    </el-form-item>
                  </el-form>
                </p>
              </div>
            </div>
            <p v-else>暂无留言,点击写留言进行留言</p>
          </el-aside>
          <el-main>
            <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 300px;margin-top: 50px"></el-image>
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
        },
        huifu(l){
          if (l.reply!=null){
            this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/reply',l)
              .then(resp=>{
                this.$router.push({name:'LeavMessage',params:{mid:this.menu.mid}})
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          } else {
            this.$message('请输入内容再回复');
          }
        },
        dellm(lid){
          this.$confirm('确定要删除吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/delBylid',this.$qs.stringify({'lid':lid}))
              .then(resp=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.$router.push({name:'LeavMessage2',params:{mid:this.menu.mid}})
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
      }
    }
</script>

<style scoped>

</style>
