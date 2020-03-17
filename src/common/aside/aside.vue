<template>
<aside class="main-sidebar"    background-color="#545c64">

<!--    <ul class="sidebar-menu"class="sidebar-menu data-widget="tree" id="sidebar">-->
<!--      <li class="active"><router-link to="/"><span>整体分析</span></router-link></li>-->
<!--      <li><router-link to="/boyue-detail"><span>科室及团队</span></router-link></li>-->
<!--      <li><router-link to="/zqkehui-detail"><span>班组</span></router-link></li>-->
<!--      <li><router-link to="/Hlian-detail"><span>个人累计</span></router-link></li>-->
<!--      <li><router-link to="/kehui-detail"><span>其他</span></router-link></li>-->


<!--</ul>-->
  <ul class="sidebar-menu" id="sidebar">
    <el-row class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="transparent"
        text-color="white"
        active-text-color="white"
        router>
        <el-submenu index="1">
          <template slot="title"><span>整体分析</span></template>
          <el-menu-item index="/" ><span>整体分析</span></el-menu-item>
        </el-submenu>
          <el-submenu index="2">
            <template slot="title"><span>科室及团队</span></template>
            <el-menu-item index="/xiaoneng" ><span>效能</span></el-menu-item>
            <el-menu-item index="/yingxiao"><span>质量</span></el-menu-item>
            <el-menu-item index="/zhiliang"><span>营销</span></el-menu-item>
          </el-submenu>
        <el-submenu index="3">
          <template slot="title"><span>班组</span></template>
          <el-menu-item index="/bxiaoneng"><span>效能</span></el-menu-item>
          <el-menu-item index="/byingxiao"><span>质量</span></el-menu-item>
          <el-menu-item index="/bzhiliang"><span>营销</span></el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><span>个人累计</span></template>
          <el-menu-item index="/gxiaoneng"><span>效能</span></el-menu-item>
          <el-menu-item index="/gyingxiao"><span>质量</span></el-menu-item>
          <el-menu-item index="/gzhiliang"><span>营销</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-row>
  </ul>
  <!-- /.sidebar -->
</aside>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
  // $(function () {
  //   $("#sidebar li").click(function () {
  //     $(this).siblings("li").removeClass("active");//删除其他兄弟元素的样式
  //     $(this).addClass("active");//添加当前元素的样式
  //   })
  //   $("li").click(function(){
  //     var type=paraseInt($(this).val());//获取当前点击的li标签当前的value值
  //     $.ajax({
  //       url:"",
  //       type:"post",
  //       data:{type:type},
  //       dataType:"json",
  //       success:function (resp) {
  //         alert(resp.data);
  //       }
  //     });
  //   })
  // })

  </script>
