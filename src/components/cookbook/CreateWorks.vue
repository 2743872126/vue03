<template>
  <div class="main">
    <h1 style="text-align: left;color: crimson; margin-left: 50px;margin-top: -50px">上传我做的{{this.$route.params.mname}}</h1>
    <el-form :model="newWork" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-ruleForm">
      <div style="float:left;width: 60%">
        <el-form-item prop="winfo">
          <el-input type="textarea"  style="margin-top:30px;float: left;width: 70%;" v-model="newWork.winfo" placeholder="分享心得"></el-input>
        </el-form-item>
        <el-form-item style="text-align: left" >
          <el-upload :limit="1" :on-change="filespic2" list-type="picture-card" drag="" accept=".jpg,.png"  :on-preview="handlePictureCardPreview2" :auto-upload="false">
            <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传预览图</el-link>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="tu1" >
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button style="font-size: 30px;background-color: crimson" type="primary" @click="submitForm2" v-loading.fullscreen.lock="fullscreenLoading">发布视频</el-button>
          <el-button @click="()=> {this.$router.push({name:'main'})}" style="font-size: 30px;background-color: crimson;"  type="primary" >退出</el-button>
        </el-form-item>

      </div>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'CreateWorks',
    data(){
      return {
        newWork:{uid:this.$store.state.user.userInfo.uid,mid:this.$route.params.mid},
        file1:[],
        dialogVisible:fale,
        tu1:'',
        fullscreenLoading:false,
        rules: {
          winfo: [
            {required: true, message: '不能为空'},
            {min: 10, max: 99, message: '好好写', trigger: ['blur']},
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
    },
    methods:{
      filespic2(file){
        this.file1.push(file.raw);
      },
      handlePictureCardPreview2(file) {
        this.tu1 = file.url;
      }, submitForm2(){
        this.$refs['fmin'].validate(valid=> {
          if(valid){
            fullscreenLoading = true;
            this.$axios.post("http://localhost:8080/cookbooktest/file/uploadpic", new FormData().append("file1", this.file1[0]), {headers: {'Content-Type': 'multipart/form-data'}})
              .then(res => {
                alert(res.data);
                if (res.data.length > 0) {
                  alert(res.date);
                  //this.$axios.post("http://localhost:8080/cookbooktest/WorksController/saveWorks",this.)
                }
              })
          }
        })
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
    font-size: 100%;
    border:1px solid gainsboro;
  }
  .select{
    width: 45%;
    border-color: gainsboro;
    height: 40px;
    font-size: 28px;
    margin-top: -100px;
  }
  .radios{
    height: 20px;
    font-weight: 900;
  }
</style>
