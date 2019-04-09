<template>
  <div class="head-content">
    <div class="left">
      <el-menu background-color="#545c64"  active-text-color="#ffd04b" text-color="#fff" :default-active="active" class="el-menu-demo" mode="horizontal" @select="toPath">
        <el-menu-item index="1">首页</el-menu-item>
         <el-submenu index="2">
          <template slot="title">个人简介</template>
          <el-menu-item index="2-1">余莉莎</el-menu-item>
          <el-menu-item index="2-2">何叶</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">目标</el-menu-item>
        <el-menu-item index="4">意见</el-menu-item>
      </el-menu>
    </div>
    <div class="right">
      <div class="avatar"></div>
      <el-dropdown @command="handleCommand">
        <div class="user">{{ user.name }}</div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setSelf">个人设置</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { logout } from '@/api/login'
import { mapGetters } from 'vuex'

export default {
  name: '',
  data() {
    return {
      breadCrumbList: [],
      active: '1',
      pathList: [
        { id: '1', name: 'home', path: '/home' },
        { id: '2-1', name: 'empty', params: 'Lisa', path: '/character' },
        { id: '2-2', name: 'empty', params: 'Aw', path: '/character' },
        { id: '3', name: 'goal', path: '/goal' },
        { id: '4', name: 'opinion', path: '/opinion' },
      ]
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    // 路由变化重新设置面包屑
    '$route': {
      handler: function(val) {
        const active = this.pathList.filter(p => p.path === val.path)
        if (active.length > 0) {
          this.active = active[0].id
        }
        this.breadCrumbList = val.matched.map(n => { return { name: n.meta.title, path: n.path } })
      },
      immediate: true
    }
  },
  methods: {
    toPath (path) {
      const toPath= this.pathList.filter(p => p.id === path)
      this.$store.commit('setBlackMenu', { path: toPath[0].path, id: toPath[0].params })
      this.$router.push({ name: toPath[0].name, params: { name: toPath[0].params }})
    },
    handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      } else if (command === 'setSelf') {
        this.$router.push({ name: 'setSelf'})
      }
    },
    async logout () {
      const { code, data } = await logout()
      if (code === 200) {
        this.$store.commit('clearPermission')
        this.$store.commit('clearMenuList')
        this.$store.commit('clearUser')
        this.$router.push({ name: 'login', replace: true })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.head-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {}

  .right {
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 100%;
      // background-image: url(../assets/img/avater.svg);
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      // border: 2px solid #FFFFFF;
      margin-right: 15px;
    }

    .user {
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &:hover {
        color: #409EFF;
      }
    }

  }

}
</style>
