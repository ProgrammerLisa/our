import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import Router from 'vue-router'
import { Notification } from 'element-ui'
import privateConfig from '@/../config'
import store from '@/store'
import routes from '@/router/routers'

export const router = new Router({
  routes
})

const apiPath = privateConfig.prod ? privateConfig.prodApiHost + privateConfig.apiPath : privateConfig.apiPath

axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  NProgress.done()
  if (response.status === 200 || response.status === 304) {
    if (response.data.status.errCode === 200) {
      return {
        code: response.data.status.errCode,
        data: response.data.data,
        err: response.data.status.message
      }
    } else {
      return {
        code: response.data.status.errCode,
        err: response.data.status.message
      }
    }
  } else {
    return {
      code: response.data.status.errCode,
      err: response.data.status.message
    }
  }
}

function checkCode (res, disNotice) {
  if (res.code === 506) {
    // 清除 store 信息
    store.commit('clearPermission')
    store.commit('clearMenuList')
    store.commit('clearUser')
    router.push({ name: 'login', replace: true })
    router.go(0)
  } else if (res.code !== 200) {
    if (!disNotice) {
      Notification.error({ title: '警告', message: `${res.err}` })
    }
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: apiPath + url,
      data: qs.stringify(data),
      timeout: 30000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  postJson (url, data) {
    return axios({
      method: 'post',
      url: apiPath + url,
      data: data,
      timeout: 1000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8'
      }
    }).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url: apiPath + url,
      params,
      timeout: 30000,
      withCredentials: false,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(checkStatus).then(checkCode)
  },
  getBlob (url, params) {
    return axios({
      method: 'get',
      url: apiPath + url,
      params,
      timeout: 30000,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'blob'
    }).then(res => {
      return res
    })
  }
}
