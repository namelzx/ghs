import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

/* 路由模块*/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/manage-info',
    component: () => import('@/views/manage/info'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },

  {
    path: '/website/bolg/create',
    component: () => import('@/views/manage/rules'),
    meta: {title: '博客添加'},
    hidden: true
  },
  {
    path: '/bolg/edit/:id(\\d+)',
    component: () => import('@/views/manage/rules'),
    meta: {title: '博客修改'},
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: '/manage/admin',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {title: '概况', icon: 'dashboard', noCache: true}
      }
    ]
  },
  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/index',
    meta: {title: '账单查询', icon: 'pdf'},
    children: [
      {
        path: 'index',
        component: () => import('@/views/manage/rules'),
        name: 'bill',
        meta: {title: '账单查询'}
      },
      {
        path: 'toview/:id',
        component: () => import('@/views/dashboard/index'),
        name: 'toview',
        meta: {title: '查看账单'},
      }
    ]
  },
]

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
