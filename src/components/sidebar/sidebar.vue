<template>
  <div class="w-sidebar">
    <w-sidebar-menu></w-sidebar-menu>
  </div>
</template>
<script>
  import WSidebarMenu from './menu'

  export default {
    name: 'WSidebar',
    components: {
      WSidebarMenu
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";
  @import "../../styles/mixins/clearfix";
  @import "../../styles/functions/color";

  .w-sidebar {
    background: $color-base-black;
    margin-top: 60px;
    min-height: 100%;
    position: fixed;
    top: 0;
    transition: margin-top .3s, transform .3s;
    width: 144px;
    z-index: $zindex-2;
  }

  .open .w-sidebar {
    transform: translate(0, 0);
  }

  // 小尺寸设备
  @media (max-width: 768px) {
    .w-sidebar {
      margin-top: 108px;
      transform: translate(-144px, 0);
    }
  }
</style>
