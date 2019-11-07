import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/homes/home"
import detail from "@/pages/detail/detail"
import table from "@/pages/detail/table"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/detail',
      name: 'detail',
      component: detail
    }, {
      path: '/table',
      name: 'table',
      component: table
    }
  ]
})
