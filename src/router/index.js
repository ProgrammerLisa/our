import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
// import Cookie from 'js-cookie'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes
})

// const LOGIN_PAGE_NAME = 'login'
// 白名单--不需要鉴权
// const WHITE_LIST = ['error_401', '404', 'login', 'main']
// 黑名单--只能通过页面按钮访问，不能通过地址栏访问，需要带参数的页面，并且需要登录+权限，不显示在左侧菜单
const BLACK_LIST = ['character']

router.beforeEach((to, from, next) => {
  // const user = store.state.user.userInfo.name
  // 这里做一些登录、权限的验证
  if (to.path === '/' || to.path === '/main') {
    // 已登录访问登录页或者路由为/时，重定向至首页
    next({ path: '/home' })
  } else {
    // 如果在黑名单中
    if (BLACK_LIST.includes(to.name)) {
      // 判断store存的路径是否和路由路径一致  避免用户在地址栏直接进入详情 导致无id 请求失败
      // 可以刷新详情页并不会进入401
      if (store.state.app.blackMenu.path === to.path) {
        next()
      } else {
        next({ name: 'error_401' })
      }
    } else {
      next()
    }
  }
})

// 浏览器标题
router.afterEach(to => {
  document.title = to.meta.title || '博客'
  window.scrollTo(0, 0)
})
