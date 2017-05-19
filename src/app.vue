<template>
  <div id="app">
    <c-header></c-header>
    <div class="w-wrapper">
      <router-view class="w-content"></router-view>
    </div>
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