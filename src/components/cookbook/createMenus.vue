<template>
  <div class="main" style="width: 73%;margin-left: 12%">
    <el-form style="width: 80%;margin-left: 10%" :model="newMenus" status-icon :rules="rules" ref="mform"  class="demo-ruleForm">
        <el-form-item prop="mname">
          <el-input  style="font-size: 20px;line-height: 20px" type="textarea" :rows="1" v-model="newMenus.mname" placeholder="请输入菜谱名"></el-input>
<!--
          <router-link style="float:right;color: crimson;font-size: 20px" :to="{name:'Drafts'}">去草稿箱<icon class="el-icon-top-right"></icon></router-link>
-->
        </el-form-item>
        <el-form-item style="text-align: left" >
          <el-upload limit="1" :on-change="filespic" list-type="picture-card" drag="" accept=".jpg,.png"  :on-preview="handlePictureCardPreview" :auto-upload="false">
            <el-link style="font-size: 20px" slot="trigger" size="small" type="primary">上传预览图</el-link>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="tu1"  alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item style="margin-top: 40px;">
          <p style="text-align: left;line-height: 10px;position: relative">
          <el-avatar :size="60" :src="'/static/jpg/'+this.$store.state.user.userInfo.pic"></el-avatar>
          <span style="font-size: 18px;position: absolute;top: 25px;left: 80px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
          </p>
        </el-form-item>
        <el-form-item prop="Info" style="margin-top: 30px">
          <el-input style="font-size: 25px;" v-model="newMenus.Info" type="textarea" placeholder="点击添加菜谱描述"></el-input>
        </el-form-item>

      <p style="line-height:30px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">选择分类  :</p>
      <p style="line-height: 40px">
        <select v-model="value" class="select" filterable placeholder="一级">
          <option v-for="item,index in options"  :value="item.mtid">{{item.mtname}}</option>
        </select>
        <select  class="select" v-model="newMenus.Mtid" filterable placeholder="二级">
          <option v-for="item in childrenoptions" :value="item.mtid">{{item.mtname}}</option>
        </select>
      </p>
      <p style="line-height: 30px">正确的分类有助于菜谱火起来哦！</p>
      <p style="line-height:30px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">可见  :</p>
      <p style="line-height: 40px">
        <radio v-model="newMenus.State" border size="medium" class="el-radio" value="0">所有人可见</radio>
        <radio v-model="newMenus.State" border size="medium" class="el-radio" value="1">仅个人可见</radio>
      </p>

        <el-form-item >
          <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 25px;color: darkseagreen;font-weight: bold">用料</p>
          <el-table :data="detail" border :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
            <el-table-column label="材料" prop="Material" width="370px">
              <template slot-scope="scope">
                <input v-model="scope.row.Material" class="inputs"  placeholder="食材：如鸡蛋"></input>
              </template>
            </el-table-column>
            <el-table-column label="用量" prop="Num" width="370">
              <template slot-scope="scope">
                <input v-model="scope.row.Num" class="inputs" placeholder="用量：如一只"></input>
              </template>
            </el-table-column>
            <el-table-column v-if="detail.length>1">
              <template>
              <icon @click="removeAppointUser(i)" style="font-size: 20px;margin-top: 4px" class="el-icon-close"></icon>
              </template>
            </el-table-column>
          </el-table>
          <!--<el-row style="border: 1px solid black" :gutter="10" v-for="(v,i) in detail">
            <el-col :xs="2" :sm="4" :md="8" :lg="4" :xl="11" style="font-size: 32px;border: 1px solid black">{{i+1}}.</el-col>
            <el-col style="border: 1px solid black" :xs="2" :sm="4" :md="8" :lg="7" :xl="11"><input v-model="v.Material" class="inputs"></input></el-col>
            <el-col style="border: 1px solid black" :xs="2" :sm="4" :md="8" :lg="7" :xl="10"><input v-model="v.Num" class="inputs"></input></el-col>
            <el-col style="border: 1px solid black" :xs="2" :sm="4" :md="8" :lg="5" :xl="2"><icon  @click="removeAppointUser(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>-->
          <el-button @click="adddetailcol" round style="background-color:crimson;color: white; font-size: 18px;margin-top: 20px">追加一行</el-button>
        </el-form-item>
        <el-form-item>
          <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 25px;color: darkseagreen;font-weight: bold">做法步骤：</p>
          <el-row :gutter="10" v-for="(v,i) in menuSteps" >
            <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="1" style="font-size: 20px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><el-input type="textarea" style="margin-bottom: 10px;font-size: 20px"  rows="10" v-model="v.msinfo" class="inputsplus"></el-input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="7" :xl="13">
              <el-upload limit="1" :on-change="changeStep" list-type="picture-card" accept=".jpg,.png" :on-preview="handlePictureCardPreview" :auto-upload="false">
              <el-link style="font-size: 20px;" slot="trigger" size="small" type="primary">上传步骤图</el-link>
            </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="tu1"  alt="">
              </el-dialog>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="2" :xl="2" v-if="menuSteps.length>1"><icon  @click="removestep(i)" style="font-size: 20px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>
          <el-button @click="addstep" round style="background-color:crimson;color: white; font-size: 18px;margin-top: 20px">追加一个步骤</el-button>
        </el-form-item>
        <el-form-item >
          <p style="margin-top: 80px">
          <el-button style="font-size: 20px;background-color: crimson" type="primary" @click="submitForm">发布菜谱</el-button>
         <!-- <el-button  style="font-size: 20px;background-color: crimson;"  type="primary" @click="cunrucaogao">保存草稿</el-button>-->
          </p>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'createMenus',
    data () {
      return {
        status:false,
        menuSteps:[{msinfo:"步骤一"}],
        detail:[{Material:"",Num:""}],
        dialogVisible: false,
        tu1: '',
        newMenus: {uid:this.$store.state.user.userInfo.uid,State:"0"},
        options:[],
        childrenoptions:[],
        value:'',
        file2:[],
        file1:[],
        rules: {
          mname: [
            {required: true, message: '不能为空'},
            {min: 1, max: 20, message: '最多20个字', trigger: ['blur']},
            {validator:function(rule,value,callback){
                if(value.indexOf('-') == -1){
                  callback();
                }else{
                  callback(new Error("不能包 含特殊字符"));
                }
              },trigger: ['blur','change']}
          ],
          Info:[
            {required: true, message: '不能为空'},
            {min: 10, max: 300, message: '最多99个字', trigger: ['blur']},
          ]
        }
      }
    }
    ,
    created(){
      if (undefined==this.$store.state.user.userInfo.uid) { // 查询本地存储信息是否已经登陆
        this.$router.push({path: '/login2'});
      }
      let mid=this.$route.params.mid;
      this.$axios.post("http://localhost:8080/cookbooktest/MenuTypesController/queryall").then(res=>{
        this.options=res.data;
      })
    }
    ,
    watch:{
      'value':function() {
        this.options.forEach((v)=>{
          if(v.mtid==this.value){
            this.childrenoptions=v.menutypess;
          }
        })
      },
    }
    ,
    methods: {
      submitForm () {
        //this.$refs.uploads.submit();
        this.$refs['mform'].validate(valid=> {
          if (valid) {
            if (0 != this.file1.length || 0 != this.file2.length) {
              if (undefined != this.newMenus.Mtid) {
                let for1 = new FormData();
                for (let i of this.file2) {
                  for1.append('file2', i);
                }
                this.$axios.post("http://localhost:8080/cookbooktest/file/uploadImage", for1, {headers: {'Content-Type': 'multipart/form-data'}})
                let for2 = new FormData();
                for2.append("file1", this.file1[0])
                this.$axios.post("http://localhost:8080/cookbooktest/file/uploadpic", for2, {headers: {'Content-Type': 'multipart/form-data'}})
                let for3 = new FormData();
                for3.append("menu", JSON.stringify(this.newMenus));
                for3.append("menuStep", JSON.stringify(this.menuSteps));
                for3.append("detail", JSON.stringify(this.detail));
                this.$axios.post("http://localhost:8080/cookbooktest/file/upMenus", for3, {headers: {'Content-Type': 'multipart/form-data'}}
                ).then(res => {
                  this.$router.push({name:"Mymenus"})
                }).catch(error => {
                  console.log(error);
                })
              } else {
                this.$Message.error("请选择分类");
              }
            } else {
              this.$Message.error("图片必不可少");
            }
          }
        })
      },
      filespic(file){
        this.file1.push(file.raw);
      },
      changeStep(file){
        this.file2.push(file.raw);
        console.log(file.raw);
      },
      handlePictureCardPreview(file) {
        this.tu1 = file.url;
        this.dialogVisible = true;
      },
      adddetailcol(){
        this.detail.push({Material:"",Num:""})

      },
      removeAppointUser(index) {
        console.log(index)
        this.detail.splice(index,1);
      },
      addstep() {
        //判断是否已经添加过
        this.menuSteps.push({msinfo:""})
      },
      removestep(index) {
        console.log(index)
        this.menuSteps.splice(index,1);
      },
      cunrucaogao() {
        this.$refs['mform'].validate(valid=> {
          if(valid){
            let uid = this.$store.state.user.userInfo.uid;
            if (null != localStorage.getItem(uid)) {
              let caogaos = localStorage.getItem(uid);
              localStorage.removeItem(uid);
              let caos = [];
              caos = JSON.parse(caogaos)
              caos.push([this.newMenus, this.detail, this.menuSteps]);
              localStorage.setItem(uid, JSON.stringify(caos));
            } else {
              //如果不存在该用户的草稿箱则创建一个 草稿格式为：菜单，菜单用料，菜单步骤
              localStorage.setItem(uid, JSON.stringify([[this.newMenus, this.detail, this.menuSteps]]))
            }
            this.$router.push({name: 'Drafts'})
          }
        })

      }
    }

  }
</script>

<style scoped>


  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .inputs{
    width: 100%;
    height: 100%;
    line-height: 25px;
    font-size: 20px;
    border:1px solid white;
  }
  .inputsplus{

    border:1px solid gainsboro;
  }
  .select{
    width: 200px;
    height: 30px;
    font-size: 12px;
  }
  .el-radio{
    height: 40px;
    font-weight: 900;
  }
</style>
