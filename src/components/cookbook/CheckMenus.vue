<template>
  <div>
    <h1 style="text-align: left;line-height: 80px;font-size: 60px" v-if="menus.length>0">{{this.$route.params.state}}</h1>
    <h1 style="text-align: left;line-height: 80px;font-size: 60px" v-else>全能吃货没有该菜谱</h1>
    <div style="height: 900px">
      <div style="border: 1px solid gainsboro;height: 235px;text-align: left;margin-bottom: 10px" v-for="v in menus">
        <el-image :src="'static/jpg/'+v.pic" style="width: 30%;height: 233px;float: left;margin-right: 20px"></el-image>
        <h1 style="font-size: 35px;line-height: 50px">{{v.mname}}
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
        name: "CheckMenus",
      data() {
        return{
          menus: []
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
      },
    }
</script>

<style scoped>

</style>
