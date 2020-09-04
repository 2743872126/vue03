<template>
    <div>
      <MyVideo :videoSrc="urll" :pic="pic"></MyVideo>
    </div>
</template>

<script>
  import MyVideo from './MyVideo'
  export default {
    name: 'videoPlay',
    data(){
      return {
        urll:'',
        pic:'',
      }
    },
    created(){

      this.pic='static/video/'+this.$route.query.pic;
      this.urll='static/video/'+this.$route.query.surl;
    },
    components: {MyVideo}
  }
</script>

<style scoped>

</style>
