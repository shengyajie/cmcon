<template>
<aside class="main-sidebar">
  <section class="sidebar">
    <ul class="sidebar-menu" data-widget="tree" id="sidebar">
      <li class="active"><a href="#"><span>整体分析</span></a></li>
      <li><a href="#"> <span>自营</span></a></li>
      <li><a href="#"><span>鸿联</span></a></li>
      <li><a href="#"><span>本地科慧</span></a></li>
      <li><a href="#"><span>肇庆科慧</span></a></li>
      <li><a href="#"><span>博岳</span></a></li>
      <li><a href="#"><span>点动</span></a></li>
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
