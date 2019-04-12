<template>
  <div class="box" ref="box">
    <y-carousel class="carousel"></y-carousel>
    <div v-for="(p, index) in pointList" :key="index" :style="p.style" class="point"></div>
  </div>
</template>
<script>
import { setInterval, clearInterval, setTimeout } from 'timers'
import { fail } from 'assert'
import carousel from './carousel'
export default {
  components: { 'y-carousel': carousel },
  data () {
    let time = new Date().getTime()
    return {
      maxWidth: null,
      maxHeight: null,
      pointList: [],
      point: {
        style: {
          backgroundColor: 'rgba(34, 206, 195, 0.6)',
          width: '10px',
          height: '10px',
          top: '-10px',
          left: '300px'
        }
      }
    }
  },
  created () {
    this.initObj()
  },
  mounted () {
    const _this = this
    this.maxHeight = this.$refs.box.offsetHeight
    this.maxWidth = this.$refs.box.offsetWidth
    let falling = setInterval(() => {
      _this.revive()
    }, 500)
  },
  methods: {
    // 初始化数组
    initList (obj) {
      const _this = this
      const point = obj || _this.point
      _this.pointList.push(point)
      _this.falling(point)
      // this.$parent.$emit('windowInfo', { width: this.$refs.carousel.offsetWidth, height: this.$refs.carousel.offsetHeight })
    },
    // 初始化对象
    initObj () {
      const _this = this
      _this.initList(_this.point)
    },
    // 下落
    falling (obj) {
      const _this = this
      let y = parseFloat(obj.style.top.replace('px', ''))
      let falling = setInterval(() => {
        y += 1
        obj.style.top = y + 'px'
        if (y > _this.maxHeight) {
          clearInterval(falling)
          //删除
          _this.pointList.shift()
        }
      }, 10)
    },
    // 再生
    async revive () {
      const _this = this
      const randomNum = Math.random()
      const point = {
        style: {
          backgroundColor: `rgba(${ parseFloat(255 * Math.random()) }, ${ parseFloat(255 * Math.random()) }, ${ parseFloat(255 * Math.random()) }, ${ parseInt(randomNum * 10) / 10 })`,
          height: 10 * (randomNum + 0.6) + 'px',
          width: 10 * (randomNum + 0.6) + 'px',
          top: - 10 * (randomNum + 0.6) + 'px',
          left: (_this.maxWidth - 10 * (randomNum + 0.6)) * randomNum + 'px',
        }
      }
      await _this.initList(point)
    }
  }
}
</script>
<style lang="less" scoped>
  .box {
    width: 100%;
    height: 500px;
    // background-image: linear-gradient(to right , #78C4CF, #fff);
    position: relative;
    overflow: hidden;
    animation: color 2s linear infinite;

    .carousel {
      width: 100%;
      height: 100%;
    }

    .point {
      position: absolute;
      -webkit-animation: rotate 2s linear 2s 5 alternate;
      animation: rotate 2s linear infinite;
      z-index: 98;
    }
  }
  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg)
    }
    to {
      -webkit-transform: rotate(360deg)
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }
</style>