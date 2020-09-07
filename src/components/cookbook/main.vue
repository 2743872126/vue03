<template>
    <div>
      <el-container>
        <el-header style="height: 100px">
          <div style=" width: 80%;margin-left: 10%;height: 98px;position: relative">
            <el-menu style="height: 98px" :router="true" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">
                <el-link :underline="false" href="#">
                  <img src="static/jpg/logo2.jpg" height="98px" width="270px" />
                </el-link>
              </el-menu-item>
              <el-menu-item  style="margin-right: 50px;line-height: 90px">
                <!--<el-input placeholder="搜索菜谱"  style="position: relative;top: 29px;"></el-input>-->
                <el-autocomplete
                  style="position: relative;top: 29px;"
                  class="inline-input"
                  v-model="state2"
                  :fetch-suggestions="querySearch"
                  placeholder="搜索菜谱"
                  :trigger-on-focus="false"
                ></el-autocomplete>

                <el-button @click="checke">搜菜谱</el-button>
              </el-menu-item>
              <el-menu-item :route="{name:'firstpage'}" style="line-height: 90px"  index="3">
                <el-link style="font-size: 22px">首页</el-link>
              </el-menu-item>
              <el-menu-item  index="4" style="line-height: 90px">
                <el-link style="font-size: 22px">课程</el-link>
              </el-menu-item>
              <el-menu-item  index="5" style="line-height: 90px">
                <el-link style="font-size: 22px">作品动态</el-link>
              </el-menu-item>
              <el-menu-item style="margin-top: 20px;" index="99" v-if="isuser" :route="{name:'Email'}">
                <el-link style="font-size: 22px">
                  <el-badge style="line-height: 10px;" v-model="isEmail==0?'':isEmail" class="item">
                    <icon style="font-size: 30px" class="el-icon-message"></icon>
                  </el-badge>
                </el-link>
              </el-menu-item>
              <el-menu-item  v-if="isuser" style="line-height: 90px">

                <el-link style="font-size: 22px">
                  <!--<el-avatar :size="100" fit="fill" :src="'static/jpg/'+user.pic"></el-avatar>-->
                  <el-menu  :router="true" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-submenu index="1" style="height: 50px">
                      <template style="border: 1px solid black;height: 50px" slot="title"><el-avatar :size="50" fit="fill" :src="'static/jpg/'+user.pic"></el-avatar></template>
                      <el-menu-item :route="{name:'Personal'}" index="1-1">我的厨房</el-menu-item>
                      <el-menu-item :route="{name:'Tools'}" index="1-2">账号设置</el-menu-item>
                      <el-menu-item index="1-3" :route="{name:'main'}" @click="signout">退出</el-menu-item>
                    </el-submenu>
                  </el-menu>
                </el-link>
              </el-menu-item>
              <el-menu-item v-else style="margin-left: 5%;line-height: 90px">
                <el-link style="font-size: 22px" href="http://localhost:8081/#/login2">登陆</el-link>/
                <el-link style="font-size: 22px" href="http://localhost:8081/#/register">注册</el-link>
              </el-menu-item>
            </el-menu>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
</template>

<script>

    export default {
        name: "main",
        data() {
          return{
            user:{uname:''},
            isuser:false,
            restaurants: [],
            state2: '',
            isEmail:'0',
          }
        },
      created:function () {
        this.$store.commit('USER_INFO_COMMIT')
        this.isEmail= localStorage.getItem("isEmail");
        'NaN'==this.isEmail?this.isEmail=0:this.isEmail
        this.user=this.$store.state.user.userInfo;
          if (undefined!==this.user.uname){
            this.isuser=true;
          } else {
            this.isuser=false;
          }
        this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryMyMenuMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          this.isEmail=Number(this.isEmail+res.data.length);
        })
        this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryMyStudioMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          this.isEmail=Number(this.isEmail+res.data.length);
        })
        this.$axios.post("http://localhost:8080/cookbooktest/WorksController/queryMyWorksMessage",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          this.isEmail=Number(this.isEmail+res.data.length);
        })
      },
      methods:{
          checke(){
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryBymname',this.$qs.stringify({'mname':this.state2}))
              .then(resp=>{
                this.$router.push({name:'menus',params:{menus:resp.data,state:this.state2}})
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          },
        querySearch(queryString, cb) {
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          console.info(restaurants.filter(this.createFilter(queryString)))
          cb(results);
        },
        createFilter(queryString) {
          return (restaurant) => {
            console.info('restaurant'+restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()))
            return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
          };
        },
        handleSelect(item) {
          console.log(item);
          console.log('item');
        },
        signout(){
          this.$store.commit("USER_SIGNOUT");
          this.$router.go(0);
        }
      },
      mounted() {
        this.$axios.post('http://localhost:8080/cookbooktest/MenuController/queryAllMenu')
          .then(resp=>{
            for (let item of resp.data) {
              this.restaurants.push({"value": item.mname})
            }
          })
          .catch(err=>{
            this.$message.error("错误");
          });
      }
    }
</script>

<style scoped>
  .el-header{
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    color: #333;
  }
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 785px;
  }
</style>
