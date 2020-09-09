<template>
  <div>
    <el-container>
      <el-aside style="width: 65%">
        <h1 style="text-align: left;line-height: 50px;font-size: 30px;margin-top: 20px" v-if="menus.length>0">{{this.$route.params.state}}</h1>
        <p style="font-size: 20px" v-else>全能吃货没有该菜谱!</p>
        <div style="height: 900px" v-if="menus.length!==0">
          <div style="height: 150px;text-align: left;margin-bottom: 10px" v-for="v in menus">
            <el-image :src="'static/jpg/'+v.pic" style="width: 30%;height: 150px;float: left;margin-right: 20px"></el-image>
            <h1 style="font-size:20px;line-height: 30px">{{v.mname}}
              <span v-if="v.menuSteps[0].msPic!==null">
                        <el-image src="static/jpg/step.png" style="height: 20px"></el-image>
                      </span>
            </h1>
            <p style="font-size: 14px;color: indianred;font-weight: bold ;line-height: 20px"><span v-for="m in v.materialsDetails">{{m.material}}{{m.num}},</span></p>
            <p style="font-size: 14px;color: dimgray;line-height: 20px">{{v.works.length}}人做过</p>
            <p style="font-size: 14px;color: dimgray;line-height: 20px">{{v.users.uname}}
              <span v-if="v.users.state===1">
                        <el-image src="static/jpg/xingji.png" style="height: 20px"></el-image>
                      </span>
            </p>
          </div>

        </div>
      </el-aside>
      <el-main>
        <h1 style="text-align: left;line-height: 40px;font-size: 20px;color: darkseagreen;margin-top: 40px">全部菜谱
          <router-link :to="{name:'ChilerenAllMenus'}" style="font-size: 14px;margin-left: 150px;color: crimson">更多</router-link>
        </h1>
        <div v-if="leftmenu.length!==0">
          <div v-for="y in leftmenu.slice(0,9)" style="width: 31%;float: left;margin-right: 5px ">
            <el-image :src="'static/jpg/'+y.pic" style="height: 90px;width: 100%" @click="menudetail(y)"></el-image>
            <p style="line-height: 20px;margin-top: -60px;"><a style="color: black">{{y.mname.substr(0,5)}}..</a></p>
          </div>
        </div>
        <p v-else>暂无相关菜谱</p>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "CheckMenus",
      data() {
        return{
          menus: [],
          leftmenu:[]
        }
      },
      watch:{
        '$route':{
          handler(newval,oldval){
            console.info(newval,oldval);
            this.menus=newval.params.menus;
          },
          deep:true,
          immediate:true
        }
      },
      created:function () {
        console.info('this.$route.params.menus')
          console.info(this.$route.params.menus)
        this.menus=this.$route.params.menus;
        this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryAllMenu')
          .then(resp=>{
            this.leftmenu=resp.data;
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      },
    }
</script>

<style scoped>

</style>
