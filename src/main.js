// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

//AdminLTE
import './assets/css/AdminLTE.min.css'
import './assets/css/skins/_all-skins.min.css'
import './assets/css/skins/skin-blue.min.css'


import './assets/js/fastclick/lib/fastclick.js'
import './assets/js/jquery.slimscroll.min.js'
//引入font-awesome
import 'font-awesome/css/font-awesome.min.css'
//引入jquery
import './assets/js/jquery.min.js'
//引入chart
import './assets/js/chart.js/Chart.js'



Vue.config.productionTip = false;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
