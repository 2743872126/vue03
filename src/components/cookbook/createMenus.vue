<template>
  <div class="main">
    <div style="float:left;width: 60%">
      <el-form :model="newMenu" status-icon :rules="rules" ref="mform" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="mname">
          <input style="width: 100%;height: 60px;font-size: 55px;border: 1px solid gainsboro ;" v-model="newMenu.mname" placeholder="请输入菜谱名"></input>
        </el-form-item>
        <el-form-item style="text-align: left" >
          <el-upload list-type="picture-card" ref="upload" drag="" accept=".jpg,.png" action="http://localhost:8080/cookbooktest/file/uploadImage" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handlechange" :auto-upload="false" limit="1" :file-list="filelist">
            <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传预览图</el-link>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="tu1"  alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item prop="Info" style="margin-top: 60px">
          <el-input style="width: 100%;font-size: 33px;" v-model="newMenu.Info" type="textarea" placeholder="点击添加菜谱描述"></el-input>
        </el-form-item>
        <el-form-item>
          <h1 style="text-align: left;margin-bottom: 10px">用料  :</h1>
          <el-row :gutter="10" v-for="(v,i) in detail">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><input v-model="v.Material" class="inputs"></input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10"><input v-model="v.Num" class="inputs"></input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="2"><icon  @click="removeAppointUser(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>
          <el-button @click="addAppointUser" round style="float:left;background-color: crimson;color: white; font-size: 30px">追加一行</el-button>
        </el-form-item>
        <el-form-item>
          <h1 style="text-align: left;margin-bottom: 10px">做法步骤  :</h1>
          <el-row :gutter="10" v-for="(v,i) in menuSteps">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><el-input type="textarea" style="margin-bottom: 10px;font-size: 33px"  rows="5" v-model="v.msinfo" class="inputsplus"></el-input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10">
              <el-upload list-type="picture-card" ref="upload"  accept=".jpg,.png" action="http://localhost:8080/cookbooktest/file/uploadImage" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handlechange" :auto-upload="false" limit="1" :file-list="filelist">
                <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传步骤图</el-link>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="tu1"  alt="">
              </el-dialog>
            </el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="2"><icon  @click="removestep(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
          </el-row>
          <el-button @click="addstep" round style="float:left;background-color: crimson;color: white; font-size: 30px">追加一个步骤</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">发布菜谱</el-button>
          <el-button @click="resetForm">存草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'createMenus',
    data () {
      return {
        menuSteps:[{msinfo:'步骤一'}],
        detail:[{Material:"鸡蛋",Num:'三只'}],
        tableData:[],
        dialogVisible: false,
        isshow:true,
        filelist:[],
        tu1: '',
        newMenu: {},
        rules: {
          mname: [
            {required: true, message: '不能为空'},
            {min: 1, max: 5, message: 'id是1-5位', trigger: ['blur', 'change']},
            {
              validator: function (rule, value, callback) {
                if (value.indexOf('-') == -1) {
                  callback();
                } else {
                  callback(new Error("不能包 含特殊字符"));
                }
              }, trigger: ['blur', 'change']
            }
          ]
        }
      }
    }
    ,
    methods: {
      submitForm () {
        this.$refs.upload.submit();

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.tu1 = file.url;
        this.dialogVisible = true;
      },
      handlechange(fle,filelist){
        if(filelist.length>0){

        }
      },
      resetForm (filelist) {

      },
      addAppointUser() {
        //判断是否已经添加过
        this.detail.push({Material:"",Num:''})
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
</style>
