<template>
  <div class="carousel" ref="carousel">
    <div v-for="(p, index) in pic" :key="'pic' + index" class="picture" :style="p.style"><img :src="p.image" /></div>
    <div class="y-icon y-icon-left" @click="changeActive(active-1)"><i class="el-icon-arrow-left"></i></div>
    <div class="y-icon y-icon-right" @click="changeActive(active+1)"><i class="el-icon-arrow-right"></i></div>
    <div class="image-index">
      <span :class="{'active': index === active}" @click="changeActive(index)" v-for="(p, index) in pic" :key="'icon' + index"></span>
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
      maxHeight: null
    }
  },
  created () {
    
  },
  mounted () {
    this.maxHeight = this.$refs.carousel.offsetHeight
  },
  methods: {
    changeActive (subIndex) {
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

      img {
        width: 100%;
        min-height: 300px;
      }
    }
  }
  .y-icon {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    width: 50px;
    height: 50px;
    font-size: 36px;
    text-align: center;
    border-radius: 50%;
    background: #ffffff;
    opacity: 0.5;
    color: #333;
    z-index: 99;
    cursor: pointer;
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