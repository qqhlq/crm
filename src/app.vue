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
        'sidebar'
      ])
    },
    methods: {
      ...mapActions([
        'watchScreenWidth'
      ])
    },
    mounted() {
      this.watchScreenWidth()
    }
  }
</script>
<style lang="scss">
  @import "./styles/core/var";

  * {
    box-sizing: border-box !important;
  }
  html,
  body {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
    background: $color-extra-light-gray;
    color: $color-extra-light-black;
    font: #{$font-size-base}/#{$line-height} #{$font-family};
    margin: 0;
    overflow-x: hidden;
  }
  .w-app {
    border-width: 1px 0;
    border-color: transparent;
    border-style: solid;
    overflow: hidden;
    width: 100%;
  }

  .w-wrapper {
    margin-left: 144px;
    padding-top: 60px;
    transform: translate(0, 0);
    transition: transform .3s;

    .w-content {
      margin: 0 16px 24px;
    }
  }

  .w-table .fa-question-circle {
    margin-left: 5px;
    color: $color-light-gray;
    transition: color .1s;

    &.active {
      color: $color-light-black;
    }
  }

  // 小尺寸设备显示
  @media (max-width: 768px) {
    .w-wrapper {
      margin-left: 0;
      padding-top: 108px;

      .w-content {
        margin: 0 8px 24px;
      }
    }

    // 开启 sidebar
    .open .w-wrapper {
      transform: translate(144px, 0);
    }
  }
</style>
