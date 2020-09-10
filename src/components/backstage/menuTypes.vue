<template>
  <div>
    <el-table
      :data="menuTypes.slice((currentPage-1) * pagesize,currentPage * pagesize)"
      stripe
      style="width: 100%">
      <el-table-column
        prop="mtid"
        label="菜谱编号"
        width="400px">
      </el-table-column>
      <el-table-column
        prop="mtname"
        label="菜单名字"
        width="400px">
      </el-table-column>
      <!--<el-table-column
        prop="state"
        label="状态"
        width="400px">
      </el-table-column>-->
      <el-table-column
        label="详情"
        width="400px">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" content="详情">
            <el-button circle class="el-icon-more" type="el-icon-more" plain @click="moreInfo(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-tooltip placement="bottom" content="添加菜谱">
          <el-button circle class="el-icon-plus" @click="queryMenuTypes(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip placement="bottom" content="修改菜谱名称">
          <el-button circle class="el-icon-scissors" @click="updateMenuTypes(scope.row)" style="margin-left: 5px"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="tit" :visible.sync="moreInformations">
      <el-card class="box-card" >
        <span v-if="this.moreInfoTypeTwo.mLevel !==0">所属二级菜谱
          <el-divider direction="vertical"></el-divider>
        </span>
        <span>所属一级菜谱</span>
        <el-divider></el-divider>
        <span>{{this.moreInfoTypeTwo.mtname}}</span>
        <el-divider v-if="this.moreInfoTypeTwo.mLevel !==0" direction="vertical"></el-divider>
        <span>{{this.moreInfoTypeOne.mtname}}</span>
      </el-card>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-divider></el-divider>
      <el-form v-model="mTnames" style="width: 50%;margin-left: 150px" label-width="150px">
        <el-form-item label="请选择一级菜谱">
          <el-cascader
            style="width: 310px;"
            v-model="props.value"
            :options="options"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜谱名称">
          <el-input v-model="mTnames.Mtname" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="insertMenuTypes()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="tits" :visible.sync="dialogFormTypes">
      <el-divider></el-divider>
      <el-form  v-model="mTnames" style="width: 50%;margin-left: 180px" label-width="150px">
        <el-form-item label="请选择一级菜谱" v-if="this.rowsLevel > 0">
          <el-cascader
            style="width: 310px;margin-left: 50px"
            v-model="props.value"
            :options="options"
            :props="props">
          </el-cascader>
        </el-form-item>
        <el-form-item label="菜谱名称">
          <el-input v-model="rowMtname.mtname"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMenuType()">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.menuTypes.length">
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
        rowMtname:{},
        rowsLevel:'',
        tits:'修改菜谱名称',
        props: {
          multiple: false,
          getCheckedNodes:false,
          label:'mtname',
          value:'mtid'
        },
        options: [{
          mtid: 1,
          mtname: '东南',
        }],
        menuTypes:[],
        currentPage:1,
        rows:'',
        pagesize:5,
        tit:'详情',
        title:'添加菜谱',
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
          this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/queryMenuOne').then(resp=>{
            this.options = resp.data
            this.rows = row.mtid
            this.rowMtname = row
            this.rowsLevel = row.mLevel
            this.dialogFormTypes = true
          })
      },
      queryMenuTypes:function(){
        this.dialogFormVisible = true
          this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/queryMenuOne').then(resp=>{
            this.options = resp.data
          })
      },
      updateMenuType:function(){
        console.log(this.mTnames.Mtname)
        let mLevel = this.props.value
        if(mLevel === 'mtid'){
          this.$message("请选择一级菜单")
        }else if(this.rowMtname.mtname === undefined){
          this.$message("菜谱名称不能为空")
        }else {
          let param = this.$qs.stringify({"mLevel": mLevel[0], "mtname": this.rowMtname.mtname, "mtid": this.rows})
          this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/updateMenuTypesTwo', param).then(resp => {
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
          this.$message("请选择一级菜单")
        }else if(this.mTnames.Mtname === undefined){
          this.$message("菜谱名称不能为空")
        }else{
          this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/insertMenuTypesTwo',this.$qs.stringify({"Mtname":this.mTnames.Mtname,"mLevel":a[0]})).then(resp=>{
               if (resp.data === 1) {
                 this.$message('添加成功')
                 this.reload()
               }
          })
        }
      },
      moreInfo:function(row){
        if(row.mLevel > 0){
          this.moreInfoTypeTwo={}
          this.moreInfoTypeOne={}
          this.moreInformations = true
          let params = this.$qs.stringify({"mLevel":row.mLevel})
          this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/queryMenuTypesTwo',params).then(resp=>{//查询所属的二级菜谱信息
            this.moreInfoTypeTwo = resp.data[0]
            if(this.moreInfoTypeTwo.mLevel !==0){
              let menuTwo = this.$qs.stringify({"mLevel":this.moreInfoTypeTwo.mLevel})
              this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/queryMenuTypesTwo',menuTwo).then(respOne=>{//查询
                this.moreInfoTypeOne = respOne.data[0]
              })
            }
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
      this.$axios.post('http://localhost:8080/cookbooktest/backMenuTypes/queryMenuTypes').then(resp=>{
          this.menuTypes = resp.data
      })
    }
  }
</script>

<style scoped>

</style>
