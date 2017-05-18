<template>
  <div class="w-header">
    <w-header-logo></w-header-logo>
    <w-header-navbar></w-header-navbar>
  </div>
</template>
<script>
  import WHeaderLogo from './logo'
  import WHeaderNavbar from './navbar'

  export default {
    name: 'WHeader',
    components: {
      WHeaderLogo,
      WHeaderNavbar
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";
  @import "../../styles/mixins/clearfix";

  .w-header {
    background: $color-white;
    height: 60px;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: $zindex-2;
  }

  // 小尺寸设备显示
  @media (max-width: 768px) {
    .w-header {
      height: auto;
    }
  }
</style>
