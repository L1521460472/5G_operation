import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import NotFound from '@/components/404'
import { getCookie } from '../public'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login,
    // },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: '/Home',
      name: 'Home',
      component: ()=>import('../components/Home.vue'),
      children:[
        // 首页
        {
          path: '/homepage',
          name: 'homepage',
          component: ()=>import('../components/homepage.vue')
        },
        // 用户
        // 企业账户
        {
          path: '/businessAccount',
          name: 'businessAccount',
          component: ()=>import('../components/User/businessAccount.vue')
        },
        // 企业应用
        {
          path: '/enterpriseApp',
          name: 'enterpriseApp',
          component: ()=>import('../components/User/enterpriseApp.vue')
        },
        // 审核
        // 企业审核
        {
          path: '/enterpriseAudit',
          name: 'enterpriseAudit',
          component: ()=>import('../components/Audit/enterpriseAudit.vue')
        },
        // 模板审核
        {
          path: '/templateAudit',
          name: 'templateAudit',
          component: ()=>import('../components/Audit/templateAudit.vue')
        },
        // 插件审核
        {
          path: '/pluginAudit',
          name: 'pluginAudit',
          component: ()=>import('../components/Audit/pluginAudit.vue')
        },
        // 素材审核
        {
          path: '/materialAudit',
          name: 'materialAudit',
          component: ()=>import('../components/Audit/materialAudit.vue')
        },
        // 统计报表
        {
          path: '/statisticalReport',
          name: 'statisticalReport',
          component: ()=>import('../components/statistics/statisticalReport.vue')
        },
        { // 企业账单
          path: '/businessBill',
          name: 'businessBill',
          component: () => import('../components/Bill/businessBill.vue')
        },
        { // 收支管理
          path: '/incomeManage',
          name: 'incomeManage',
          component: () => import('../components/Bill/incomeManage.vue')
        },
        { // 到账管理
          path: '/accountManage',
          name: 'accountManage',
          component: () => import('../components/Bill/arriveManage.vue')
        },
        { // rcs消息追踪
          path: '/message',
          name: 'rcsMessage',
          component: () => import('../components/Message/rcsMessage.vue')
        },
        { // sms消息追踪
          path: '/smsMessage',
          name: 'smsMessage',
          component: () => import('../components/Message/smsMessage.vue')
        },
        { // vms消息追踪
          path: '/vmsMessage',
          name: 'vmsMessage',
          component: () => import('../components/Message/vmsMessage.vue')
        },
        // 套餐审核
        // {
        //   path: '/packageAudit',
        //   name: 'packageAudit',
        //   component: ()=>import('../components/Audit/packageAudit.vue')
        // },
        // 资费
        //资费套餐
        // {
        //   path: '/package',
        //   name: 'package',
        //   component: ()=>import('../components/Tariff/package.vue')
        // },
        //资费项
        // {
        //   path: '/tariff',
        //   name: 'tariff',
        //   component: ()=>import('../components/Tariff/tariff.vue')
        // },
        //通道
        //通道组
        {
          path: '/channelGroup',
          name: 'channelGroup',
          component: ()=>import('../components/Channel/channelGroup.vue')
        },
        //通道资源
        // {
        //   path: '/channelResources',
        //   name: 'channelResources',
        //   component: ()=>import('../components/Channel/channelResources.vue')
        // },
        //通道管理
        {
          path: '/channelManage',
          name: 'channelManage',
          component: ()=>import('../components/Channel/channelManage.vue')
        },
        //签名管理
        {
          path: '/signatureManage',
          name: 'signatureManage',
          component: ()=>import('../components/Channel/signatureManage.vue')
        },

        //账户
        // 基本信息
        {
          path: '/baseInfo',
          name: 'baseInfo',
          component: ()=>import('../components/Account/baseInfo.vue')
        },
        // 密码设置
        {
          path: '/seetingPass',
          name: 'seetingPass',
          component: ()=>import('../components/Account/seetingPass.vue')
        },
        // 操作日志
        {
          path: '/operationLog',
          name: 'operationLog',
          component: ()=>import('../components/Account/operationLog.vue')
        },
        //  超频管理
        {
          path: '/overclock',
          name: 'overclock',
          component: ()=>import('../components/safe/overclock.vue')
        },
        //设置
        // 账户管理
        {
          path: '/accountManagement',
          name: 'accountManagement',
          component: ()=>import('../components/Seeting/accountManagement.vue')
        },
        // 角色管理
        {
          path: '/roleManagement',
          name: 'roleManagement',
          component: ()=>import('../components/Seeting/roleManagement.vue')
        },
        //资料
        // 业务资料
        {
          path: '/businessMaterial',
          name: 'businessMaterial',
          component: ()=>import('../components/Material/businessMaterial.vue')
        },
        {
          path: '/sectionManage',
          name: 'sectionManage',
          component: ()=>import('../components/Material/sectionManage.vue')
        },
        //基础设置
        // 菜单按钮管理
        {
          path: '/menuButton',
          name: 'menuButton',
          component: ()=>import('../components/BaseSeeting/menuButton.vue')
        },
        // 字典管理
        // {
        //   path: '/dictionaries',
        //   name: 'dictionaries',
        //   component: ()=>import('../components/BaseSeeting/dictionaries.vue')
        // },

      ]
    }
  ]


const router = new Router({
  // mode: 'history', // 打包的时候有这句的删掉，没有就不用管
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  //获取用户权限信息，为空即没登录，跳转至登录页
  const token = sessionStorage.getItem('enterprisePass')
  if (to.path === '/') {
    if (token) {
      next('/homepage')
    } else {
      next()
    }
    // next()
  } else {
    if (!token) {
      next('/');
    } else {
      next();
    }
  }
  next()
});

export default router
