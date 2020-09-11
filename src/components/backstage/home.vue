<template>
  <div>
    <div class="line"></div>
    <el-menu
      :router="true"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item style="margin-left: 1000px"></el-menu-item>
      <template v-for="(l,k) in datal.childList">
      <el-submenu :index="'2-'+l.parentFid">
        <template slot="title">{{l.parentName}}</template>
        <template v-for="l2 in datal.menu[k].childList" >
            <el-menu-item :index="'3-'+l2.fid" :route="{path:l2.uRL}">
              {{l2.fname}}
            </el-menu-item>
        </template>
      </el-submenu>
        </template>
        <el-menu-item index="9" :route="{name:'Myself'}">个人中心</el-menu-item>
      <el-menu-item index="10" disabled style="color: black" class="el-icon-user">欢迎: {{this.user[0].cname}}</el-menu-item>
    </el-menu>
    <el-main>
      <!-- 路由视图 -->
      <router-view></router-view>
    </el-main>

  </div>
</template>
<script>

  export default {
    name: 'home',
    data() {
      return {
        RouterModel:[],
        user:[JSON.parse(this.$session.get("users"))],
        activeIndex: '1',
        activeIndex2: '1',
        datal: {
            "childList":[{
              "parentFid":10,
              "parentName":"作品管理",
              "parentUrl":"/works",
              "parentMenu":0

            },{
                "parentFid":"",
                "parentName":"",
                "parentUrl":"",
                "parentMenu":""
            },{
                "parentFid":"",
                "parentName":"",
                "parentUrl":"",
                "parentMenu":""
            },{
                "parentFid":"",
                "parentName":"",
                "parentUrl":"",
                "parentMenu":""
            }],
            "menu":[{
              "childList":[
                {
                "fid":8,
                "flevel":10,
                "fname":"留言管理",
                "uRL":"/Msg"
              },
                {
                  "fid":8,
                  "flevel":10,
                  "fname":"留言管理",
                  "uRL":"/Msg"
              },
                {
                  "fid":8,
                  "flevel":10,
                  "fname":"留言管理",
                  "uRL":"/Msg"
              },{
                  "fid":8,
                  "flevel":10,
                  "fname":"留言管理",
                  "uRL":"/Msg"
                }]
            }]
          }
      };
    },
    created(){
      let params = this.$qs.stringify({"rid":this.user[0].rid,"cid":this.user[0].cid})
      this.$axios.post('http://localhost:8080/cookbooktest/LoginMenu/getLoginMenu',params).then(resp=>{
        this.datal = resp.data
      })
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      NewHref() {
        this.$router.push('Myself')
      }
    }
  }
</script>

<style scoped>

</style>
