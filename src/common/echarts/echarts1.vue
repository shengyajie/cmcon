<template>
  <div class="container">
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          本地科慧
        </div>
        <div id="lckehui" class="chart-content">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          肇庆科慧
        </div>
        <div id="zqkehui" class="chart-content">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          鸿联
        </div>
        <div id="hlian" class="chart-content">

        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          博岳
        </div>
        <div id="boyue" class="chart-content">
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: 'Echarts',
    data() {
      return {
        lckehui: null,
        zqkehui: null,
        hlian: null,
        boyue:null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.lckehuiLineChart()
        this.zqkehuiChart()
        this.hlianChart()
        this.boyueChart()
      },
      lckehuiLineChart() {
        this.lckehui = echarts.init(document.getElementById('lckehui'))
        this.lckehui.setOption({
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '本地科慧',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 94, name: '满意度'}]
            }
          ]
        });
        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          myChart.setOption(option, true);
        },2000);
      },
      zqkehuiChart() {
        this.zqkehui = echarts.init(document.getElementById('zqkehui'))
        this.zqkehui.setOption({
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '肇庆科慧',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 94, name: '满意度'}]
            }
          ]
        });
        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          myChart.setOption(option, true);
        },2000);
      },
      hlianChart() {
        this.hlian = echarts.init(document.getElementById('hlian'))
        this.hlian.setOption({
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '鸿联',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 96, name: '满意度'}]
            }
          ]
        });
        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          myChart.setOption(option, true);
        },2000);
      },
      boyueChart() {
        this.boyue = echarts.init(document.getElementById('boyue'))
        this.boyue.setOption({
          tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
          },
          toolbox: {
            feature: {
              restore: {},
              saveAsImage: {}
            }
          },
          series: [
            {
              name: '博岳',
              type: 'gauge',
              detail: {formatter:'{value}%'},
              data: [{value: 96, name: '满意度'}]
            }
          ]
        });
        setInterval(function () {
          option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
          myChart.setOption(option, true);
        },2000);
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .container{
    width: 100%;
    .el-col-12{
      width: 50%
      padding: 2px
      .chart-box {
        margin-bottom: 10px;
      }
      .chart-content{
        min-width:400px;
        height:300px;
        margin-top:10px;
        z-index:3;
        text-align:center;
        line-height:300px;
      }
    }
  }
</style>
