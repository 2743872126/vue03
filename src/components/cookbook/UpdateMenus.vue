<template>
  <div class="main">
    <el-form :model="newMenus" status-icon :rules="rules" ref="mform" label-width="100px" class="demo-ruleForm">
    <div style="float:left;width: 60%">
        <el-form-item prop="mname">
          <el-input  style="width: 100%;" v-model="newMenus.mname" placeholder="请输入菜谱名"></el-input>
        </el-form-item>
        <el-form-item style="text-align: left" >
          <img :src="pic1"/>
        </el-form-item>
        <el-form-item prop="Info" style="margin-top: 60px">
          <el-input style="width: 100%;font-size: 33px;" v-model="newMenus.info" type="textarea" placeholder="点击添加菜谱描述"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 60px;">
          <el-avatar :size="100" :src="'/static/jpg/'+this.$store.state.user.userInfo.pic" style="float:left;margin-top: -30px;margin-bottom: 0px"></el-avatar>
          <span style="margin-left: -300px;font-size: 40px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
        </el-form-item>
        <el-form-item >
          <h1 style="text-align: left;margin-bottom: 10px">用料  :</h1>
          <el-row :gutter="10" v-for="(v,i) in detail">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><input v-model="v.material" class="inputs"></input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10"><input v-model="v.num" class="inputs"></input></el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <h1 style="text-align: left;margin-bottom: 10px">做法步骤  :</h1>
          <el-row :gutter="10" v-for="(v,i) in menuSteps">
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="1" style="font-size: 32px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><el-input type="textarea" style="margin-bottom: 10px;font-size: 33px"  rows="5" v-model="v.msinfo" class="inputsplus"></el-input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="10">
              <img :src="'static/jpg/'+pic2[i]" width="300px" height="300px"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button style="font-size: 30px;background-color: crimson" type="primary" @click="submitForm">发布菜谱</el-button>
          <el-button  style="font-size: 30px;background-color: crimson;"  type="primary" @click="()=>{this.$router.push({name:'Mymenus'})}">不改了</el-button>
        </el-form-item>

    </div>
    <p style="float: left;width: 5%"></p>
    <div style="float:left;width: 35%">
      <h1 style="line-height:90px;text-align: left;margin-bottom: 10px">选择分类  :</h1>
      <select v-model="value" class="select" filterable placeholder="一级">
        <option v-for="item,index in options"  :value="item.mtid">{{item.mtname}}</option>
      </select>
      <select  class="select" v-model="newMenus.Mtid" filterable placeholder="二级">
        <option v-for="item in childrenoptions" :value="item.mtid">{{item.mtname}}</option>
      </select>
      <p style="line-height: 30px">正确的分类有助于菜谱火起来哦！</p>
      <h1 style="line-height:90px;text-align: left;margin-bottom: 10px">可见  :</h1>
        <radio v-model="newMenus.state" border size="medium" class="el-radio" value="0">所有人可见</radio>
        <radio v-model="newMenus.state" border size="medium" class="el-radio" value="1">仅个人可见</radio>
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
        newMenus: {uid:this.$store.state.user.userInfo.uid,State:"0"},
        options:[],
        childrenoptions:[],
        value:'',
        pic1:'',
        pic2:[],
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
          info:[
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
      this.$axios.post("http://localhost:8080/cookbooktest/MenuController/queryMenudetailBymid",this.$qs.stringify({mid:mid})).then(res=>{
        console.log(res.data);
        this.menuSteps=res.data.menuSteps;
        this.detail=res.data.materialsDetails;
        this.newMenus=res.data;
        this.value=res.data.mtid;
        this.pic1='/static/jpg/'+this.newMenus.pic;
        res.data.menuSteps.forEach(v=>{
          this.pic2.push(v.mspic);
        })
      })
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
              if (undefined != this.newMenus.Mtid) {
                //修改

                this.newMenus.menuSteps=this.menuSteps;
                this.newMenus.materialsDetails=this.detail;
                this.$axios.post("http://localhost:8080/cookbooktest/MenuController/updateMenus",this.newMenus)
                  .then(res=>{
                    this.$router.push({name:'Mymenus'});
                  }).catch(err=>{
                   this.$message.error("请稍后尝试")
                })

              } else {
                this.$Message.error("请选择分类");
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
