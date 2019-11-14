<template>
  <div class="container">
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          酒水饮食
        </div>
        <div id="drink" class="chart-content">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          肉类饮食
        </div>
        <div id="meat" class="chart-content">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          蔬菜饮食
        </div>
        <div id="vegetable" class="chart-content">
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card  class="chart-box">
        <div slot="header">
          运动规律
        </div>
        <div id="sports" class="chart-content">

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
        drink: null,
        meat: null,
        vegetable: null,
        sports: null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.drawColumnChart()
        this.drawLineChart()
        this.drwaPieChart()
        this.drawRadar()
      },
      drawColumnChart() {
        this.drink = echarts.init(document.getElementById('drink'))
        this.drink.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          legend: {
            data: ['蒸发量', '降水量', '平均温度']
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '水量',
              min: 0,
              max: 250,
              interval: 50,
              axisLabel: {
                formatter: '{value} ml'
              }
            },
            {
              type: 'value',
              name: '温度',
              min: 0,
              max: 25,
              interval: 5,
              axisLabel: {
                formatter: '{value} °C'
              }
            }
          ],
          series: [
            {
              name: '蒸发量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '降水量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '平均温度',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        })
      },
      drawLineChart() {
        this.meat = echarts.init(document.getElementById('meat'))
        this.meat.setOption({
          backgroundColor: '#fff',
          title: {
            text: '',
            subtext: '单位：个'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 9
              }
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              textStyle: {
                fontSize: 10
              }
            }
          },
          series: [
            {
              name: '',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [{
                    offset: 0,
                    color: '#4EADCE'
                  }, {
                    offset: 0.5,
                    color: '#AF76E8'
                  }, {
                    offset: 1,
                    color: '#F1C270'
                  }])
                }
              }
            }]
        })
      },
      drwaPieChart() {
        this.vegetable = echarts.init(document.getElementById('vegetable'))
        this.vegetable.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: ['蛋白质', '脂肪', '碳水化合物', '钠', '钙', '铁', '锌', '锰', '铜', '维生素']
          },
          series: [
            {
              name: '营养成分',
              type: 'pie',
              selectedMode: 'single',
              radius: [0, '30%'],

              label: {
                normal: {
                  position: 'inner'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                { value: 335, name: '蛋白质', selected: true },
                { value: 679, name: '脂肪' },
                { value: 1548, name: '碳水化合物' }
              ]
            },
            {
              name: '营养成分',
              type: 'pie',
              radius: ['40%', '55%'],
              label: {
                normal: {
                  formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                    a: {
                      color: '#999',
                      lineHeight: 22,
                      align: 'center'
                    },
                    hr: {
                      borderColor: '#aaa',
                      width: '100%',
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: '#eee',
                      backgroundColor: '#334455',
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: [
                { value: 335, name: '蛋白质' },
                { value: 310, name: '脂肪' },
                { value: 234, name: '碳水化合物' },
                { value: 135, name: '钠' },
                { value: 1048, name: '维生素' },
                { value: 251, name: '铁' },
                { value: 147, name: '锌' },
                { value: 102, name: '锰' }
              ]
            }
          ]
        })
      },
      drawRadar() {
        this.sports = echarts.init(document.getElementById('sports'))
        this.sports.setOption({
          tooltip: {},
          legend: {
            data: ['运动消耗', '能量摄取'],
            x: 'left'
          },
          radar: {
            name: {
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: '球类 (ball)', max: 6500 },
              { name: '游泳 (swim)', max: 16000 },
              { name: '田径 (track)', max: 30000 },
              { name: '登山 (climb)', max: 38000 },
              { name: '滑冰 (ice)', max: 52000 },
              { name: '举重 (lift)', max: 25000 }
            ]
          },
          series: [{
            name: '消耗 vs 摄取',
            type: 'radar',
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '运动消耗'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '能量摄取'
              }
            ]
          }]
        })
      }
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
