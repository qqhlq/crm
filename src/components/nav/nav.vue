<template>
  <div class="w-nav">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'WNav',
    data() {
      return {
        navItems: []
      }
    },
    methods: {
      addNavItem(item) {
        this.navItems.push(item)
      },
      resetNavItem() {
        for (let item of this.navItems) {
          if (item.navType !== 'disabled') {
            item.navType = 'default'
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/core/var";
  @import "../../styles/mixins/clearfix";

  .w-nav {
    @include clearfix;
    margin: 0 -16px;
  }

  // 小尺寸设备
  @media (max-width: 768px) {
    .w-nav {
      @include clearfix;
      margin: 0 -8px;
    }
  }
</style>
