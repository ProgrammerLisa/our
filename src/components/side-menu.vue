<template>
  <div class="side-menu">

    <div class="logo"></div>
    <el-menu :default-active="activeMenu"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      background-color="#333333"
      text-color="#fff"
      router
      @close="handleClose">
      <div v-for="(m, i) in menu" :key="i">
        <div v-if="m.showInMenu">
          <el-submenu v-if="m.children.length>1" :index="m.name">
            <template slot="title">
              <i :class="m.meta.icon"></i>
              <span slot="title">{{ m.meta.title }}</span>
            </template>
            <div v-for="s in m.children"  :key="s.name">
              <el-menu-item :index="s.name" v-if="s.showInMenu">
                {{ s.meta.title }}
              </el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item :index="m.children[0].name" v-else-if="m.children[0].showInMenu">
            <i :class="m.meta.icon"></i>
            <span slot="title">{{ m.meta.title }}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>

  </div>
</template>

<script>
import { setTimeout } from 'timers';

export default {
  name: '',
  data() {
    return {
      activeMenu: '',
      menu: ''
    }
  },
  async created () {
    let showInMenu, childItem, isShow
    this.menu = this.$store.getters.menu.map(items => {
      showInMenu = this.hasPermission(items.name)
      childItem = items.children.map(item => {
        isShow = this.hasPermission(item.name)
        return { ...item, showInMenu: isShow }
      })
      return { ...items, children: childItem, showInMenu: showInMenu }
    })
  },
  watch: {
    '$route': {
      handler: function(val) {
        this.activeMenu = val.name
      },
      immediate: true
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>

<style lang="less" scoped>
.side-menu {
  .logo {}
  .el-menu {
    border-right: none;
  }
  .iconfont{
    font-size: 1.25rem;
    margin-right: .5rem;
  }
  .el-submenu__title i,.iconfont {
    color: #eee;
  }
  .el-submenu .el-menu-item{
    text-align: center;
  }
}
</style>
