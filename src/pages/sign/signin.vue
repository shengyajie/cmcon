<template>
  <div class="wrapper">
    <HomeHeader/>
    <HomeAside/>
    <div class="content-wrapper">


        <!--flex弹性盒子模型，justify-content：主抽 -->
        <section class="content">
          <div class="register-wrapper">
            <div id="register">
              <p class="title">登录</p>
              <el-form>
                <el-form-item  class="sign"   label="用户名：">
                  <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item  class="sign"  label="密码：">
                  <el-input type="password" v-model="user.password" placeholder="请输入密码" @keydown.enter.native="doLogin"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button style="width: 300px" type="primary" @click="doLogin">登录</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </section>
    </div>
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
      'HomeHeader': HomeHeader,
      'HomeAside': HomeAside,
      'HomeFoot': HomeFoot,
    },

      data() {
        return{
          user:{
            username:'zhangsan',
            password:'123',
          }
        }
      },
      methods:{
        doLogin(){//一点击登录按钮，这个方法就会执行
          alert(JSON.stringify(this.user))//可以直接把this.user对象传给后端进行校验用户名和密码
        }
      }
  }
</script>

<style scoped>
  .loading-wrapper {
    position: fixed;
    top: 0px;
    right: 0;
    left: 0;
    background: #aedff8;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .register-wrapper img {
    position: absolute;
    z-index: 1;
  }
  .register-wrapper {
    position: fixed;
    align-items: center;
    right: 0;
    left: 0;
  }
  #register {
    max-width: 340px;
    margin: 60px auto;
    background: #fff;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 9;
  }
  .title {
    font-size: 26px;
    line-height: 50px;
    font-weight: bold;
    margin: 10px;
    text-align: center;
  }

  label {
    display: none;
  }
  .sign{
    flex-direction: row;
  }

  label{
    padding: 0;
  }
</style>
