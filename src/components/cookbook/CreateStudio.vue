<template>
  <div class="main" style="width: 73%;margin-left: 12%">
  <el-form style="width: 80%;margin-left: 10%" :model="newStudio" status-icon :rules="rules" ref="myForm"  class="demo-ruleForm">
    <p style="line-height:50px;text-align: left;margin-bottom: 10px;font-size: 32px;color: black">课程发布</p>
    <el-form-item prop="sname">
        <el-input  style="font-size: 20px;line-height: 20px" type="textarea" :rows="1" v-model="newStudio.sname" placeholder="请输入课程名"></el-input>
      </el-form-item>
    <p style="line-height:30px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">上传封面图  :</p>
    <el-form-item style="text-align: left" >
        <el-upload :limit="1" :on-change="filespic2" list-type="picture-card" drag="" accept=".jpg,.png"  :on-preview="handlePictureCardPreview2" :auto-upload="false">
          <el-link style="font-size: 22px" slot="trigger" size="small" type="primary">上传预览图</el-link>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="tu1" >
        </el-dialog>
      </el-form-item>
    <el-form-item style="margin-top: 40px;">
      <p style="text-align: left;line-height: 10px;position: relative">
        <el-avatar :size="60" :src="'/static/jpg/'+this.$store.state.user.userInfo.pic"></el-avatar>
        <span style="font-size: 18px;position: absolute;top: 25px;left: 80px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
      </p>
    </el-form-item>
      <el-form-item prop="Info" style="margin-top: 40px">
        <el-input type="textarea" style="font-size: 20px;" v-model="newStudio.Info" placeholder="课程描述"></el-input>
      </el-form-item>

    <p style="line-height:30px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">选择分类  :</p>
    <p style="line-height: 40px">
      <select v-model="values" class="select" filterable placeholder="一级">
        <option v-for="item,index in options"  :value="item.stid">{{item.stname}}</option>
      </select>
      <select  class="select" v-model="newStudio.stid" filterable placeholder="二级">
        <option v-for="item in childrenoptions" :value="item.stid">{{item.stname}}</option>
      </select>
    </p>
    <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">选择价格  :</p>
    <el-form-item style="margin-top: 30px">
        <el-input-number :min="0" :max="500" style="width: 70%;font-size: 33px;" v-model="newStudio.money" placeholder="价格"></el-input-number>
      </el-form-item>

      <el-form-item>
        <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 22px;color: darkseagreen;font-weight: bold">视频上传  :</p>
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
        <el-button @click="addstep2" round style="background-color:crimson;color: white; font-size: 18px;margin-top: 20px;float: left">追加一集</el-button>
      </el-form-item>
      <el-form-item>
        <p style="margin-top: 80px">
        <el-button style="font-size: 20px;background-color: crimson" type="primary" @click="submitForm2" v-loading.fullscreen.lock="fullscreenLoading">发布视频</el-button>
        <el-button @click="()=> {this.$router.push({name:'main'})}" style="font-size: 20px;background-color: crimson;"  type="primary" >退出</el-button>
        </p>
      </el-form-item>


  </el-form>
</div>
</template>

<script>
  export default {
    name: 'CreateStudio',
    data(){
      return {
        fullscreenLoading:false,
        dialogVisible:false,
        tu1:'',
        newStudio:{uid:this.$store.state.user.userInfo.uid,money:0},
        studioDetail:[{sInfo:"第一集",State:0}],
        upnum:1,
        yannum:true,
        values:'',
        options:[],
        childrenoptions:[],
        file2:[],
        file1:[],
        rules:{
          sname: [
            {required: true, message: '不能为空'},
            {min: 1, max:50, message: '1-50个字', trigger: ['blur']},
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
            {min: 1, max: 300, message: '1-300个字', trigger: ['blur']},
          ],
        }
      }
    },
    methods:{
      submitForm2(){
        this.fullscreenLoading=true;
        this.$refs['myForm'].validate(valid=>{
          if(valid){
            if (undefined != this.newStudio.stid) {
              this.studioDetail.forEach(v=>{if(null==v.sInfo){
                this.yannum=false;
              }if(0==this.newStudio.money){
                v.State=0;
              }
              })
              if(this.yannum){
                if(this.file2.length==this.upnum){
                  let for1=new FormData();
                  for1.append("file1",this.file1[0]);
                  console.log(for1.get("file1"));
                  this.$axios.post("http://localhost:8080/cookbooktest/file/uploads",for1,).then(res=>{
                    if(res.data=='ok'){
                      this.file2.forEach(v=>{
                        for1.append("file2",v);
                      })
                      this.$axios.post("http://localhost:8080/cookbooktest/file/studiosVideo",for1).then(res=>{
                        if(res.data=='ok'){
                          for1.append("newStudio",JSON.stringify(this.newStudio));
                          for1.append("studioDetail",JSON.stringify(this.studioDetail));
                          this.$axios.post("http://localhost:8080/cookbooktest/file/upStudios",for1).then(res=>{
                            if(res.data=='ok'){

                              setTimeout(() => {
                                this.fullscreenLoading=false;
                                this.$router.push({name:'MyStudio2'});
                              }, 2000);

                            }
                          })
                        }
                      })
                    }
                  })
                }else{
                  this.$message.error("视频必不可少"+this.file2.length);
                }
              }else{
                this.$message.error("详情、价格都必不可少");
              }
            }else{
              this.$message.error("请选择种类");
            }
          }else{
            this.$message.error("完成表单必填项");
          }
        })
      },
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

      changeSteppic(file){
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
    width: 200px;
    height: 30px;
    font-size: 12px;
  }
  .radios{
    height: 20px;
    font-weight: 900;
    margin-top: 20px;
  }
</style>
