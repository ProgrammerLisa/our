<template>
  <div class="character">
    {{name}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: null
    }
  },
  created () {
    this.name = this.$store.getters.black.id
  },
  methods: {
        
  }
}
</script>
<style lang="less" scoped>

</style>