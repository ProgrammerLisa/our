import request from '../utils/request'
// 登录
export default {
  Login (obj) {
    return request.postJson('/pf-api/admin/login', obj)
  },
  SendForgetCode (obj) {
    return request.postJson('/pf-api/admin/sendForgetCode', obj)
  },
  Add (obj) {
    return request.postJson('/pf-api/admin/create', obj)
  },
  ForgetPwd (obj) {
    return request.postJson('/pf-api/admin/forgetPwd', obj)
  }
}
