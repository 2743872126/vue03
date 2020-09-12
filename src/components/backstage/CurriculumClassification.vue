<template>
  <div>
    <el-table
      :data="studioTypes.slice((currentPage-1) * pagesize,currentPage * pagesize)"
      stripe
      style="width: 100%">
      <el-table-column
        prop="stid"
        label="课程编号"
        style="width: 20%">
      </el-table-column>
      <el-table-column
        prop="stname"
        label="课程名称"
        style="width: 20%">
      </el-table-column>
      <!--<el-table-column
        prop="state"
        label="状态"
        width="400px">
      </el-table-column>-->
      <el-table-column
        label="详情"
        style="width: 20%">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" content="详情">
           <el-button circle class="el-icon-more"  plain @click="moreInfo(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        style="width: 20%"
        label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" content="添加课程">
          <el-button circle class="el-icon-plus" @click="queryMenuTypes(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip placement="bottom" content="修改菜谱名称">
          <el-button circle class="el-icon-edit" @click="updateMenuTypes(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="tit" :visible.sync="moreInformations">
      <el-card class="box-card" >
        <span style="margin-left: 350px" v-if="this.moreInfoTypeTwo.sLevel !==0">所属二级课程
          <el-divider direction="vertical"></el-divider>
        </span>
        <span style="margin-left: 350px">所属课程</span>
        <el-divider></el-divider>
        <span style="margin-left: 350px">{{this.moreInfoTypeTwo.stname}}</span>
        <el-divider v-if="this.moreInfoTypeTwo.sLevel !==0" direction="vertical"></el-divider>
        <span style="margin-left: 350px">{{this.moreInfoTypeOne.stname}}</span>
      </el-card>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-divider></el-divider>
      <el-form v-model="mTnames" style="width: 50%;margin-left: 180px" label-width="150px">
        <el-form-item label="请选择所属课程">
          <el-cascader
            style="width: 265px;"
            v-model="props.value"
            :options="options"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="mTnames.Stname" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertMenuTypes()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="tits" :visible.sync="dialogFormTypes">
      <el-divider></el-divider>
      <el-form :model="this.rowstname" style="width: 50%;margin-left: 180px" label-width="150px">
        <el-form-item label="请选择所属课程" v-if="this.rowsLevel > 0">
          <el-cascader
            style="width: 265px;"
            v-model="props.value"
            :options="options"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="课程名称">
          <el-input v-model="rowstname.stname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMenuType()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      style="margin-left: 600px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.studioTypes.length">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'menuTypes',
    inject:['reload'],
    data(){
      return{
        show:false,
        mTnames:{},
        tits:'修改课程名称',
        props: {
          multiple: false,
          getCheckedNodes:false,
          label:'stname',
          value:'stid'
        },
        options: [{
          stid: 1,
          stname: '东南',
        }],
        studioTypes:[],
        currentPage:1,
        rows:'',
        rowstname:{},
        rowsLevel:'',
        pagesize:5,
        tit:'详情',
        title:'添加课程',
        changeMenuTypes:{},
        moreInformations:false,
        moreInfoType:{},
        moreInfoTypeTwo:{},
        moreInfoTypeOne:{},
        dialogFormTypes:false,
        dialogFormVisible:false
      }
    },
    methods: {
      updateMenuTypes:function(row){
          this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/queryStudioOne').then(resp=>{
            this.options = resp.data
            this.rows = row.stid
            this.rowsLevel = row.sLevel
            this.rowstname = row
            this.dialogFormTypes = true
          })
      },
      queryMenuTypes:function(){
        this.dialogFormVisible = true
          this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/queryStudioOne').then(resp=>{
            this.options = resp.data
          })
      },
      updateMenuType:function(){
        let sLevel = this.props.value
        if(sLevel === 'stid'){
          this.$message("请选择所属课程")
        }else if(this.rowstname.stname === ''){
          this.$message("课程名称不能为空")
        }else {
          let param = this.$qs.stringify({"sLevel": sLevel[0], "stname": this.rowstname.stname, "stid": this.rows})
          this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/updateStudioTypesTwo', param).then(resp => {
            if (resp.data === 1) {
              this.$message('修改成功')
              this.reload()
            }
          })
        }
      },
      insertMenuTypes:function(){
        let a = this.props.value
        if(a === 'mtid'){
          this.$message("请选择所属课程")
        }else if(this.mTnames.Stname === undefined){
          this.$message("课程名称不能为空")
        }else {
          this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/insertStudioTypesTwo', this.$qs.stringify({
            "Stname": this.mTnames.Stname,
            "sLevel": a[0]
          })).then(resp => {
            if (resp.data === 1) {
              this.$message('添加成功')
              this.reload()
            }
          })
        }
      },
      moreInfo:function(row){
        if(row.sLevel > 0){
          this.moreInfoTypeTwo={}
          this.moreInfoTypeOne={}
          this.moreInformations = true
          let params = this.$qs.stringify({"sLevel":row.sLevel})
          this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/queryStudioTypeTwo',params).then(resp=>{//查询所属的二级菜谱信息
            this.moreInfoTypeTwo = resp.data[0]
          })
        }else {
          this.$message('无详细信息')
        }
      },
      handleSizeChange: function (size) {
        this.pagesize = size;
        //console.log(this.pagesize)  //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        //console.log(this.currentPage)  //点击第几页
      },
    },
    created() {
      this.$axios.post('http://localhost:8080/cookbooktest/BackRadioTypeController/queryStudioType').then(resp=>{
          this.studioTypes = resp.data
      })
    }
  }
</script>

<style scoped>

</style>
