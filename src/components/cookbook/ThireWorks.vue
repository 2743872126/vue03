<template>
    <div>
      <div class="workss" v-for="(v,k) in works.slice(0,9)">
        <el-image lazy style="width: 100%; height: 300px;margin: 0 0 -30px 0" :src="'static/jpg/'+v.pic" fit="cover"></el-image>
        <div style="margin-top: -100px;margin-bottom: -100px"><p style="font-size: 22px;" >{{v.winfo.substring(0,20)}}..</p></div>
        <div style="font-size: 18px;margin:-55px 0 -55px -30px ;">
          {{v.makeTime.substring(0,10)}}拍摄
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span><el-icon class="el-icon-chat-dot-round"></el-icon>{{works_messages===null?0:works_messages.length}}</span>
          <span><el-icon class="el-icon-star-off"></el-icon>{{startUsers===null?0:startUsers.length}}</span>
        </div>
      </div>

    </div>
</template>

<script>
  export default {
    name: 'ThireWorks',
    data(){
      return {
        works:[],
        works_messages:[],
        startUsers:[],
      }
    },
    created:function(){
      if(0!=this.$route.params.works.length){
        this.works=this.$route.params.works;
        this.works.forEach(v=>{
          this.$axios.post("http://localhost:8080/cookbooktest/Works_messageController/querybywid",this.$qs.stringify({'wid':v.wid}))
          .then(res=>{
            console.log(res.data)
            this.works_messages=res.data;
          })
          this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryStateBywid",this.$qs.stringify({'wid':v.wid}))
            .then(res=>{
              this.startUsers=res.data;
            })
        })
      }
    }
  }
</script>

<style scoped>
  .workss{
    margin-top: 20px;
    width: 33%;
    border: 1px white solid;
    float: left;
  }
</style>
