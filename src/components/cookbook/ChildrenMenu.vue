<template>
    <div>
      <h1 style="text-align: left;line-height: 40px;font-size: 40px;margin-top: 20px">{{mtname}}</h1>
      <p style="text-align: left;line-height: 18px;font-size: 18px">
        <span style="color: dimgray">最近流行</span>&nbsp;|
        <span><a @click="tochildrenMenu2" style="color: crimson">最受欢迎</a></span>
      </p>
      <div style="height: 900px">
        <div style="border: 1px solid gainsboro;height: 235px;text-align: left;margin-bottom: 10px" v-for="v in menus">
          <el-image :src="'static/jpg/'+v.pic" style="width: 30%;height: 233px;float: left;margin-right: 20px" @click="menudetail(v)"></el-image>
          <h1 style="font-size: 35px;line-height: 50px"><a style="color: black" @click="menudetail(v)">{{v.mname}}</a>
            <span v-if="v.menuSteps[0].msPic!==null">
                    <el-image src="static/jpg/step.png" style="height: 30px"></el-image>
                  </span>
          </h1>
          <p style="font-size: 20px;color: indianred;font-weight: bold ;line-height: 30px"><span v-for="m in v.materialsDetails">{{m.material}}{{m.num}},</span></p>
          <p style="font-size: 20px;color: dimgray;line-height: 30px">(七天内{{v.works.length}}人做过)</p>
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
        name: "ChildrenMenu",
      data(){
        return{
          menus:[],
          mtid:'',
          mtname:'',
        }
      },
      created:function () {
        this.mtid=this.$route.query.mtid;
        this.mtname=this.$route.query.mtname
      },
      watch:{
        '$route':{
          handler(newval,oldval){
            console.info(newval,oldval);
            this.mtid=newval.query.mtid;
            this.mtname=newval.query.mtname;
            this.getinfo(newval.query.mtid)
          },
          deep:true,
          immediate:true
        }
      },
      methods: {
        menudetail(item){

          this.$router.replace({name:'MenusDetail',params:{menudetail:item}})

        },
          getinfo:function (mtid) {
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymtidorderliuxing',this.$qs.stringify({'mtid':mtid}))
              .then(resp=>{
                this.menus=resp.data;
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          },
        tochildrenMenu2(){
          this.$router.push({name:'ChildrenMenu2',params:{mtid:this.mtid,mtname:this.mtname}})
        }
      },
    }
</script>

<style scoped>

</style>
