<template>
    <div>
      <el-container>
        <el-aside style="width: 65%;height: 3000px">
          <h1 style="text-align: left;line-height: 50px;font-size: 30px;margin-top: 20px">{{mtname}}</h1>
          <p style="text-align: left;line-height: 18px;font-size: 18px">
            <span style="color: dimgray">最近流行</span>&nbsp;|
            <span><a @click="tochildrenMenu2" style="color: crimson">最受欢迎</a></span>
          </p>
          <div style="height: 900px" v-if="menus.length!==0">
            <div style="height: 150px;text-align: left;margin-bottom: 10px" v-for="v in menus.slice((currentPage-1)*PageSize,currentPage*PageSize)">
              <el-image :src="'static/jpg/'+v.pic" style="width: 30%;height: 150px;float: left;margin-right: 20px" @click="menudetail(v)"></el-image>
              <h1 style="font-size:20px;line-height: 30px"><a style="color: black" @click="menudetail(v)">{{v.mname}}</a>
                <span v-if="v.menuSteps[0].mspic!==null">
                    <el-image src="static/jpg/step.png" style="height: 20px"></el-image>
                  </span>
              </h1>
              <p style="font-size: 14px;color: indianred;font-weight: bold ;line-height: 20px"><span v-for="m in v.materialsDetails">{{m.material}}{{m.num}},</span></p>
              <p style="font-size: 14px;color: dimgray;line-height: 20px">(七天内{{v.works.length}}人做过)</p>
              <p style="font-size: 14px;color: dimgray;line-height: 20px">{{v.users.uname}}
                <span v-if="v.users.state===1">
                    <el-image src="static/jpg/xingji.png" style="height: 20px"></el-image>
                  </span>
              </p>
            </div>
            <el-pagination v-if="totalCount>PageSize" style="height: 35px;width: 90px" background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="PageSize"
                           layout="prev, pager, next"
                           :total="totalCount">
            </el-pagination>
          </div>
          <p v-else>该类型暂无菜谱</p>
        </el-aside>
        <el-main>
          <h1 style="text-align: left;line-height: 40px;font-size: 20px;color: darkseagreen;margin-top: 40px">相关菜谱</h1>
          <div v-if="youcemenu.length!==0">
            <div v-for="y in youcemenu.slice(0,9)" style="width: 31%;float: left;margin-right: 5px ">
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
        name: "ChildrenMenu",
      data(){
        return{
          menus:[],
          mtid:'',
          mtname:'',
          youcemenu:[],
          currentPage:1,
          // 总条数，根据接口获取数据长度(注意：这里不能为空)
          totalCount:1,
          // 默认每页显示的条数（可修改）
          PageSize:15,
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
            this.getinfo(newval.query.mtid);
            this.getmaininfo(newval.query.mtid)
          },
          deep:true,
          immediate:true
        }
      },
      methods: {
        // 每页显示的条数
        handleSizeChange(val) {
          // 改变每页显示的条数
          this.PageSize=val
          // 注意：在改变每页显示的条数时，要将页码显示到第一页
          this.currentPage=1
        },
        // 显示第几页
        handleCurrentChange(val) {
          // 改变默认的页数
          this.currentPage=val
        },
        menudetail(item){

          this.$router.replace({name:'MenusDetail',params:{menudetail:item}})

        },
          getinfo:function (mtid) {
            this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymtidorderliuxing',this.$qs.stringify({'mtid':mtid}))
              .then(resp=>{
                this.menus=resp.data;
                this.totalCount=resp.data.length;
              })
              .catch(err=>{
                this.$message.error("错误");
              });
          },
        //右侧显示
        getmaininfo:function (mtid) {
          this.$axios.post('http://localhost:8080/cookbooktest/MenuController/querybymtid',this.$qs.stringify({'mtid':mtid}))
            .then(resp=>{
              this.youcemenu=resp.data;
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
