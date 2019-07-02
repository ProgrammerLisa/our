import Main from '@/views/main.vue'
/*
 ** notShowInMenu: 不显示在菜单上
 ** parentName:
 ** ifBreadCrumbCustom: 是否需要自定义面包屑，规则可以在 side-menu 组件中写，主要思想是利用 Vuex 将需要自定义的信息保存起来，然后在路由进入时判断该字段即可
 */

const router = [
  // 不需要鉴权也不需要登录，像 login
  { path: '/login', name: 'login', component: resolve => require(['@/views/login.vue'], resolve) },
  // { path: '/main', name: 'main', component: resolve => require(['@/views/main.vue'], resolve) },
  {
    path: '/main',
    name: 'main',
    component: Main,
    children: [
      { path: '/home', name: 'home', meta: { title: '首页' }, component: resolve => require(['@/views/home.vue'], resolve) },
      { path: '/character', name: 'character', meta: { title: '个人简介' }, component: resolve => require(['@/views/character.vue'], resolve) },
      { path: '/goal', name: 'goal', meta: { title: '目标' }, component: resolve => require(['@/views/goal.vue'], resolve) },
      { path: '/opinion', name: 'opinion', meta: { title: '意见' }, component: resolve => require(['@/views/opinion.vue'], resolve) },
      { path: '/empty', name: 'empty', meta: { title: '个人简介' }, component: resolve => require(['@/views/empty.vue'], resolve) },
      { path: '/socket', name: 'socket', meta: { title: '聊天室' }, component: resolve => require(['@/views/socket'], resolve) }
    ]
  },
  // 应用的路由，渲染菜单
  // 需要登录不需要鉴权，像欢迎页，错误页面等
  // {
  //   path: '/error',
  //   name: 'error',
  //   meta: {},
  //   notShowInMenu: true,
  //   component: Main,
  //   children: [
  //   ]
  // }
  { path: '/401', name: 'error_401', meta: { title: '没有访问权限的地址' }, notShowInMenu: true, component: resolve => require(['@/views/error-page/401.vue'], resolve) },
  { path: '/*', name: '404', meta: { title: '页面不存在' }, notShowInMenu: true, component: resolve => require(['@/views/error-page/404.vue'], resolve) }
]

export default router
