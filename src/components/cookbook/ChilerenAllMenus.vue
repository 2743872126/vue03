<template>
  <div>
    <h1 style="text-align: left;line-height: 80px;font-size: 60px">全部</h1>
    <div style="height: 900px">
      <div style="border: 1px solid gainsboro;height: 235px;text-align: left;margin-bottom: 10px" v-for="v in menus">
        <el-image :src="'static/jpg/'+v.pic" style="width: 30%;height: 233px;float: left;margin-right: 20px" @click="menudetail(v)"></el-image>
        <h1 style="font-size: 35px;line-height: 50px"><a style="color: black" @click="menudetail(v)">{{v.mname}}</a>
          <span v-if="v.menuSteps[0].msPic!==null">
                    <el-image src="static/jpg/step.png" style="height: 30px"></el-image>
                  </span>
        </h1>
        <p style="font-size: 20px;color: indianred;font-weight: bold ;line-height: 30px"><span v-for="m in v.materialsDetails">{{m.material}}{{m.num}},</span></p>
        <p style="font-size: 20px;color: dimgray;line-height: 30px">{{v.works.length}}人做过</p>
        <p style="font-size: 20px;color: dimgray;line-height: 30px">{{v.users.uname}}
          <span v-if="v.users.state===1">
                    <el-image src="static/jpg/xingji.png" style="height: 30px"></el-image>
                  </span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
    export default {
      name: "ChilerenAllMenus",
      data(){
        return{
          menus:[],
        }
      },
      created:function () {
        this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryAllMenu')
          .then(resp=>{
            this.menus=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      },
      methods:{
        menudetail(item){
          console.info(item)
          this.$router.push({name:'MenusDetail',params:{menudetail:item}})
        }
      }
    }
</script>

<style scoped>

</style>
