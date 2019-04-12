<template>
  <div class="carousel" ref="carousel">
    <div v-for="(p, index) in pointList" :key="index" ref="point" class="point">
      <div  v-if="!p.finish"></div>
    </div>
  </div>
</template>
<script>
import { setInterval, clearInterval, setTimeout } from 'timers';
import { fail } from 'assert';
export default {
  data () {
    let time = new Date().getTime()
    return {
      maxWidth: null,
      maxHeight: null,
      pointList: [],
      point: {
        backgroundColor: 'rgba(34, 206, 195, 0.6)',
        length: '10px',
        speed: 20,
        x: '300px',
        y: '0px',
        time: 'point' + time,
        finish: false
      },
      init: null,
    }
  },
  created () {
    this.init = this.initList()
  },
  mounted () {
    const _this = this
    this.maxHeight = this.$refs.carousel.offsetHeight
    this.maxWidth = this.$refs.carousel.offsetWidth
    this.initObj()
    let falling = setInterval(() => {
      // _this.revive()
    }, 1000)
  },
  methods: {
    // 初始化数组
    initList (obj) {
      const _this = this
      const point = obj || _this.point
      _this.pointList.push(point)
      return point.time
      // this.$parent.$emit('windowInfo', { width: this.$refs.carousel.offsetWidth, height: this.$refs.carousel.offsetHeight })
    },
    // 初始化对象
    initObj (obj) {
      const _this = this
      let objTime, point, screen, subscript, objData
      if (obj) {
        objTime = obj.time
      } else {
        objTime = _this.init
        obj = new Object()
      }
      screen = _this.pointList.map((i, index) => {
        if(i.time === objTime) {
          return { content: i, sub: index }
        }
      })
      subscript = screen.filter(sub => sub !== undefined)
      objData = subscript[0].content
      
      point = _this.$refs.point[subscript[0].sub]
      point.style.width = objData.length
      point.style.height = objData.length
      point.style.backgroundColor = objData.backgroundColor
      point.style.left = objData.x
      point.style.top = objData.y
      point.setAttribute('speed', objData.speed)
      point.setAttribute('time', objData.time)
      point.setAttribute('finish', objData.finish)
      _this.falling(point)
    },
    // 下落
    falling (obj) {
      const _this = this
      let y = parseFloat(obj.style.top.replace('px', ''))
      let screen = _this.pointList.map((i, index) => {
        if(i.time === obj.getAttribute('time')) {
          return { content: i, sub: index }
        }
      })
      let subscript = screen.filter(sub => sub !== undefined)
      let falling = setInterval(() => {
        y += 1
        obj.style.top = y + 'px'
        if (y > _this.maxHeight) {
          clearInterval(falling)
          _this.delPoint(obj.getAttribute('time'))
        }
      }, parseInt(obj.getAttribute('speed')))
    },
    // 再生
    async revive (status) {
      const _this = this
      const randomNum = Math.random()
      const time = new Date().getTime()
      const point = {
        backgroundColor: `rgba(${ parseInt(255 * randomNum) }, ${ parseInt(255 * randomNum) }, ${ parseInt(255 * randomNum) }, ${ parseInt(randomNum*10)/10 })`,
        length: 15 * (randomNum + 0.6) + 'px',
        speed: 20,
        x: (_this.maxWidth - 15 * (randomNum + 0.6)) * randomNum + 'px',
        y: - 15 * (randomNum + 0.6) + 'px',
        time: 'point' + time,
        finish: false
      }
      await _this.initList(point)
      await _this.initObj(point)
    },
    // 删除
    async delPoint (time) {
      const _this = this
      let delIndex
      await this.pointList.forEach((item, index) => {
        if (item.time === time) {
          // item.finish = true
          _this.$refs.point[index] = ''
          // console.log(_this.$refs.point[index].innerHtml)
          delIndex = index
          return delIndex
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .carousel {
    width: 100%;
    height: 300px;
    background: #fff;
    position: relative;
    // overflow: hidden;

    .point {
      position: absolute;
      -webkit-animation: rotate 2s linear 2s 5 alternate;
      animation: rotate 2s linear infinite;
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