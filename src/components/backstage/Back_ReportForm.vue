<template>
  <div>
    <el-select v-model="type" placeholder="请选择"
               style="margin-left: 1200px;margin-top: 50px"
                 @change="this.selectTrigger">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <div id="main" style="width: 500px;height: 400px;margin-top: 200px">
    </div>
    <div id="mains" style="width: 500px;height: 400px;margin-top:-400px;margin-left: 600px">
    </div>
    <div id="mainss" style="width: 500px;height: 400px;margin-top:-400px;margin-left: 1200px">
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Back_ReportForm',
    data(){
      return{
        type:'请选择 , 默认显示本月',
        options: [{
          value: '1',
          label: '本月记录'

        }, {
          value: '2',
          label: '本年记录'
        }],
        menuType:[],
        menuTypeVal:[],
        menus:[],
        menusVal:[],
        Income: {},
        value: ''
      }
    },
    methods:{
      selectTrigger(val) {
          this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormMenuTypesMonth').then(resp=>{
            this.menuType = []
            this.menuTypeVal = []
            this.menus = []
            this.menusVal = []
              for (let a = 0; a < resp.data.length; a++) {
                this.menuType[a] = resp.data[a].Mtname
                this.menuTypeVal[a] = resp.data[a].count
              }
            this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormMenuMonth').then(resp=>{
                for (let a=0;a<resp.data.length;a++){
                  this.menus[a] = resp.data[a].Mtname
                  this.menusVal[a] = resp.data[a].count
                }
              this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormIncomeMonth').then(resp=>{
                this.Income = {}
                  this.Income = resp.data
                  this.drawChart(this.menuType, this.menuTypeVal, this.menus, this.menusVal, this.Income)
                })
            })
          })
          if(val == 2){
          this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormMenuTypesYear').then(resp=>{
            this.menuType = []
            this.menuTypeVal = []
            this.menus = []
            this.menusVal = []
            for (let a=0;a<resp.data.length;a++){
              this.menuType[a] = resp.data[a].Mtname
              this.menuTypeVal[a] = resp.data[a].count
            }
            this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormMenuYear').then(resp=>{
              for (let a=0;a<resp.data.length;a++){
                this.menus[a] = resp.data[a].Mtnames
                this.menusVal[a] = resp.data[a].count
              }
              this.$axios.post('http://localhost:8080/cookbooktest/BackReportForm/ReportFormIncomeYear').then(resp=>{
                this.Income = {}
                this.Income = resp.data
                this.drawChart(this.menuType,this.menuTypeVal,this.menus,this.menusVal,this.Income)
              })
            })
          })
        }
      },
      drawChart(menuType,menuTypeVal,menus,menusVal,Income) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("main"));
        let myCharts = this.$echarts.init(document.getElementById("mains"));
        let myChartss = this.$echarts.init(document.getElementById("mainss"));
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: "菜谱分类热度"
          },
          tooltip: {},
          legend: {
            data: ["分类"]
          },
          xAxis: {
            //data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            data:menuType
          },
          yAxis: {},
          series: [
            {
              name: "分类",
              type: "bar",
              //data: [5, 20, 36, 10, 10, 20]
              data:menuTypeVal
            }
          ]
        };
        let options = {
          legend: {
            data: ["菜谱热度"]
          },
          xAxis: {
            type: 'category',
            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data:menus
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:"菜谱热度",
            //data: [820, 932, 901, 934, 1290, 1330, 1320],
            data:menusVal,
            type: 'line'
          }]
        };
        let optionTwo = {
          title: {
            text: 'income',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#bbb'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },

          visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          },
          series: [{
              name: '个体收入',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: Income.sort(function (a, b) { return a.value - b.value; }),
              roseType: 'radius',
              label: {
                color: 'rgba(23, 26, 23, 0.3)'
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(23, 26, 23, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              },
              itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },

              animationType: 'scale',
              animationEasing: 'elasticOut',
              animationDelay: function (idx) {
                return Math.random() * 200;
              }
            }
          ]
        };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        myCharts.setOption(options);
        myChartss.setOption(optionTwo);
      }
    },
    mounted () {
      this.selectTrigger();
      //this.drawChart(this.menuType,this.menuTypeVal,this.menus,this.menusVal,this.Income)
    },
  }
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
