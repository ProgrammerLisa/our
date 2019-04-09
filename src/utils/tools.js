import Vue from 'vue'
import ElementUI from 'element-ui'

Vue.use(ElementUI)

const vue = new Vue()

// 辅助通用方法
const regexp = {
  numberAndLetter: /^[0-9a-zA-Z]*$/, // 账号，可以为数字和字母
  phoneOrEmail: /(^1[34578]{1}\d{9}$)|(^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$)/,
  phone: /^1[34578]{1}\d{9}$/, // 手机号
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, // 邮箱地址
  integer: /^(0|[1-9][0-9]*)$/, // 是否整数
  number: /^\d*$/, // 是否数字
  letter: /^[a-zA-Z]*$/, // 纯字母
  // qq: /^[1-9][0-9]{4,9}$/gim,
  chinese: /[\u4e00-\u9fa5]/, // 是否中文
  code: /^[1-9]\d{5}$/g, // 邮政编码
  IdCard: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, // 身份证
  pwd: /^[_a-zA-Z0-9]+$/, // 密码(包含数字字母大小写下划线)
  pwdStartWithLetter: /^[a-zA-Z]+[0-9a-zA-Z]*$/, // 密码首位为字母
  pwdStartWithUpperCase: /^[A-Z]+[0-9a-zA-Z]*$/, // 密码首字母为大写字母
  ip: /(\d+)\.(\d+)\.(\d+)\.(\d+)/, // ip地址
  newPassword: /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/,
  // newPassword: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/, // 数字+字母大小写 8-16位
  password: /^[0-9a-zA-Z]{8,16}$/ // 数字/字母大小写 8-16位
}

export default {
  regexp: regexp,
  // 格式化秒数
  formatSeconds (seconds) {
    return [
      parseInt(seconds / 60 / 60),
      parseInt(seconds / 60 % 60),
      parseInt(seconds % 60)
    ].join(':').replace(/\b(\d)\b/g, '0$1')
  },
  // 格式化日期时间
  formatDate (date, separator, ifHaveTime) {
    date = new Date(date)
    separator = separator || '/'
    // timeDelimiter = timeDelimiter || ':'
    ifHaveTime = ifHaveTime || false

    function addZero (val) {
      if (+val < 10) {
        return '0' + val
      }
      return val
    }
    let str = ''
    str = date.getFullYear() + separator + addZero(date.getMonth() + 1) + separator + addZero(date.getDate())
    if (ifHaveTime) {
      str += ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds())
    }
    return str
  },
  // 验证，使用了Notify组件作为错误提示
  validate (val, type, msg) {
    try {
      if (!regexp[type].test(val)) {
        vue.$notify.error({ title: '提示', message: msg })
      }
      return regexp[type].test(val)
    } catch (err) {
      vue.$notify.error({ title: '警告', message: '验证程序出错' })
      return false
    }
  },
  // 金额格式化，每三位数字用逗号隔开，并取两位小数
  money (value) {
    const val = (value / 1).toFixed(2)
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  // 数量格式化，每三位数字用逗号隔开
  num (value) {
    const val = value / 1
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  // 数组去重
  deleteRepeat (array) {
    return [...new Set(array)]
  },
  // 数组排序
  rangeArray (array) {
    let allNumber = true
    array.forEach((item) => {
      if (typeof +item !== 'number') {
        allNumber = false
      }
    })
    if (!allNumber) {
      return false
    }
    return array.sort((a, b) => {
      return a - b
    })
  },
  /*
     ** 验证密码
     ** pwd：密码，length：密码长度 {min: 1, max: 20} 默认1-20
     ** type：类型 1：纯数字；2：纯字母；3：数字加字母；4：数字加字母，首位必须字母；5：数字加字母，首位必须大写字母。 默认 type = 1
     */
  validatePwd (pwd, length, type, msg) {
    console.log(pwd, length, type, msg)
    // try {
    //   if (type === 1) {
    //     validate(pwd, 'number', msg)
    //   } else if (type === 2) {
    //     validate(pwd, 'letter', msg)
    //   } else if (type === 3) {
    //     validate(pwd, 'numberAndLetter', msg)
    //   } else if (type === 4) {
    //     validate(pwd, 'pwdStartWithLetter', msg)
    //   } else {
    //     validate(pwd, 'pwdStartWithUpperCase', msg)
    //   }
    // } catch (err) {
    //   return false
    // }
  }
}
