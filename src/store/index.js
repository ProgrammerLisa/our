import Vue from 'vue'
import Vuex from 'vuex'
// import app from './modules/app.js'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const modules = {}
// 自动注册./modules目录下面的js文件
const requireModule = require.context('./modules', false, /\.js$/)
requireModule.keys().forEach((fileName) => {
  const module = requireModule(fileName)
  fileName = fileName.replace(/(\.[\\/]|\.js)/g, '')
  modules[fileName] = module.default
})

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  getters: {},

  plugins: [createPersistedState()],

  modules
})

export default store
