<template>
    <div v-if="menuss.length!==0">
      <div class="menus" v-for="(v,k) in menuss">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"  @click="menudetail(v)"></el-image>
        <div style="margin-top: -120px">
          <h1 style="font-size: 18px;margin:30px 0 -100px 0 " >
            <a style="color: black" @click="menudetail(v)">{{v.mname.substring(0,10)}}..</a>
          </h1>
        </div>
        <div style="font-size: 14px;margin:-55px 0 -55px -30px ;">
          &nbsp;&nbsp;
          {{v.madeTime.substring(0,10)}}发布
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{works===null?0:works.length}}做过 |</span>
          <span>{{leavMessages===null?0:leavMessages.length}}留言</span>
        </div>
      </div>

    </div>
  <p v-else>该作者没有发布菜谱</p>
</template>

<script>
  export default {
    name: 'ThierMenus',
    data(){
      return {
        ismenus:true,
        menuss:[],
        works:[],
        leavMessages:[]
      }
    },
    created:function(){
      if(0!=this.$route.params.menus.length){
        this.menuss=this.$route.params.menus;
        this.menuss.forEach(v=>{
          this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryAllBymid",this.$qs.stringify({'mid':v.mid})).then(res=>{
            this.works.push(res.data);
          })
          this.$axios.post("http://localhost:8080/cookbooktest/LeavlMessageController/querymessageBymid",this.$qs.stringify({'mid':v.mid})).then(res=>{
            this.leavMessages.push(res.data);
          })
        })
      }

    },
    methods:{
      menudetail(item){

      }
    }
  }
</script>

<style scoped>
.menus{
  float: left;
  margin-top: 20px;
  margin-left: 20px;
  width: 30%;
}
</style>
