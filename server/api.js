const models = require('./db')
const express = require('express')
const router = express.Router()

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

// 创建(create) 读取(get) 更新(update) 删除(delete)

// 创建账号接口
router.post('/api/login/createAccount', (req, res) => {
  let newAccount = new models.Login({
    account: req.body.account,
    password: req.body.password
  })
  // 保存数据newAccount数据进mongoDB
  newAccount.save((err, data) => {
    if (err) {
      res.send({ status: { errCode: 500, message: err } })
    } else {
      res.send({ status: { errCode: 200 }, data: data })
    }
  })
})
// 获取已有账号接口
router.post('/api/login', (req, res) => {
  const account = req.body.account
  const password = req.body.password
  if (!account || account === '') {
    res.send({ status: { errCode: 500, message: '用户名不能为空' } })
    return
  }
  if (!password || password === '') {
    res.send({ status: { errCode: 500, message: '密码不能为空' } })
    return
  }
  // 通过模型去查找数据
  models.Login.find({ account: account }, (err, data) => {
    if (err) {
      res.send({ status: { errCode: 404, message: err } })
    } else {
      if (data.length > 0) {
        models.Login.find({ account: account, password: password }, (errs, datas) => {
          if (datas.length > 0) {
            res.send({ status: { errCode: 200 }, data: '登陆成功' })
          } else {
            res.send({ status: { errCode: 500, message: '密码错误' } })
          }
        })
      } else {
        res.send({ status: { errCode: 500, message: '用户不存在' } })
      }
    }
  })
})

module.exports = router
