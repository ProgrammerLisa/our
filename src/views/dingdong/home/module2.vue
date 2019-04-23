<template>
  <div class="container-fluid y-container-fluid">
    <div class="title-box">
      <span>
        <span class="title-icon"></span>
        <span class="title-text">叮咚微拍</span>
        <span class="title-tip">每天都有心水好货等您来</span>
      </span>
      <span class="float-right">更多<i class="el-icon-d-arrow-right"></i></span>
    </div>
    <div class="y-content-box" ref="yContainer">
      <div class="y-content" ref="yContent" @mousedown="handleTouchStart" @mousemove.prevent="handleTouchmove" @mouseup="moveStart=false">
        <div class="y-box" v-for="(i, index) in contentList" :key="index">
          <div class="y-time">据结拍：{{i.time}}</div>
          <div>
            <p>拍品名称：{{i.name}}</p>
            <p>起拍价：{{i.price}}</p>
            <p>人气值：{{i.popularityNum}}</p>
            <p>出价：{{i.auctionNum}}次</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      moveStart: false,
      x: null,
      contentList: [
        { name: '拍品一', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品二', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品三', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品四', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品五', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品六', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品七', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品八', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品九', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品十', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' },
        { name: '拍品十一', price: '3000元', popularityNum: '845', auctionNum: '45', time: '23小时13分25秒' }
      ]
    }
  },
  methods: {
    handleTouchStart (e) {
      this.moveStart = true
      this.x = e.clientX
    },
    handleTouchmove (e) {
      if (this.moveStart) {
        if (e.clientX-this.x > 0) {
          if (this.$refs.yContainer.scrollLeft > 0) {
            this.$refs.yContainer.scrollLeft -= 1
          }
        } else {
          if (this.$refs.yContainer.scrollLeft < this.$refs.yContent.offsetWidth) {
            this.$refs.yContainer.scrollLeft += 1
          }
        }
        this.x = e.clientX
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .y-content-box {
    width: 100%;
    overflow-x: auto;
    .y-content {
      white-space: nowrap;
      padding: 15px;
    }
  }
  .y-content-box::-webkit-scrollbar{  
    display: none;  
  }
  .y-box {
    position: relative;
    border-radius: 5px;
    display: inline-block;
    padding: 15px 15px 5px;
    margin-right: 15px;
    width: 200px;
    overflow: hidden;
    cursor: pointer; 
    background: gray;
    outline: 3px dashed #fff;
    outline-offset: -8px;
    color: #ddd;
  }
  .y-time {
    position: absolute;
    top: -100%;
    left: 0;
    opacity: 0;
    text-align: center;
    width: 100%;
    background: #999;
    color: #fff;
    padding: 10px 0;
    transition: 0.5s;
  }
  .y-box:hover {
    outline: 3px solid #fff;
    .y-time {
      top: 0;
      opacity: 1;
    }
  }
  .y-box:last-child {
    margin-right: 0;
  }
</style>
