<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <HomeFoot/>
  </div>
</template>
<script>
  import HomeHeader from '@/common/header/Header.vue'
  import HomeAside from '@/common/aside/aside'
  import HomeFoot from '@/common/foot/Foot'
  export default {
    name: 'home',
    components: {
      'HomeHeader':HomeHeader,
      'HomeAside':HomeAside,
      'HomeFoot':HomeFoot,
    },
    data() {
      return {

      }
    }
  }
</script>
<style>

</style>
