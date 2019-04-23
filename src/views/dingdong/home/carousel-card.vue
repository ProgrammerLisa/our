<template>
  <div class="container-fluid">
    <div class="row main-content">
      <div class="col-md-6 col-xs-12 flex-carousel">
        <div class="block">
          <el-carousel trigger="click" arrow="always">
            <el-carousel-item v-for="item in carouselList" :key="item.image">
              <img :src="item.image"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 flex-left-card">
        <el-card class="box-card" ref="leftCard">
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div v-for="(o, index) in leftCard" :key="'leftCard'+index" class="text item">
            <span class="card-title">{{o.title1}}</span> / <span class="card-title">{{o.title2}}</span>
          </div>
        </el-card>
      </div>
      <div class="col-md-3 col-xs-6 flex-right-card">
        <el-card class="box-card">
          <div class="text-center">
            <p><img :src="logo"/></p>
            <p>
              <el-button size="small">登陆</el-button>
              <el-button size="small">注册</el-button>
            </p>
          </div>
          <p class="title-box">
            <span><span class="title-icon"></span><span class="title-text">网站公告</span></span>
            <span class="float-right">更多<i class="el-icon-d-arrow-right"></i></span>
          </p>
          <div v-for="o in 3" :key="o" class="text item">
            <span class="card-title">2019年熊猫币陆续发行，2019年熊猫币陆续发行</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import carousel1 from '@/assets/img/dingdong/2018cicesh.jpg'
import carousel2 from '@/assets/img/dingdong/lunbo2.png'
import carousel3 from '@/assets/img/dingdong/lunbo3.png'
import logo from '@/assets/img/dingdong/user-img1.png'
export default {
  data () {
    return {
      logo: logo,
      carouselList: [
        { image: carousel1 },
        { image: carousel2 },
        { image: carousel3 }
      ],
      leftCard: [
        { title1: '古币银元', title2: '第一二三版纸币' },
        { title1: '硬币专栏', title2: '特殊号码钱币' },
        { title1: '编年版票', title2: '编年套票' },
        { title1: '硬币专栏', title2: '纪特文编JT新票' },
        { title1: '钱币套装', title2: '评级币评级钞' },
        { title1: '小版张', title2: '第四版人民币' },
      ]
    }
  },
  mounted () {
    this.$refs.leftCard._vnode.children[1].elm.style.lineHeight = (300 - 57 - 40) / this.leftCard.length + 'px'
  }
}
</script>
<style lang="less" scoped>
  .container-fluid {
    padding: 0;
  }
  .main-content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
  }
  .flex-carousel {
    order: 1;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .flex-left-card {
    order: 2;
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .flex-right-card {
    order: 3;
    .box-card {
      height: 300px;
      .text-center {
        margin-bottom: 10px;
      }
      .text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 20px;
      }
    }
  }
  .flex-carousel.col-xs-12 {
    padding: 0;
  }
  .card-title {
    cursor: pointer;
  }
  .card-title:hover {
    color: #F56E63;
  }
  @media (min-width: 992px){
    .flex-carousel {
      order: 2;
      margin-bottom: 0;
    }
    .flex-left-card {
      order: 1;
    }
    .flex-right-card {
      order: 3;
    }
  }
</style>
