<template>
    <div>
      <el-button style="float: right; margin-top: 20px" type="danger" @click="clearDrafts"><icon class="el-icon-delete-solid">清空</icon></el-button>
      <ul>
        <li v-for="(v,i) of this.userinfo">
          <p style="line-height: 30px;font-size: 28px">{{v[0].mname}}
          <icon  @click="removes(i)" style="font-size: 40px;margin-top: 4px" class="el-icon-close"></icon>
          </p>
        </li>
      </ul>
    </div>
</template>

<script>
  export default {
    name: 'Drafts',
    data(){
      return {
        ismenus:true,
        userinfo:[],
      }
    },
    created:function(){
      if(null!=localStorage.getItem(this.$store.state.user.userInfo.uid)){
        this.userinfo=JSON.parse(localStorage.getItem(this.$store.state.user.userInfo.uid));
        console.log(this.userinfo);
      }
    },
    methods:{
      clearDrafts(){
        const h = this.$createElement;
        this.$msgbox({
          title: '系统提示',
          message: h('p', null, [
            h('span', null, '移除所有吗'),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  localStorage.removeItem(this.$store.state.user.userInfo.uid);
                  this.$router.push({name:'Personal'})
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          this.$message({
            type: 'info',
            message: '草稿箱: 暂无草稿'
          });
        });
      },
      removes(index) {
        this.userinfo.splice(index,1);
        if(0==this.userinfo.length){
          localStorage.removeItem(this.$store.state.user.userInfo.uid)
          this.$message({
            type: 'info',
            message: '草稿箱: 暂无草稿'
          });
          this.$router.push({name:'Personal'})
        }


      },
    }
  }
</script>

<style scoped>
  .menus{
    float: left;
    margin-top: 100px;
    margin-left: 20px;
    width: 32%;
  }
</style>
