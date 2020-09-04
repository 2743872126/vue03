<template>
  <div>
    <div style="width: 80%;margin-left: 10%">
      <h1 style="text-align: left;line-height: 60px;font-size: 40px"><a style="color: crimson" @click="menudetail()">{{menu.mname}}</a>的全部作品</h1>
      <p style="text-align: left;line-height: 60px;font-size: 20px">
        <span ><a style="color: crimson" @click="toHot">按热门排序</a></span>&nbsp;|
        <span style="color: dimgray">按时间排序</span>
      </p>
      <div style="height: 900px">
        <div style="border: 1px solid gainsboro;height: 470px;margin-bottom: 10px;width: 28%;float: left;margin-right: 60px" v-for="v in works">
          <el-image :src="'static/jpg/'+v.pic" style="height: 250px"></el-image>
          <p style="font-size: 14px;line-height: 20px;text-align: left;margin-top: -50px"><a style="color: crimson" @click="menudetail()">{{menu.mname}}</a></p>
          <p style="font-size: 14px;line-height: 20px;text-align: left;height: 80px">{{v.winfo}}</p>
          <p style="font-size: 14px;line-height: 20px;text-align: left">
            {{v.makeTime.substr(0,10)}}
            <img src="static/jpg/QQ图片20200903101053.png" style="margin-left: 150px"/>
            <span style="color: dimgray">{{v.startUsers.length}}</span>
            <img src="static/jpg/QQ图片20200903105149.png" style="margin-left: 20px"/>
            <span style="color: dimgray">{{v.works_messages.length}}</span>
          </p>
          <p style="font-size: 14px;line-height: 20px;text-align: left">
            <el-avatar v-if="v.user.pic!==null" :size="20" fit="fill" :src="'static/jpg/'+v.user.pic"></el-avatar>
            <a style="color: crimson">{{v.user.uname}}</a>
          </p>
        </div>

      </div>
    </div>
    <!--{{works[0].users}}-->
  </div>
</template>

<script>
    export default {
        name: "MenuWorks2",
      data() {
        return {
          works:[],
          menu:{}
        }
      },
      created:function () {
        this.menu=this.$route.params.menu;
        this.$axios.post('http://localhost:8080/cookbooktest/WorksController/queryOrderBytime',this.$qs.stringify({'mid':this.menu.mid}))
          .then(resp=>{
            this.works=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });

      },
      methods: {
        menudetail() {
          this.$router.push({name: 'MenusDetail', params: {menudetail: this.menu}})
        },
        toHot(){
          this.$router.push({name: 'MenuWorks', params: {menu: this.menu}})
        }
      }
    }
</script>

<style scoped>

</style>
