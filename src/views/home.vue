<template>
  <div class="home" @scroll="handleScroll" ref="homeContainer">
    <y-carousel ref="carouselComponent"></y-carousel>
    <div class="y-title-box" ref="titleOne" style="height: 1000px">111</div>
  </div>
</template>
<script>
import carousel from '@/components/carousel-box'
import { setTimeout, setInterval, clearInterval } from 'timers';
export default {
  components: { 'y-carousel': carousel },
  data () {
    return {
      scrollTopNum: 0
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
    console.log(this.$refs.carouselComponent)
    
  },
  methods: {
    handleStart (e) {
      
    },
    handleScroll (e) {
      let _this = this
      let self = e.srcElement
      /**
       * e.srcElement.scrollTop 滚动的高度
       * e.srcElement.offsetHeight 容器的高度
       * e.srcElement.scrollHeight 可滚动的总高度*/ 
      // 内容往下移动
      if (self.scrollTop - _this.scrollTopNum > 0) {
        _this.scrollTopNum = self.scrollTop
        if (self.scrollTop > self.offsetHeight / 8 && self.scrollTop < self.offsetHeight) {
            self.scrollTop += 1
            setTimeout(() => { _this.handleScroll(e) }, 30)
        } else if (self.scrollTop === self.offsetHeight) {
          self.scrollTop = self.offsetHeight
          _this.scrollTopNum = self.scrollTop
        }
      } else {
        this.scrollTopNum = self.scrollTop
        // 内容往上移动
      }
      
    },
    handleEnd () {
      
    }
  }
}
</script>
<style lang="less" scoped>
  .home {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .home::-webkit-scrollbar {
    display: none;
  }
</style>