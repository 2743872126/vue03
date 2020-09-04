<template>
  <div>
    <div style="width: 80%;margin-left: 10%">
      <el-container>
        <el-header style="height: 100px">
          <img src="static/jpg/0f000cbIHKdVLOxTk3-o46.jpg" height="100%" width="100%"/>
        </el-header>
        <el-container>
          <el-aside style="width: 70%">
            <div style="margin-right: 40px">
              <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;margin-left: 20px;margin-top: 20px;margin-bottom: 20px">
                <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{name:'menus',params:{'stid':typename.stid,'stname':typename.stname}}">{{typename.stname}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{studioDet.sname}}</el-breadcrumb-item>
              </el-breadcrumb>
              <h1 style="line-height: 70px;text-align: left;font-size: 40px">{{studioDet.sname}}</h1>
              <el-image :src="'static/video/'+studioDet.stupic" style="width: 100%;height: 500px"></el-image>
              <p style="margin-top: -70px;line-height: 70px;color: dimgray;text-align: left">
                <span style="color: crimson;font-size: 22px;font-weight: bold">{{sales}}</span>销量
                <el-button style="background-color: crimson;color: white;width: 100px;margin-left: 70%;height: 48px">收藏</el-button>
              </p>
              <hr />
              <p style="line-height: 14px;text-align: left;position: relative">
                <el-avatar :size="80" fit="fill" :src="'static/jpg/'+userInfo.pic"></el-avatar>
                <span style="position: absolute;top: 30px;left: 100px;font-size: 22px">{{userInfo.uname}}</span>
              </p>
              <p style="text-align: left;line-height: 30px;font-size: 20px">
                {{studioDet.info}}
              </p>
              <h1 style="text-align: left;line-height: 50px;font-size: 30px;color: darkseagreen">选看</h1>
              <el-row :gutter="10" v-for="(v,i) in studioDet.studioDetails">
                <el-col :span="2"><div class="grid-content bg-purple">{{i+1}}</div></el-col>
                <el-col :span="18"><div class="grid-content bg-purple" :title="v.sinfo">{{v.sinfo}}</div></el-col>
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    <router-link v-if="studioDet.uid==$store.state.user.userInfo.uid" :to="{path:'/videoPlay',query:{surl:v.surl,'pic':studioDet.stupic}}" target="_blank">立即查看</router-link>
                    <router-link v-else-if="v.state==0"  :to="{path:'/videoPlay',query:{surl:v.surl,'pic':studioDet.stupic}}" target="_blank">免费观看</router-link>
                    <span v-else @click="Pay()">付费观看</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-aside>
          <el-main>
            <p style="text-align: left;color: dimgray;line-height: 30px">
              版权归作者所有，没有作者本人的书面许可任何人不得转载或使用整体或任何部分的内容。
            </p>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StudioBook',
    data(){
      return {
        studioDet:{},
        typename:{},
        sales:'',// 销量
        userInfo:{},
        isPay:false,
        payInfo:{
          outTradeNo:'',
          subject:'',
          totalAmount:1,
          body:''
        }
      }
    },
    created(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/querydetail",this.$qs.stringify({sid:this.$route.params.sid}))
        .then(res=>{
          this.studioDet=res.data;
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryTypeByid",this.$qs.stringify({stid:this.studioDet.stid}))
            .then(re=>{
              this.typename=re.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/querystudiosales",this.$qs.stringify({sid:this.$route.params.sid}))
            .then(rs=>{
              this.sales=rs.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/studioQueryuser",this.$qs.stringify({uid:this.studioDet.uid}))
            .then(rr=>{
              this.userInfo=rr.data;
            })
          this.$axios.post("http://localhost:8080/cookbooktest/queryPaysByid",this.$qs.stringify({uid:this.studioDet.uid,sid:this.$route.params.sid}))
            .then(ss=>{
              this.isPay=ss.data;
            })
        })
    },
    methods:{
      Pay(){
        this.$axios.post('url',this.payInfo).then(resp => {
          // 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
          const divForm = document.getElementsByTagName('div')
          if (divForm.length) {
            document.body.removeChild(divForm[0])
          }
          const div = document.createElement('div')
          div.innerHTML = resp.data // data就是接口返回的form 表单字符串
          document.body.appendChild(div)
          document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
          document.forms[0].submit()
        })
      }
    }
  }
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .bg-purple {
    background: #d3dce6;
    line-height: 35px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
