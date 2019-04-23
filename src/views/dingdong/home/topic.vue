<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-3" v-for="(i, index) in imageList" :key="index">
        <router-link tag="img" :src="i.url" :to="i.path"></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import topic1 from '@/assets/img/dingdong/hd1.png'
import topic2 from '@/assets/img/dingdong/hd2.png'
import topic3 from '@/assets/img/dingdong/hd3.png'
import topic4 from '@/assets/img/dingdong/hd4.png'
export default {
  data () {
    return {
      imageList: [
        { url: topic1, path: '' },
        { url: topic2, path: '' },
        { url: topic3, path: '' },
        { url: topic4, path: '' }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
  .row {
    img {
      border-radius: 3px;
      width: 100%;
      cursor: pointer;
      transition: 0.5s;
      margin-bottom: 15px;
    }
    img:hover {
      transform: scale(1.1);
      filter: drop-shadow(5px 5px 5px #F56E63) invert(85%);
    }
  }
  .container-fluid {
    background: #fff;
    padding: 20px 20px 5px;
    margin: 0 15px;
    border-radius: 3px;
  }
</style>
