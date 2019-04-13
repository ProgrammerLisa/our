<template>
  <div class="carousel" ref="carousel">
    <div v-for="(p, index) in pic" :key="'pic' + index" class="picture" :style="p.style"><img :src="p.image" /></div>
    <div class="y-icon y-icon-left" @click="changeActive(active-1, 'handle')"><i class="el-icon-arrow-left"></i></div>
    <div class="y-icon y-icon-right" @click="changeActive(active+1, 'handle')"><i class="el-icon-arrow-right"></i></div>
    <div class="image-index">
      <span :class="{'active': index === active}" @click="changeActive(index, 'handle')" v-for="(p, index) in pic" :key="'icon' + index"></span>
    </div>
  </div>
</template>
<script>
import pic1 from '@/assets/img/carousel/pic1.svg'
import pic2 from '@/assets/img/carousel/pic2.svg'
import pic3 from '@/assets/img/carousel/pic3.svg'
export default {
  data () {
    return {
      pic: [{image: pic1, style: null}, {image: pic2, style: null}, {image: pic3, style: null}],
      active: 0,
      maxHeight: null,
      cutInserval: null,
      cutTime: 7000,
      cutStatus: true
    }
  },
  created () {
    
  },
  mounted () {
    const _this = this
    _this.maxHeight = _this.$refs.carousel.offsetHeight
    _this.cutTimeMain()
    
  },
  watch: {
    cutStatus (newVal, oldVal) {
      const _this = this
      if (newVal === true) {
        _this.startCut()
      } else {
        _this.stopCut()
      }
    }
  },
  methods: {
    cutTimeMain () {
      const _this = this
      _this.startCut()
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && _this.cutStatus === true) {
          _this.startCut()
        } else {
          _this.stopCut()
        }
      })
    },
    startCut () {
      const _this = this
      _this.cutInserval = setInterval(() => {
        _this.changeActive(_this.active + 1)
      }, _this.cutTime)
    },
    stopCut () {
      clearInterval(this.cutInserval)
    },
    changeActive (subIndex, way) {
      if (way === 'handle') {
        this.cutStatus = false
        this.stopCut()
      }
      let sub
      if (subIndex < 0) {
        sub = this.pic.length-1
      } else if (subIndex > this.pic.length-1) {
        sub = 0
      } else {
        sub = subIndex
      }
      let top = - this.maxHeight * sub
      this.pic.forEach((item, index) => {
        if (index === sub) {
          if (index === 0) {
            this.pic[index].style = `visibility: visible`
          }
          this.pic[index].style = `margin-top: ${top}px`
          this.active = sub
          if (this.cutStatus === false) {
            this.cutStatus = true
            this.startCut()
          }
          return
        } else {
          if (index === 0) {
            this.pic[index].style = `visibility: hidden`
          } else {
            this.pic[index].style = `margin-top: 0px`
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .carousel{
    width: 100%;
    height: 100%;
    position: relative;
    
    .picture {
      width: 100%;
      height: 100%;
      transition: 1s;
      overflow: hidden;

      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .carousel:hover .y-icon{
    opacity: 0.5;
    margin: 0px;
  }
  .y-icon {
    opacity: 0;
    margin: 0 50px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 50px;
    height: 50px;
    font-size: 36px;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    color: #333;
    z-index: 99;
    cursor: pointer;
    transition: 1s;
  }
  .y-icon:hover {
    animation: icons 2s linear infinite;
  }
  .y-icon-left {
    left: 20px;
  }
  .y-icon-right {
    right: 20px;
  }
  .image-index {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;

    span {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #ffffff;
      border-radius: 50%;
      margin: 0 10px;
      opacity: 0.5;
      cursor: pointer;
    }
    span:hover {
      opacity: 1;
      transform: scale(1.5);
      transition: 0.5s;
    }
    span.active {
      opacity: 1;
      transform: scale(1.5);
    }
  }
  @keyframes icons {
    from {
      opacity: 0.5;
    }
    25% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.8;
    }
    to {
     opacity: 0.5;
    }
  }
</style>