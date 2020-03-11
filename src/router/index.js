import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/homes/home"
import boyuedetail from "@/pages/detail/boyue-detail"
import kehuidetail from "@/pages/detail/kehui-detail"
import HLiandetail from "@/pages/detail/HLian-detail"
import zqkehuidetail from "@/pages/detail/zqkehui-detail"
import signin from "../pages/sign/signin";
import signup from "../pages/sign/signup";
// import table from "@/pages/detail/table"
Vue.use(Router)

export default new Router({
  routes: [
{
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/boyue-detail',
      name: 'boyuedetail',
      component: boyuedetail
    },{
      path: '/HLian-detail',
      name: 'HLiandetail',
      component: HLiandetail
    },{
      path: '/kehui-detail',
      name: 'kehuidetail',
      component: kehuidetail
    },{
      path: '/zqkehui-detail',
      name: 'zqkehuidetail',
      component: zqkehuidetail
    }, {
      path:'/signup',
      name:"signup",
      component:signup
    },
    {
      path:'/signin',
      name:"signin",
      component:signin
    }
  ]
})
