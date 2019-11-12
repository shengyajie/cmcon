<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <h1>
          <small>众包公司员工异常生产数据预警 >><b>整体分析</b></small>
        </h1>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="row">
          <div class="col-md-6">
            <div id="main" style="width: 1000px;height:600px;"></div>
          </div>
        </div>
      </section>
    </div>
    <HomeFoot/>
  </div>
</template>
<script>
  var echarts = require('echarts');
  var myChart = echarts.init(document.getElementById('main'));
  import HomeHeader from '@/common/header/Header.vue'
  import HomeAside from '@/common/aside/aside'
  import HomeFoot from '@/common/foot/Foot'
  export default {
    name: 'example',
    components: {
      'HomeHeader': HomeHeader,
      'HomeAside': HomeAside,
      'HomeFoot': HomeFoot,
    },
    data() {
      return {}
    }
  }
  var option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line'
    }]
  }

  myChart.setOption(option);
</script>

<style>

</style>
