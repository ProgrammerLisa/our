<template>
  <div class="m-login">
    <div class="title">博客登录</div>
    <div class="content">
      <div class="login-form">
        <el-form label-width="0" :model="loginForm" ref="loginForm" :rules="rules">
          <el-form-item prop="account">
            <input type="password" style="position: absolute; z-index:-1"/>
            <el-input v-model="loginForm.account" type="text" autocomplete="off" placeholder="用户名" @keyup.enter.native="handleLogin('loginForm')"></el-input>
          </el-form-item>
          <el-form-item class="five-bottom" prop="password">
            <el-input v-model="loginForm.password" autocomplete="off" type="password" placeholder="密码" @keyup.enter.native="handleLogin('loginForm')"></el-input>
          </el-form-item>
          <el-form-item class="login-button">
            <el-button type="primary" @click="handleLogin('loginForm')">登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/login'
import { Message, Notification } from 'element-ui';
import { async } from 'q';

export default {
  data () {
    return {
      loginForm: {
        account: null,
        password: null
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      labelWidth: '110px'
    }
  },
  created() {

  },
  methods: {
    async handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginUser()
        } else {
          return false
        }
      })
    },
    async loginUser () {
      const { code, data } = await api.login(this.loginForm)
      if (code === 200) {
        // this.$store.commit('setPermission', data.permisssionKey)
        this.$store.commit('setUser', { name: this.loginForm.account, id: this.loginForm.account, avatar: '' })
        this.$router.replace({ name: 'main' })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.m-login {
  width: 100vw;
  height: 100vh;
  // background: url("../../assets/img/login.svg") no-repeat center;
  background: -webkit-linear-gradient(left, #28b0ca, #668955);
  background-size:cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .title{
    font-size: 20px;
    font-weight: bold;
    color: #323232;
    margin-bottom: 20px;
    text-shadow: 3px 3px #ccc;
  }
  .content {
    width: 350px;
    text-align: center;
    color: white;

    .five-bottom.el-form-item{
      margin-bottom: 5px;
    }
    .text-right{
      text-align: right;
    }
    .el-alert {
      margin-bottom: 28px;
    }

    .login-form {
      padding: 40px 30px;
      background: rgba(255,255,255,0.30);
      box-shadow: 3px 3px 4px 5px rgba(113,116,121,0.1);
      border-radius: 10px;

      .login-button{
        .el-button{
          width: 100%;
        }
      }
    }
  }
}
</style>
