<template>
  <div class="container-fluid y-container-fluid">
    <div class="title-box">
      <span>
        <span class="title-icon"></span>
        <span class="title-text">收藏快讯</span>
        <span class="title-tip">关注更新资讯,实时掌握收藏动态</span>
      </span>
      <span class="float-right">更多<i class="el-icon-d-arrow-right"></i></span>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-4 col-md-3 content-left">
        <img :src="img" ref="image" />
      </div>
      <div class="col-xs-12 col-sm-8 col-md-9 content-right" ref="contentRight">
        <ul>
          <li v-for="(i, index) in dataList" :key="index">
            <p>{{i.title}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import img from '@/assets/img/dingdong/mpYt1pZH.jpg'
export default {
  data () {
    return {
      img: img,
      dataList: [
        { title: '这张纪念钞为何疯狂升值几十倍？' },
        { title: '一张伍元人民币可以换3万元，你信吗？' },
        { title: '猪年纪念币11月16日发行，盘点值得收藏的纪念币有哪些？' },
        { title: '我国史上绿色纸币大全，太美了！' },
        { title: '硬币“五大天王”出现不少赝品，你的储蓄罐里可以找到这样的币吗？' },
        { title: '从纸币收藏小白到老司机的进阶之路！' },
        { title: '这个年份的硬分币拍出5万高价，可能你家角落就有！' }
      ]
    }
  },
  mounted () {
    this.$refs.image.style.height = this.$refs.contentRight.offsetHeight - 30 + 'px'
  }
}
</script>
<style lang="less" scoped>
  .content-left {
    border-bottom: 1px solid #F6F3F1;
    text-align: center;
    height: 100%;
    padding: 15px 30px;
  }
  .content-right {
    padding: 15px 30px;
    border-left: none;
    li:hover {
      color: #F56E63;
      cursor: pointer;
    }
  }
  @media (min-width: 750px) {
    .content-left {
      border-bottom: none;
    }
    .content-right {
      border-left: 1px solid #F6F3F1;
    }
  }
</style>
