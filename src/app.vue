<template>
  <div id="app" :class="[ 'w-app', sidebar === 1 ? 'open' : '' ]">
    <w-header></w-header>
    <w-sidebar></w-sidebar>
    <div class="w-wrapper">
      <router-view class="w-content"></router-view>
    </div>
    <w-dialog-customer></w-dialog-customer>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapActions([    
      ])
    },
    mounted() {
    }
  }
</script>
<style lang="scss">
  @import "./styles/core/var";
</style>