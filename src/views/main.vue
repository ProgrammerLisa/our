<template>
  <el-container class="main-layout">
    <el-container>
      <el-header ref="header">
        <head-content></head-content>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headContent from '@/components/bootstrap-head-content'

export default {
  name: '',
  components: { headContent },
  created() {
  },
  mounted () {
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
.main-layout {
  height: 100%;
  position: relative;

  .el-aside {
    background: #333333;
  }

  .el-header {
    // background: #545c64;
    background: #222222;
    color: #fff;
    box-shadow: 0 0 5px rgba(33,33,33,0.1);
    padding: 0;
  }

  .el-main {
    background: #F7F7F7;
    & + div {
      background: #FFFFFF;
    }
    padding: 0;
  }

}
</style>
