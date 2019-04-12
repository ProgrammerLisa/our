<template>
  <div class="home">
    <y-carousel></y-carousel>
  </div>
</template>
<script>
import carousel from '@/components/carousel'
export default {
  components: { 'y-carousel': carousel },
  data () {
    return {
      
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
  methods: {
    
  }
}
</script>
<style lang="less" scoped>

</style>