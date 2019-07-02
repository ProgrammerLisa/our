<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand"><img class="navbar-logo" :src="logo" /></a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" 
        >
        <ul class="nav navbar-nav">
          <li v-for="(n, index) in navList" :key="index">
            <router-link :to="n.path" tag="a" :class="n.className">{{n.title}}</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">登录</a></li>
          <li><a href="#">注册</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>
<script>
import logo from '@/assets/img/dingdong/logo2.jpg'
export default {
  data () {
    return {
      logo: logo,
      navList: [
        { title: '首页', path: '/home', className: 'active' },
        { title: '个人中心', path: '/opinion', className: '' },
        { title: '俄罗斯方块', path: '/goal', className: '' },
        { title: '名人堂', path: '/opinion', className: '' },
        { title: '聊天室', path: '/socket', className: '' }
      ]
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped lang="less">
  .navbar {
    margin: 0;
    border: none;
    z-index: 999;
    .navbar-nav > li > a {
      line-height: 30px;
    }
    .navbar-nav > li:hover {
      background: #111;
      transition: 0.5s;
    }
    .navbar-brand {
      padding: 0;
    }
    .navbar-logo {
      height: 60px;
    }
  }
</style>
