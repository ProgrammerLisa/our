// 这个模块负责配置mongoDB相关东西
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true })

const db = mongoose.connection
db.once('error', () => console.log('Mongo connection error'))
db.once('open', () => console.log('Mongo connection success'))

// 定义模式
const loginSchema = mongoose.Schema({
  account: String,
  password: String
})

// 定义模型
const Models = {
  Login: mongoose.model('Login', loginSchema)
}

module.exports = Models
