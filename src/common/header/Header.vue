<template>
<header class="main-header">
  <!-- Logo -->
  <a href="index2.html" class="logo">
    <span class="logo-lg"><b>中移在线</b></span>
  </a>
  <!-- Header Navbar -->
  <nav class="navbar navbar-static-top" role="navigation">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>
    <div class="navbar-nav ml-auto">
      <li><router-link to="/signin"><span>登录&nbsp&nbsp&nbsp</span></router-link></li>
      <li><router-link to="/signup"><span>注册</span></router-link></li>

    </div>
  </nav>

</header>
</template>
<style>
  .navbar-nav{
    display: flex;
    flex-direction: row;
  }
.ml-auto a:link{
  color: white;
  }
  .ml-auto a:visited{
    color: white;
  }
  .ml-auto a:hover{
    color: white;
  }
  .ml-auto a:active{
    color: white;
  }
</style>
