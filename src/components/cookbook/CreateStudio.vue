<template>
<div class="main">
  <el-form :model="newStudio" status-icon :rules="rules" ref="myForm" label-width="100px" class="demo-ruleForm">
    <div style="float:left;width: 60%">
      <el-form-item prop="sname">
        <el-input  style="float: left;width: 70%;" v-model="newStudio.sname" placeholder="请输入课程名"></el-input>
      </el-form-item>
      <el-form-item style="text-align: left" >
        <el-upload :limit="1" :on-change="filespic2" list-type="picture-card" drag="" accept=".jpg,.png"  :on-preview="handlePictureCardPreview2" :auto-upload="false">
          <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传预览图</el-link>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="tu1" >
        </el-dialog>
      </el-form-item>
      <el-form-item prop="money" style="margin-top: 60px">
        <el-input-number :min="0" :max="500" style="margin-left: -170px;width: 70%;font-size: 33px;" v-model="newStudio.money" placeholder="价格"></el-input-number>
      </el-form-item>
      <el-form-item style="margin-top: 60px;">
        <el-avatar :size="100" :src="'/static/jpg/'+this.$store.state.user.userInfo.pic" style="float:left;margin-top: -30px;margin-bottom: 0px"></el-avatar>
        <span style="margin-left: -100px;font-size: 40px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
      </el-form-item>
      <el-form-item>
        <h1 style="text-align: left;margin-bottom: 30px">视频上传  :</h1>
        <el-row style="margin-top: 20px;margin-bottom: 20px" :gutter="10" v-for="(v,i) in studioDetail">
          <el-col :span="1">{{i+1}}.</el-col>
          <el-col :span="9"  prop="sInfo" ><el-input type="textarea"  rows="10" v-model="v.sInfo" class="inputsplus"></el-input></el-col>
          <el-col :span="8" :offset="1">
            <el-upload :limit="1" :on-change="changeSteppic" accept=".mp4,.mpeg,.avi" :on-preview="handlePictureCardPreview2" :auto-upload="false">
              <el-button style="font-size: 22px;" slot="trigger" size="small" type="primary">点击上传<span style="font-size: 16px">(200mb以内)</span></el-button>
            </el-upload>
              <radio v-model="v.State" border size="medium" class="radios" value="1">付费</radio>&nbsp;&nbsp;&nbsp;
              <radio v-model="v.State" border size="medium" class="radios" value="0">免费</radio>
          </el-col>
          <el-col :span="5"><icon title="删除这行"  @click="removestep2(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon></el-col>
        </el-row>
        <el-button @click="addstep2" round style="float:left;background-color: orange;color: white; font-size: 20px">追加一集</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="font-size: 30px;background-color: crimson" type="primary" @click="submitForm2">发布视频</el-button>
        <el-button @click="()=> {this.$router.push({name:'main'})}" style="font-size: 30px;background-color: crimson;"  type="primary" >退出</el-button>
      </el-form-item>

    </div>
    <p style="float: left;width: 5%"></p>
    <div style="float:left;width: 35%">
      <h1 style="line-height:90px;text-align: left;margin-bottom: 10px">选择分类  :</h1>
      <select v-model="values" class="select" filterable>
        <option v-for="item,index in options" :value="item.stid">{{item.stname}}</option>
      </select>
      <select  class="select" v-model="newStudio.stid" filterable >
        <option v-for="item in childrenoptions" :value="item.stid">{{item.stname}}</option>
      </select>
    </div>
  </el-form>
  {{newStudio}}
  {{studioDetail}}
</div>
</template>

<script>
  export default {
    name: 'CreateStudio',
    data(){
      return {
        dialogVisible:false,
        tu1:'',
        newStudio:{uid:this.$store.state.user.userInfo.uid},
        studioDetail:[{sInfo:"第一集",State:0}],
        upnum:1,
        values:'',
        options:[],
        childrenoptions:[],
        file2:[],
        file1:[],
        rules:{
          sname: [
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
            {min: 1, max: 99, message: '最多99个字', trigger: ['blur']},
          ],
          money:[
            {required: true, message: '不能为空'},
          ],
        }
      }
    },
    methods:{
      filespic2(file){
        this.file1.push(file.raw);
      },
      addstep2() {
        //判断是否已经添加过
        this.upnum=this.upnum+1;
        this.studioDetail.push({sInfo:"",State:1})
      },
      removestep2(index) {
        this.upnum=this.upnum-1;
        this.studioDetail.splice(index,1);
      }
      ,
      handlePictureCardPreview2(file) {
        this.tu1 = file.url;
      },
      submitForm2(){
        this.$refs['myForm'].validate(valid=>{
          if(valid){

          }
        })
      },
      changeSteppic(){
        this.file2.push(file.raw);
        console.log(file.raw);
      }
    },
    created(){
      this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryTypes").then(res=>{
        this.options=res.data;
      })
    },
    watch:{
      'values':function(){
        this.$axios.post("http://localhost:8080/cookbooktest/StudioContorller/queryChildrenTypes",this.$qs.stringify({slevel:this.values})).then(res=>{

          this.childrenoptions=res.data;
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
