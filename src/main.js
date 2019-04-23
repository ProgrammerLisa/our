import Vue from 'vue'
import App from './App.vue'
import { router } from './router/index'
import ElementUI from 'element-ui'
import api from './utils/request'
import store from './store'
import { hasPermission } from './router/permissions'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/app.less'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
// import './assets/scss/elementui-theme.scss'

Vue.use(ElementUI)

Vue.prototype.api = api
Vue.prototype.hasPermission = hasPermission
Vue.config.productionTip = false

new Vue({
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
