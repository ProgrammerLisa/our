import routes from '@/router/routers'

const app = {
  state: {
    // menu
    menuList: [],
    // permission
    permissionList: [],
    /* breadcrumb
         ** 保存加入到面包屑中的内容
         ** @name: 讲师名字
         ** @path: 地址
         ** @id: 讲师id
         */
    objAddBreadCrumb: {
      name: '',
      path: '',
      id: ''
    },
    // 保存详情页信息，使详情页可刷新
    blackMenu: {
      path: '',
      id: ''
    }
  },
  mutations: {
    // permission
    setPermission (state, val) {
      state.permissionList = val
    },
    clearPermission (state) {
      state.permissionList = []
    },
    // menu
    setMenuList (state) {
      const list = []
      routes.forEach(n => {
        if (!n.notShowInMenu) {
          list.push(n)
        }
      })
      list.forEach(l => {
        if (l.children) {
          l.children = l.children.filter(m => !m.notShowInMenu)
        }
      })
      state.menuList = list
    },
    clearMenuList (state) {
      state.menuList = []
    },
    // breadcrumb
    setObjAddBreadcrumb (state, val) {
      state.objAddBreadCrumb = val
    },
    clearObjAddBreadcrumb (state) {
      state.objAddBreadCrumb = { name: '', path: '', id: '' }
    },
    // blackMenu
    setBlackMenu (state, val) {
      state.blackMenu = val
    },
    clearBlackMenu (state) {
      state.blackMenu = { path: '', id: '' }
    }
  },
  actions: {},
  getters: {
    breadCrumbObj: state => state.objAddBreadCrumb,
    permissions: state => state.permissionList,
    menu: state => state.menuList,
    black: state => state.blackMenu
  }
}

export default app
