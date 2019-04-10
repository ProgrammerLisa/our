import request from '../utils/request'
// 登录
export default {
  login (obj) {
    return request.post('/api/login', obj)
  }
}
