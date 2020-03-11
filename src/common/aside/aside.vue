<template>
<aside class="main-sidebar">
  <section class="sidebar">
    <ul class="sidebar-menu" data-widget="tree" id="sidebar">
      <li class="active"><router-link to="/"><span>整体分析</span></router-link></li>
      <li><router-link to="/boyue-detail"><span>科室及团队</span></router-link></li>
      <li><router-link to="/zqkehui-detail"><span>班组</span></router-link></li>
      <li><router-link to="/Hlian-detail"><span>个人累计</span></router-link></li>
      <li><router-link to="/kehui-detail"><span>其他</span></router-link></li>


    </ul>
    <!-- /.sidebar-menu -->
  </section>
  <!-- /.sidebar -->
</aside>
</template>
<script>
  $(function () {
    $("#sidebar li").click(function () {
      $(this).siblings("li").removeClass("active");//删除其他兄弟元素的样式
      $(this).addClass("active");//添加当前元素的样式
    })
    $("li").click(function(){
      var type=paraseInt($(this).val());//获取当前点击的li标签当前的value值
      $.ajax({
        url:"",
        type:"post",
        data:{type:type},
        dataType:"json",
        success:function (resp) {
          alert(resp.data);
        }
      });
    })
  })
</script>
