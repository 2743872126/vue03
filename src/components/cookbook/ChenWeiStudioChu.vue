<template>
  <div>
    <h1>成为美食作家</h1>
    <div>
      你需要支付2000入驻本网站
      可以发布视频客户赚钱
    </div>
    <div>
      {{pay}}
      <router-link :to="{name:'Tanwei_pay',query:{pay:this.$qs.stringify({'order_num':orderCode(),'bnbname':'cookbook','order_price':'2000'})}}" >
          走》》
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChenWeiStudioChu',
    data(){
      return {
      }
    },
    methods:{
      orderCode() {
        var orderCode='';
        for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
        {
          orderCode += Math.floor(Math.random() * 10);
        }
        orderCode = new Date().getTime() + orderCode;  //时间戳，用来生成订单号。
        console.log(orderCode)
        return orderCode;
      }
    }
  }
</script>

<style scoped>

</style>
