<template>
  <div>
    <div style="width: 80%;margin-left: 10%">
      <el-container>
        <el-aside style="width: 70%">
          <h1 style="text-align: left;line-height: 60px;font-size: 30px;margin-left: 20px">
            写留言
          </h1>
          <el-form :model="LeavMessage" style="margin-top: 50px;width: 80%;margin-left: 5%">
            <el-form-item >
              <el-input type="textarea" :rows="6"
                        placeholder="写下你的留言" v-model="LeavMessage.info"></el-input>
            </el-form-item>
            <el-form-item style="text-align: left">
              <el-button type="primary" @click="fabu" style="background-color: crimson">发布</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main>
          <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 250px;margin-top: 50px"></el-image>
          <p style="line-height: 60px;font-size: 18px;margin-top: -70px">
            <a style="color: crimson" @click="menudetail()">{{menu.mname}}</a>
          </p>
          <p style="line-height: 20px;position: relative" v-if="menu.users!==null">
            <el-image :src="'static/jpg/'+menu.users.pic" style="width: 60px;height: 60px;margin-right: 20px"></el-image>
            <span style="position: absolute;top: 20px">
                <a style="color: crimson">{{menu.users.uname}}</a>
              </span>
          </p>
          {{LeavMessage}}
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
    export default {
      name: "WriteLeavMessage",
      data() {
        return {
          menu:{},
          LeavMessage:{info:'',uid:this.$store.state.user.userInfo.uid,mid:this.$route.params.mid}
        }
      },
      created:function () {
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
        fabu(){
          if(this.$store.state.user.userLogin){
            if (this.LeavMessage.info!=''){
              this.$axios.post('http://localhost:8080/cookbooktest/LeavlMessageController/add',this.LeavMessage)
                .then(resp=>{
                  this.$router.push({name:'LeavMessage2',params:{mid:this.$route.params.mid}})
                })
                .catch(err=>{
                  this.$message.error("错误");
                });

            }else {
              this.$message('请输入内容再发布');
            }
          }else{
            this.$message.error('请登录再发布');
          }
        }
      }
    }
</script>

<style scoped>

</style>
