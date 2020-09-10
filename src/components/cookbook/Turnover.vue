<template>
  <div>
    <p style="margin-left:10px;text-align: left;line-height: 30px"><span class="pppp" @click="changecolor2" :style=ZhiColor>收入</span><span style="font-size: 26px">|</span><span class="pppp" @click="changecolor" :style=ShouColor>支出</span>
    </p>
    <el-table v-show="isshow" :data="tableData.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%;">
      <el-table-column prop="utid" style="width: 20%;" label="账单号"></el-table-column>
      <el-table-column prop="uid" style="width: 20%;" label="购买人"></el-table-column>
      <el-table-column prop="wid" style="width: 20%;" label="课程名"></el-table-column>
      <el-table-column prop="income" style="width: 20%;" label="收入"></el-table-column>
      <el-table-column prop="madeTime" style="width: 20%;" label="卖出时间"></el-table-column>
    </el-table>
    <el-table v-show="!isshow" :data="dataTable.slice((currentPage-1)*PageSize,currentPage*PageSize)" style="width: 100%;">
      <el-table-column prop="utid" style="width: 20%;" label="账单号"></el-table-column>
      <el-table-column prop="wid" style="width: 20%;" label="课程名"></el-table-column>
      <el-table-column prop="pay" style="width: 20%;" label="支出"></el-table-column>
      <el-table-column prop="madeTime" style="width: 20%;" label="购买时间"></el-table-column>
    </el-table>
    <el-pagination style="margin-top: 100px" @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[10, 50, 200, 1000]" :page-size="10"
      layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Turnover',
    data(){
      return {
        ShouColor:'color: crimson',
        ZhiColor:' color: black;font-size: 26px;',
        tableData:[],
        dataTable:[],
        isshow:true,
        currentPage:1,
        // 总条数，根据接口获取数据长度(注意：这里不能为空)
        totalCount:0,
        PageSize:3,
      }
    },
    created(){
      this.$axios.post("http://localhost:8080/cookbooktest/order/queryMypincome",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        if(0!=res.data.length){
          this.tableData=res.data;
          this.totalCount=res.data.length;
          this.tableData.forEach(v=>{
            v.madeTime=v.madeTime.substring(0,10);
            this.$axios.post("http://localhost:8080/cookbooktest/queryUserById",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
              if(0!=res.data.length){
                v.uid=res.data.uname;
              }
            });
            this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryByid",this.$qs.stringify({sid:v.wid})).then(res=>{
              if(0!=res.data.length){
                v.wid=res.data.sname;
              }
            });
          })
        }
      })
      this.$axios.post("http://localhost:8080/cookbooktest/order/querymypay",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
        if(0!=res.data.length){
          this.dataTable=res.data;
          this.dataTable.forEach(v=>{
            v.madeTime=v.madeTime.substring(0,10);
            this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryByid",this.$qs.stringify({sid:v.wid})).then(res=>{
              if(0!=res.data.length){
                v.wid=res.data.sname;
              }
            });
          })
        }
      })
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

      changecolor(){
        this.isshow=false;
        this.$axios.post("http://localhost:8080/cookbooktest/order/querymypay",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          if(0!=res.data.length){
            this.dataTable=res.data;
            this.totalCount=res.data.length;
            this.dataTable.forEach(v=>{
              v.madeTime=v.madeTime.substring(0,10);
              this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryByid",this.$qs.stringify({sid:v.wid})).then(res=>{
                if(0!=res.data.length){
                  v.wid=res.data.sname;
                }
              });
            })
          }
        })
        if(this.ShouColor=" color: crimson") {
          this.ShouColor=' color: black;font-size: 26px;';
          this.ZhiColor=' color: crimson';
        }else{
          this.ShouColor=' color: crimson';
          this.ZhiColor=' color: black;font-size: 26px;';
        }
      },
      changecolor2(){
        this.isshow=true;
        this.$axios.post("http://localhost:8080/cookbooktest/order/queryMypincome",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
          if(0!=res.data.length){
            this.tableData=res.data;
            this.totalCount=res.data.length;
            this.tableData.forEach(v=>{
              v.madeTime=v.madeTime.substring(0,10);
              this.$axios.post("http://localhost:8080/cookbooktest/queryUserById",this.$qs.stringify({uid:this.$store.state.user.userInfo.uid})).then(res=>{
                if(0!=res.data.length){
                  v.uid=res.data.uname;
                }
              });
              this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryByid",this.$qs.stringify({sid:v.wid})).then(res=>{
                if(0!=res.data.length){
                  v.wid=res.data.sname;
                }
              });
            })
          }
        })
        if(this.ZhiColor=" color: crimson"){
          this.ShouColor=' color: crimson';
          this.ZhiColor=' color: black;font-size: 26px;';
        }else{
          this.ShouColor=' color: black;font-size: 26px;';
          this.ZhiColor=' color: crimson';
        }
     }
    }
  }
</script>

<style scoped>
.pppp{
  font-size: 22px;
}
</style>
