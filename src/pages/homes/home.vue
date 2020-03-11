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
        <echarts-display/>
      </section>
    </div>
    <HomeFoot/>
  </div>
</template>
<script>
  import HomeHeader from '@/common/header/Header.vue'
  import HomeAside from '@/common/aside/aside'
  import HomeFoot from '@/common/foot/Foot'
  import EchartsDisplay from '@/common/echarts/echarts'
  export default {
    name: 'home',
    components: {
      'HomeHeader':HomeHeader,
      'HomeAside':HomeAside,
      'HomeFoot':HomeFoot,
      'echarts-display': EchartsDisplay,
    },
    data() {
      return {

      }
    }
  }
</script>

<style>
</style>
