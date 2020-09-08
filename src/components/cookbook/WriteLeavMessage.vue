<template>
  <div>
    <div style="border:1px solid black;width: 80%;margin-left: 10%">
      <el-container>
        <el-aside style="border:1px solid black;width: 70%">
          <h1 style="text-align: left;line-height: 60px;font-size: 40px">
            写留言
          </h1>
          <el-form :model="LeavMessage" style="margin-top: 100px;width: 90%;margin-left: 5%">
            <el-form-item >
              <el-input type="textarea" :rows="6"
                        placeholder="请输入内容" v-model="LeavMessage.info"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="fabu">发布</el-button>
            </el-form-item>
          </el-form>
        </el-aside>
        <el-main style="border:1px solid black;">
          <el-image :src="'static/jpg/'+menu.pic" style="width: 100%;height: 300px"></el-image>
          <p style="line-height: 60px;font-size: 18px;margin-top: -70px">
            <a style="color: crimson" @click="menudetail()">{{menu.mname}}</a>
          </p>
          <p style="line-height: 20px;position: relative" v-if="menu.users!==null">
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

        }
      }
    }
</script>

<style scoped>

</style>
