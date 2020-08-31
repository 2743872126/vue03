<template>
  <div class="main">
    <el-form :model="newMenus" status-icon :rules="rules" ref="mform" label-width="100px" class="demo-ruleForm">

    <div style="float:left;width: 60%">
        <el-form-item prop="mname">
          <input style="width: 100%;height: 60px;font-size: 55px;border: 1px solid gainsboro ;" v-model="newMenus.mname" placeholder="请输入菜谱名"></input>
        </el-form-item>
        <el-form-item style="text-align: left" >
          <el-upload limit="1" :on-change="filespic" list-type="picture-card" drag="" accept=".jpg,.png"  :on-preview="handlePictureCardPreview" :auto-upload="false">
            <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传预览图</el-link>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="tu1"  alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item prop="Info" style="margin-top: 60px">
          <el-input style="width: 100%;font-size: 33px;" v-model="newMenus.Info" type="textarea" placeholder="点击添加菜谱描述"></el-input>
        </el-form-item>
        <el-form-item >
          <h1 style="text-align: left;margin-bottom: 10px">用料  :</h1>
          <el-row :gutter="10" v-for="(v,i) in detail">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><input v-model="v.Material" class="inputs"></input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10"><input v-model="v.Num" class="inputs"></input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="2"><icon  @click="removeAppointUser(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>
          <el-button @click="adddetailcol" round style="float:left;background-color: orange;color: white; font-size: 30px">追加一行</el-button>
        </el-form-item>
        <el-form-item>
          <h1 style="text-align: left;margin-bottom: 10px">做法步骤  :</h1>
          <el-row :gutter="10" v-for="(v,i) in menuSteps">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><el-input type="textarea" style="margin-bottom: 10px;font-size: 33px"  rows="5" v-model="v.msinfo" class="inputsplus"></el-input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10">
              <el-upload limit="1" :on-change="changeStep" list-type="picture-card" accept=".jpg,.png" :on-preview="handlePictureCardPreview" :auto-upload="false">
              <el-link style="font-size: 22px;" slot="trigger" size="small" type="primary">上传步骤图</el-link>
            </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="tu1"  alt="">
              </el-dialog>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="2"><icon  @click="removestep(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>
          <el-button @click="addstep" round style="float:left;background-color: orange;color: white; font-size: 30px">追加一个步骤</el-button>
        </el-form-item>
        <el-form-item>
          <el-button style="font-size: 30px;background-color: crimson" type="primary" @click="submitForm">发布菜谱</el-button>
          <el-button  style="font-size: 30px;background-color: crimson;"  type="primary" @click="cunrucaogao">保存草稿</el-button>
        </el-form-item>

    </div>
    <p style="float: left;width: 5%"></p>
    <div style="float:left;width: 35%">
      <router-link style="margin:-30px 0 -500px 0;color: crimson;font-size: 30px" :to="{name:'Drafts'}">去草稿箱<icon class="el-icon-top-right"></icon></router-link>
      <h1 style="line-height:90px;text-align: left;margin-bottom: 10px">选择分类  :</h1>
      <select v-model="value" class="select" filterable placeholder="一级">
        <option v-for="item,index in options"  :value="item.mtid">{{item.mtname}}</option>
      </select>
      <select  class="select" v-model="newMenus.Mtid" filterable placeholder="二级">
        <option v-for="item in childrenoptions" :value="item.mtid">{{item.mtname}}</option>
      </select>
      <p style="line-height: 30px">正确的分类有助于菜谱火起来哦！</p>
      <h1 style="line-height:90px;text-align: left;margin-bottom: 10px">可见  :</h1>
        <radio v-model="newMenus.State" border size="medium" class="el-radio" value="0">所有人可见</radio>
        <radio v-model="newMenus.State" border size="medium" class="el-radio" value="1">仅个人可见</radio>
    </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'createMenus',
    data () {
      return {
        menuSteps:[{msinfo:"步骤一"}],
        detail:[{Material:"鸡蛋",Num:"三只"}],
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
          ],
          Info:[
            {required: true, message: '不能为空'},
            {min: 1, max: 99, message: '最多99个字', trigger: ['blur']},
          ]
        }
      }
    }
    ,
    created(){
      if (undefined==this.$store.state.user.userInfo.uid) { // 查询本地存储信息是否已经登陆
        this.$router.push({path: '/login2'});
      }

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
      '$route':{
        handler(newval,oldval){
          console.log(newval);
          console.log(oldval);
        }
      }
    }
    ,
    methods: {
      submitForm () {
        //this.$refs.uploads.submit();
        if(0!=this.file1.length||0!=this.file2.length){
          if(undefined!=this.newMenus.Mtid ){
            let for1=new FormData();
            for(let i of this.file2){
              for1.append('file2',i);
            }
            this.$axios.post("http://localhost:8080/cookbooktest/file/uploadImage",for1,{headers: {'Content-Type': 'multipart/form-data'}})
            let for2 =new FormData();
            for2.append("file1",this.file1[0])
            this.$axios.post("http://localhost:8080/cookbooktest/file/uploadpic",for2,{headers: {'Content-Type': 'multipart/form-data'}})
            let for3=new FormData();
            for3.append("menu",JSON.stringify(this.newMenus));
            for3.append("menuStep",JSON.stringify(this.menuSteps));
            for3.append("detail",JSON.stringify(this.menuSteps));
            this.$axios.post("http://localhost:8080/cookbooktest/file/upMenus", for3,{headers: {'Content-Type': 'multipart/form-data'}}
            ).then(res=>{
              this.$router.beforeEach((to,from,next)=>{
                console.log(to);
                console.log(from);
                console.log(next);
              })
            }).catch(error=>{
              console.log(error);
            })
          }else{
            this.$Message.error("请选择分类");
          }
        }else{
          this.$Message.error("图片必不可少");
        }

      },
      filespic(file){
        this.file1.push(file.raw);
      },
      changeStep(file){
        alert("1")
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
        this.upnum=this.upnum+1;
        this.menuSteps.push({msinfo:""})
      },
      removestep(index) {
        this.upnum=this.upnum-1;
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

  .main{
    width: 80%;
    margin-left: 10%
  }
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
    line-height: 40px;
    font-size: 32px;
    border:1px solid gainsboro;
  }
  .inputsplus{
    width: 100%;
    height: 100%;

    line-height: 100%;
    font-size: 80%;
    border:1px solid gainsboro;
  }
  .select{
    width: 45%;
    border-color: gainsboro;
    height: 40px;
    font-size: 28px;
    margin-top: -100px;
  }
  .el-radio{
    height: 40px;
    font-weight: 900;
  }
</style>
