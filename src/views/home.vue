<template>
  <div class="home">
    <el-menu class="fixed-nav fixed-nav-left" collapse>
      <el-menu-item :index="index+1+''" v-for="(n, index) in navLeft" :key="'left' + index">
        <i :class="n.icon"></i>
        <span slot="title">{{n.title}}</span>
      </el-menu-item>
    </el-menu>
    <el-menu class="fixed-nav fixed-nav-right" collapse>
      <el-menu-item :index="index+1+''" v-for="(n, index) in navRight" :key="'right' + index">
        <i :class="n.icon"></i>
        <span slot="title">{{n.title}}</span>
      </el-menu-item>
    </el-menu>
    <div class="fixed-nav-content">
      <y-carousel-cars class="y-components"></y-carousel-cars>
      <y-topic class="y-components"></y-topic>
      <y-module-1 class="y-components"></y-module-1>
      <y-module-2 class="y-components"></y-module-2>
    </div>
  </div>
</template>
<script>
import { setTimeout, setInterval, clearInterval } from 'timers'
import carouselCard from './dingdong/home/carousel-card'
import topic from './dingdong/home/topic'
import module1 from './dingdong/home/module1'
import module2 from './dingdong/home/module2'
export default {
  components: {
    'y-carousel-cars': carouselCard,
    'y-topic': topic,
    'y-module-1': module1,
    'y-module-2': module2
  },
  data () {
    return {
      scrollTopNum: 0,
      navLeft: [
        { icon: 'el-icon-news', title: '热门分类', urlName: '' },
        { icon: 'el-icon-message', title: '收藏快讯', urlName: '' },
        { icon: 'el-icon-time', title: '叮咚微拍', urlName: '' },
        { icon: 'el-icon-bell', title: '钱币好物', urlName: '' },
        { icon: 'el-icon-menu', title: '邮票好物', urlName: '' },
        { icon: 'el-icon-rank', title: '收藏名家', urlName: '' },
        { icon: 'el-icon-setting', title: '新品先看', urlName: '' }
      ],
      navRight: [
        { icon: 'el-icon-service', title: '联系客服', urlName: '' },
        { icon: 'el-icon-share', title: '分享', urlName: '' },
        { icon: 'el-icon-star-on', title: '常逛论坛', urlName: '' },
        { icon: 'el-icon-caret-top', title: '返回顶部', urlName: '' }
      ]
    }
  },
  created () {
    const _this = this
    this.$nextTick(() => {
      _this.$on('windowInfo', (e) => {
        // console.log(e)
      })
    })
  },
  mounted () {
    // console.log(this.$refs.carouselComponent)
    
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    transition: 0.5s;
  }
  .home::-webkit-scrollbar {
    display: none;
  }
  .fixed-nav {
    position: fixed;
  }
  .fixed-nav-left {
    left: 0;
    top: 20%;
    transform: translate(-100%, 0);
  }
  .fixed-nav-right {
    right: 0;
    bottom: 0;
    transform: translate(100%, 0);
  }
  .fixed-nav-content {
    padding: 0px 0 15px;
  }
  
  @media (min-width: 992px){
    .fixed-nav-left {
      transform: translate(0, 0);
    }
    .fixed-nav-right {
      transform: translate(0, 0);
    }
    .fixed-nav-content {
      padding: 15px 80px;
    }
  }
  .y-components {
    margin-bottom: 20px;
  }
</style>