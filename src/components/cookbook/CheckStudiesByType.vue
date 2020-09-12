<template>
  <el-container style="height: 2000px">
    <el-aside style="width: 70%">
      <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px;clear: both">{{this.$route.query.stname}}</p>
      <div v-if="Studios.length!==0">
        <div style="width: 200px;height: 300px;float: left;margin-right: 5px;margin-bottom:20px" v-for="v in Studios.slice((currentPage-1)*PageSize,currentPage*PageSize)">
          <el-card style="width: 200px;height: 300px;margin-right: 5px;margin-left: 5px;margin-bottom:20px" :body-style="{ padding: '0px' }">
            <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 200px" @click="StudioDetail(v.sid)"></el-image>
            <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray">{{v.username}}</p>
            <p style="font-size: 14px;line-height: 14px" >{{v.sname.substr(0,8)}}..</p>
            <p style="font-size: 13px;line-height: 14px;text-align: left;color: crimson">
              {{v.paycount}}人购买过
              <span style="margin-left: 60px">{{v.upTime.substr(0,10)}}</span>
            </p>
          </el-card>
        </div>
      </div>
      <p v-else>该类型暂无课程</p>
      <el-pagination v-if="totalCount>PageSize" style="height: 35px;width: 90px;clear: both" background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="PageSize"
                     layout="prev, pager, next"
                     :total="totalCount">
      </el-pagination>
    </el-aside>
    <el-main >
      <p style="font-size: 14px;color: darkseagreen;text-align: left;line-height: 14px"><a style="color: crimson" @click="$router.push({name:'MyStudio'})">查看我的课程>></a></p>
      <p style="font-size: 20px;color: darkseagreen;text-align: left;line-height: 30px;clear: both">相关课程</p>
      <div v-if="Studios.length!==0">
      <div style="width: 110px;height: 150px;float: left;margin-right: 5px" v-for="v in Studios.slice(0,8)">
        <el-card style="margin-top: 20px" :body-style="{ padding: '0px' }">
          <el-image :src="'static/video/'+v.stupic" style="width: 100%;height: 100px" @click="StudioDetail(v.sid)"></el-image>
          <p style="font-size: 13px;line-height: 14px;margin-top: -60px;color: gray">{{v.sname.substr(0,5)}}</p>
        </el-card>
      </div>
      </div>
      <p v-else>该类型暂无课程</p>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: "CheckStudiesByType",
      data() {
        return {
          Studios:[],
          currentPage:1,
          // 总条数，根据接口获取数据长度(注意：这里不能为空)
          totalCount:1,
          // 默认每页显示的条数（可修改）
          PageSize:15,
        }
      },
      watch:{
        '$route':{
          handler(newval,oldval){
            this.getstudio(newval.query.stid)
          },
          deep:true,
          immediate:true
        }
      },
      methods:{
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
          getstudio(stid) {
            this.$axios.post('http://localhost:8080/cookbooktest/StudioContorller/queryByStid', this.$qs.stringify({stid:stid}))
              .then(resp => {
                this.Studios = resp.data;
                this.totalCount=resp.data.length

                this.Studios.forEach(value => {
                  this.$axios.post('http://localhost:8080/cookbooktest/UController/querybyid', this.$qs.stringify({uid: value.uid}))
                    .then(resp => {
                      this.Studios = []
                      value.username = resp.data.uname;
                      this.Studios.push(value)
                    })
                    .catch(err => {
                      this.$message.error("错误");
                    });
                  this.$axios.post('http://localhost:8080/cookbooktest/UserTurnoverController/querycountBysid', this.$qs.stringify({sid: value.sid}))
                    .then(resp => {
                      this.Studios = []
                      value.paycount = resp.data;
                      this.Studios.push(value)
                    })
                    .catch(err => {
                      this.$message.error("错误");
                    });

                })
              })
              .catch(err => {
                this.$message.error("错误");
              });
          },
        StudioDetail(sid){
          this.$router.push({name:'StudioBook',params:{'sid':sid}})
        }
      }
    }
</script>

<style scoped>

</style>
