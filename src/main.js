// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
//AdminLTE

import './assets/css/AdminLTE.min.css'
import './assets/css/skins/_all-skins.min.css'
import './assets/css/skins/skin-blue.min.css'
// import './assets/js/app.min.js'
// import './assets/fastclick/fastclick.min.js'
// import './assets/slimScroll/jquery.slimscroll.min.js'
//引入font-awesome
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
