<template>
  <div class="main" style="width: 73%;margin-left: 12%">
    <el-form style="width: 80%;margin-left: 10%" :model="newMenus" status-icon :rules="rules" ref="mform" class="demo-ruleForm">
        <el-form-item prop="mname">
          <el-input  style="font-size: 20px;line-height: 20px" type="textarea" :rows="1" v-model="newMenus.mname" placeholder="请输入菜谱名"></el-input>
        </el-form-item>
        <el-form-item style="text-align: left" >
          <img :src="pic1"/>
        </el-form-item>
      <el-form-item style="margin-top: 40px;">
        <p style="text-align: left;line-height: 10px;position: relative">
          <el-avatar :size="60" :src="'/static/jpg/'+this.$store.state.user.userInfo.pic"></el-avatar>
          <span style="font-size: 18px;position: absolute;top: 25px;left: 80px">{{this.$store.state.user.userInfo.uname}}的厨房</span>
        </p>
      </el-form-item>

        <el-form-item prop="Info" style="margin-top: 30px">
          <el-input style="font-size: 25px;" v-model="newMenus.info" type="textarea" placeholder="点击添加菜谱描述"></el-input>
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
        <radio v-model="newMenus.state" border size="medium" class="el-radio" value="0">所有人可见</radio>
        <radio v-model="newMenus.state" border size="medium" class="el-radio" value="1">仅个人可见</radio>
      </p>

        <el-form-item >
          <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 25px;color: darkseagreen;font-weight: bold">用料</p>
          <el-table :data="detail" border :show-header="status" style="color: black" :cell-style="{background:'#fff'}">
            <el-table-column label="材料" prop="Material">
              <template slot-scope="scope">
                <input v-model="scope.row.material" class="inputs"  placeholder="食材：如鸡蛋"></input>
              </template>
            </el-table-column>
            <el-table-column label="用量" prop="Num">
              <template slot-scope="scope">
                <input v-model="scope.row.num" class="inputs" placeholder="用量：如一只"></input>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <p style="line-height:40px;text-align: left;margin-bottom: 10px;font-size: 25px;color: darkseagreen;font-weight: bold">做法步骤：</p>
          <el-row :gutter="10" v-for="(v,i) in menuSteps" >
            <el-col :xs="4" :sm="6" :md="8" :lg="4" :xl="1" style="font-size: 20px">{{i+1}}.</el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><el-input type="textarea" style="margin-bottom: 10px;font-size: 20px"  rows="10" v-model="v.msinfo" class="inputsplus"></el-input></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="11" :xl="13">
              <img :src="'static/jpg/'+pic2[i]" width="300px" height="330px"/>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button style="font-size: 20px;background-color: crimson" type="primary" @click="submitForm">发布菜谱</el-button>
          <el-button  style="font-size: 20px;background-color: crimson;"  type="primary" @click="()=>{this.$router.push({name:'Mymenus'})}">不改了</el-button>
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
                    if('1'==res.data){
                      this.$router.push({name:'Mymenus'});
                    }else{
                      this.$message.error("服务器异常")
                    }
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
    font-size: 20px;
    border:1px solid white;
  }
  .inputsplus{
    width: 100%;
    height: 100%;

    line-height: 100%;
    font-size: 80%;
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
