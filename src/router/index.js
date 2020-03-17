import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/homes/home"
import boyuedetail from "@/pages/detail/boyue-detail"
import kehuidetail from "@/pages/detail/kehui-detail"
import HLiandetail from "@/pages/detail/HLian-detail"
import zqkehuidetail from "@/pages/detail/zqkehui-detail"
import xiaoneng from "@/pages/detail/tuandui/xiaoneng"
import yingxiao from "@/pages/detail/tuandui/yingxiao"
import zhiliang from "@/pages/detail/tuandui/zhiliang"
import gxiaoneng from "@/pages/detail/reren/xiaoneng"
import gyingxiao from "@/pages/detail/reren/yingxiao"
import gzhiliang from "@/pages/detail/reren/zhiliang"
import bxiaoneng from "@/pages/detail/banzu/xiaoneng"
import byingxiao from "@/pages/detail/banzu/yingxiao"
import bzhiliang from "@/pages/detail/banzu/zhiliang"
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
    },
    {
      path:'/xiaoneng',
      name:"xiaoneng",
      component:xiaoneng
    }, {
      path:'/yingxiao',
      name:"yingxiao",
      component:yingxiao
    }, {
      path:'/zhiliang',
      name:"zhiliang",
      component:zhiliang
    },{
      path:'/gxiaoneng',
      name:"gxiaoneng",
      component:gxiaoneng
    }, {
      path:'/gyingxiao',
      name:"gyingxiao",
      component:gyingxiao
    }, {
      path:'/gzhiliang',
      name:"gzhiliang",
      component:gzhiliang
    },{
      path:'/bxiaoneng',
      name:"bxiaoneng",
      component:bxiaoneng
    }, {
      path:'/byingxiao',
      name:"byingxiao",
      component:byingxiao
    }, {
      path:'/bzhiliang',
      name:"bzhiliang",
      component:bzhiliang
    },

  ]
})
